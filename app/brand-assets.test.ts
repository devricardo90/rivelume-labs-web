import { readFileSync } from "node:fs";
import { join } from "node:path";
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
