// Het fundament onder Curanta en de laatste meting van bekende lekken, voor /trust en het kennisartikel over de
// houdbaarheid van software. Bron: feitenblad (Ponscura, docs/campagne/feitenblad-curanta.md), rijen Fundament en
// Bekende lekken.
//
// ⚠ Bij de jaarlijkse overstap (besluit Jan 23-10-2026: elk jaar in november, een paar weken na Microsoft,
// te beginnen met .NET 11 in november 2026) wijzig je hier de versie en de einddatum van de beveiligingsupdates.
// scripts/controleer-fundament.mjs legt `framework` naast de TargetFramework van Curanta.Host in de Ponscura-repo
// en faalt zodra die verschillen; dan veroudert de tekst op de site niet stil.
//
// ⚠ .NET 11 is een STS-versie (twee jaar ondersteuning). Schrijf op de site dus nooit "de versie met lange
// ondersteuning"; de jaarlijkse overstap is de hoofdzin, de huidige versie de bijzin.
export const DOTNET = {
  versie: '.NET 10',
  framework: 'net10.0',
  updatesTot: '14 november 2028',
};

// Datum van de laatste meting met `dotnet list Ponscura.sln package --vulnerable --include-transitive` en
// `--deprecated`. Zonder datum mag de zin over bekende lekken niet op de site (feitenblad, rij Bekende lekken).
export const LEKKEN_GEMETEN = '23 oktober 2026';
