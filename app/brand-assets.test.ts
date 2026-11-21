import { createHash } from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { inflateSync } from "node:zlib";
import { describe, expect, it } from "vitest";

// Ícones e logotipo (RIV-41). Os arquivos de ícone seguem a convenção de metadados
// do Next.js (`app/favicon.ico`, `app/icon.svg`, `app/apple-icon.png`): sem eles o
// navegador pedia /favicon.ico e caía na página 404. Estes testes fixam o formato, as
// dimensões e a paleta; o `<link>` no <head> e o 200 são verificados no servidor real.
const ROOT = process.cwd();
const read = (path: string) => readFileSync(join(ROOT, path));
const text = (path: string) => read(path).toString("utf8");

const PNG_SIGNATURE = Buffer.from([
  0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a,
]);

// Paleta V4 Red Pen (app/globals.css).
const PALETTE = ["#1D1A17", "#F5F0E4", "#6B3343", "#C8231D", "#F6E24B"];
const hexColors = (svg: string) => [
  ...new Set(
    (svg.match(/#[0-9A-Fa-f]{6}\b/g) ?? []).map((c) => c.toUpperCase()),
  ),
];

function pngSize(buffer: Buffer) {
  expect(buffer.subarray(0, 8).equals(PNG_SIGNATURE)).toBe(true);
  expect(buffer.subarray(12, 16).toString("ascii")).toBe("IHDR");
  return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
}

// Decodifica um PNG RGBA de 8 bits sem entrelaçamento (suficiente para o apple-icon).
function decodeRgba(png: Buffer) {
  const { width, height } = pngSize(png);
  expect(png.readUInt8(25)).toBe(6); // RGBA
  expect(png.readUInt8(28)).toBe(0); // sem entrelaçamento
  const chunks: Buffer[] = [];
  for (let at = 8; at < png.length;) {
    const length = png.readUInt32BE(at);
    const type = png.subarray(at + 4, at + 8).toString("ascii");
    if (type === "IDAT") chunks.push(png.subarray(at + 8, at + 8 + length));
    at += 12 + length;
  }
  const raw = inflateSync(Buffer.concat(chunks));
  const stride = width * 4;
  const out = Buffer.alloc(stride * height);
  for (let y = 0; y < height; y++) {
    const filter = raw[y * (stride + 1)];
    for (let x = 0; x < stride; x++) {
      const cur = raw[y * (stride + 1) + 1 + x];
      const left = x >= 4 ? out[y * stride + x - 4] : 0;
      const up = y > 0 ? out[(y - 1) * stride + x] : 0;
      const upLeft = x >= 4 && y > 0 ? out[(y - 1) * stride + x - 4] : 0;
      let value = cur;
      if (filter === 1) value = cur + left;
      else if (filter === 2) value = cur + up;
      else if (filter === 3) value = cur + Math.floor((left + up) / 2);
      else if (filter === 4) {
        const p = left + up - upLeft;
        const pa = Math.abs(p - left);
        const pb = Math.abs(p - up);
        const pc = Math.abs(p - upLeft);
        value = cur + (pa <= pb && pa <= pc ? left : pb <= pc ? up : upLeft);
      }
      out[y * stride + x] = value & 0xff;
    }
  }
  return { width, height, pixels: out };
}

const sha256 = (path: string) =>
  createHash("sha256").update(read(path)).digest("hex");

describe("favicon.ico (RIV-41)", () => {
  const ico = read("app/favicon.ico");

  it("é um ICO com três imagens PNG: 16, 32 e 48 px", () => {
    expect(ico.readUInt16LE(0)).toBe(0); // reservado
    expect(ico.readUInt16LE(2)).toBe(1); // tipo: ícone
    expect(ico.readUInt16LE(4)).toBe(3);

    const sizes: number[] = [];
    for (let i = 0; i < 3; i++) {
      const entry = 6 + i * 16;
      const width = ico.readUInt8(entry);
      const height = ico.readUInt8(entry + 1);
      const length = ico.readUInt32LE(entry + 8);
      const offset = ico.readUInt32LE(entry + 12);

      expect(width).toBe(height);
      expect(offset + length).toBeLessThanOrEqual(ico.length);
      expect(pngSize(ico.subarray(offset, offset + length))).toEqual({
        width,
        height,
      });
      sizes.push(width);
    }
    expect(sizes).toEqual([16, 32, 48]);
  });
});

describe("apple-icon.png (RIV-41)", () => {
  it("é um PNG de 180 x 180 px", () => {
    expect(pngSize(read("app/apple-icon.png"))).toEqual({
      width: 180,
      height: 180,
    });
  });

  it("tem 8 bits por canal (o iOS aplica a máscara arredondada; o arquivo é quadrado)", () => {
    const png = read("app/apple-icon.png");
    expect(png.readUInt8(24)).toBe(8);
    // Tipo de cor 2 (RGB) ou 6 (RGBA, com a área toda opaca, conferida no navegador).
    expect([2, 6]).toContain(png.readUInt8(25));
  });
  it("é toda opaca e quadrada: os quatro cantos têm o fundo Highlight (#F6E24B), sem transparência", () => {
    const { width, height, pixels } = decodeRgba(read("app/apple-icon.png"));
    let minAlpha = 255;
    for (let i = 3; i < pixels.length; i += 4)
      minAlpha = Math.min(minAlpha, pixels[i]);
    expect(minAlpha).toBe(255);

    const at = (x: number, y: number) => [
      ...pixels.subarray((y * width + x) * 4, (y * width + x) * 4 + 3),
    ];
    for (const [x, y] of [
      [0, 0],
      [width - 1, 0],
      [0, height - 1],
      [width - 1, height - 1],
    ]) {
      expect(at(x, y)).toEqual([0xf6, 0xe2, 0x4b]);
    }
  });
});

describe("icon.svg (RIV-41)", () => {
  const svg = text("app/icon.svg");

  it("é um SVG 512 x 512 vetorizado: sem texto, imagem, script nem recurso externo", () => {
    expect(svg.startsWith("<svg")).toBe(true);
    expect(svg).toContain('viewBox="0 0 512 512"');
    // O glifo "R" está em contornos: não depende de fonte instalada.
    expect(svg).not.toMatch(/<text|<image|<script|<style|href=|@import|url\(/i);
    expect(svg.length).toBeLessThan(20_000);
  });

  it("variante B otimizada para tamanho pequeno: fundo Highlight, R Ink e traço Red Pen reto", () => {
    expect(hexColors(svg).sort()).toEqual(["#1D1A17", "#C8231D", "#F6E24B"]);
    expect(svg).toMatch(/<rect[^>]+fill="#F6E24B"/);
    expect(svg).toMatch(/<path fill="#1D1A17"/);
    expect(svg).toMatch(/stroke="#C8231D" stroke-width="44"/);
    // Traço reto (comando L), sem a onda da versão grande (comando q/t).
    expect(svg).toMatch(/<path d="M [\d.]+ [\d.]+ L [\d.]+ [\d.]+"/);
  });
});

describe("Logotipo: wordmark em SVG (public/brand, RIV-41)", () => {
  const cases = [
    ["public/brand/wordmark-on-paper.svg", ["#1D1A17", "#C8231D"]],
    ["public/brand/wordmark-on-ink.svg", ["#F5F0E4", "#F6E24B"]],
  ] as const;

  it.each(cases)(
    "%s: contornos, duas cores da paleta e nome acessível",
    (path, colors) => {
      const svg = text(path);

      expect(svg.startsWith("<svg")).toBe(true);
      expect(svg).toContain('role="img"');
      expect(svg).toContain('aria-label="Rivelume labs"');
      expect(svg).not.toMatch(
        /<text|<image|<script|<style|href=|@import|url\(/i,
      );
      expect(hexColors(svg).sort()).toEqual([...colors].sort());
      for (const color of hexColors(svg)) expect(PALETTE).toContain(color);
      // "labs" fica girado -4 graus, como no site.
      expect(svg).toMatch(/transform="rotate\(-4 /);
    },
  );
});

describe("Arquivos aprovados pelo Owner em 21/11/2026 (RIV-41)", () => {
  // Qualquer alteração de geometria, cor ou dimensão muda o hash e exige nova
  // aprovação visual do Owner: atualize estes valores SÓ depois dessa aprovação
  // (e regenere os PNG/ICO a partir do SVG; ver docs/BRAND.md).
  const APPROVED = {
    "app/icon.svg":
      "abc4e88123eaf31037006b5e9f79aaf728a49865168ce369e4ae2d8cc5743698",
    "app/apple-icon.png":
      "3e21ab5edf001bfa1aa76ab4a30e3c4c134201ddde98485343baa2868f7b8e36",
    "app/favicon.ico":
      "417dafefe6a79f145bdafb2ec7f7c1e369d397aab41461ab67f1b167bf197118",
    "public/brand/wordmark-on-paper.svg":
      "8e3c40f8a784321d11f0a0ae66b01b3160f7f08a1de8a5ecd1525fe67f7a6198",
    "public/brand/wordmark-on-ink.svg":
      "bc062d803ded1862d1783b19a1fa79d2f07934b25da3142beaa0f10abe444d05",
  } as const;

  it.each(Object.entries(APPROVED))(
    "%s é exatamente o arquivo aprovado",
    (path, hash) => {
      expect(sha256(path)).toBe(hash);
    },
  );

  it("os wordmarks mantêm o viewBox aprovado (proporção do logotipo)", () => {
    expect(text("public/brand/wordmark-on-paper.svg")).toContain(
      'viewBox="-18.0 -276.0 1940.1 402.0"',
    );
    expect(text("public/brand/wordmark-on-ink.svg")).toMatch(
      /viewBox="-18.0 -276.0 18\d\d\.\d 402.0"/,
    );
  });
});
