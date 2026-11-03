// Integração oficial do Tailwind CSS v4 com o Next.js via PostCSS (RIV-13).
// Não usar o loader @tailwindcss/turbopack gerado pelo scaffold: decisão do Owner.
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
