// Schakelaars voor wat de site over het product zegt, zodat de site niet vooruitloopt op de uitrol van de app.
//
// BSN-lijst bij vertrek (besluit Jan 21-10-2026; ADR 2026-10-21-bsn-lijst-bij-vertrek in de Ponscura-repo): gebouwd
// en in develop, maar pas waar zodra het pakket met die code op productie draait. Tot dan zegt de site alleen wat nu
// geldt: de export bevat het BSN als laatste vier cijfers en een hash (feitenblad, rij Export). Zet hem op true na de
// uitrol, en controleer op productie dat /admin/tenant-export de kaart "BSN-lijst voor het volgende pakket" kent.
// 22-10-2026: aan; de app met de BSN-lijst staat op productie (pakket 3f2276d0f bevat BsnLijstKluis).
export const BSN_LIJST_LIVE = true;
