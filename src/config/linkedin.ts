// De LinkedIn-bedrijfspagina van Curanta. Zolang die er niet is, staat hier null: dan toont de footer
// geen LinkedIn-link en heeft Organization (Base.astro) geen sameAs. Maakt Jan de pagina aan, dan zet
// je hier de URL (https://www.linkedin.com/company/<naam>/) en zijn beide er meteen (skill linkedin).
// Alleen een link: geen Insight Tag, pixel of knop die iets van LinkedIn laadt (de site is cookieloos).
export const LINKEDIN_BEDRIJFSPAGINA: string | null = null;
