import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/dictionary";

// Carrega o dicionário do idioma (padrão do guia de internacionalização do
// Next.js: `import()` dinâmico, que separa os idiomas em arquivos distintos).
// Os dicionários ficam no repositório; não há CMS (Fonte da Verdade §11.5).
const dictionaries: Record<Locale, () => Promise<Dictionary>> = {
  en: () => import("@/i18n/dictionaries/en").then((module) => module.en),
  pt: () => import("@/i18n/dictionaries/pt").then((module) => module.pt),
};

export async function getDictionary(locale: Locale): Promise<Dictionary> {
  return dictionaries[locale]();
}
