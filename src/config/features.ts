// Feature-vlaggen die op meerdere pagina's en componenten worden gebruikt.
// Houd dit klein — alleen vlaggen die echt gedeeld worden.

// Zet op true zodra nis2care.nl publiek is.
// Activeert klikbare links in:
//   - src/components/TrustBadges.astro (Cbw-badge)
//   - src/components/DeadlineUrgency.astro (NIS2-deadline-kaart)
//   - src/pages/trust.astro (Cbw-item onder Wettelijke kaders)
export const NIS2CARE_LIVE = false;
export const NIS2CARE_URL = 'https://www.nis2care.nl';
