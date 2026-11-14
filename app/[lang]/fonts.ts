import {
  Caveat,
  Fraunces,
  Geist_Mono,
  Instrument_Sans,
} from "next/font/google";

// Fontes da V4 Red Pen (RIV-27). O `next/font` baixa os arquivos NO BUILD e os
// serve junto dos demais ativos estáticos: o navegador não faz nenhuma
// requisição ao Google. Cada fonte expõe uma variável CSS, referenciada pelos
// tokens `--font-*` de app/globals.css. O subconjunto `latin` cobre o português
// do Brasil. Courier Prime (modo Sketch da V3) foi descontinuada.

// Títulos. Variável com eixo óptico (opsz), normal e itálico (a V4 usa 600 e 800).
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-fraunces",
  display: "swap",
});

// Texto e navegação (a V4 usa 400 a 700).
const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  variable: "--font-instrument-sans",
  display: "swap",
});

// Rótulos técnicos (a V4 usa 400 e 500).
const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
  display: "swap",
});

// Anotações manuscritas (a V4 usa 500 e 700).
const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
});

// Classes que definem as variáveis CSS; entram no <html>.
export const fontVariables = [
  fraunces.variable,
  instrumentSans.variable,
  geistMono.variable,
  caveat.variable,
].join(" ");
