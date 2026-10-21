"""Maakt public/documenten/programma-van-eisen-overstap-curanta.docx uit src/config/overstap-inhoud.json.

Pagina (/overstappen/programma-van-eisen) en Word-bestand komen zo uit één bron. Draai dit na elke wijziging van
de eisen:  python scripts/maak-pve-docx.py   (vraagt python-docx)
"""
import json
from pathlib import Path

from docx import Document
from docx.enum.table import WD_TABLE_ALIGNMENT
from docx.oxml import OxmlElement
from docx.oxml.ns import qn
from docx.shared import Cm, Pt, RGBColor

ROOT = Path(__file__).resolve().parent.parent
inhoud = json.loads((ROOT / "src/config/overstap-inhoud.json").read_text(encoding="utf-8"))
uit = ROOT / "public/documenten/programma-van-eisen-overstap-curanta.docx"
uit.parent.mkdir(parents=True, exist_ok=True)

GRIJS = RGBColor(0x55, 0x5F, 0x66)

doc = Document()
doc.core_properties.title = "Programma van eisen voor een overstap"
doc.core_properties.author = "Curanta"
doc.core_properties.language = "nl-NL"
for s in doc.sections:
    s.left_margin = s.right_margin = Cm(2)
    s.top_margin = s.bottom_margin = Cm(2)

normaal = doc.styles["Normal"]
normaal.font.name = "Calibri"
normaal.font.size = Pt(10.5)
normaal.element.rPr.rFonts.set(qn("w:eastAsia"), "Calibri")


def schaduw(cel, kleur):
    tcPr = cel._tc.get_or_add_tcPr()
    shd = OxmlElement("w:shd")
    shd.set(qn("w:val"), "clear")
    shd.set(qn("w:color"), "auto")
    shd.set(qn("w:fill"), kleur)
    tcPr.append(shd)


def kopregel_herhalen(rij):
    trPr = rij._tr.get_or_add_trPr()
    el = OxmlElement("w:tblHeader")
    el.set(qn("w:val"), "true")
    trPr.append(el)


doc.add_heading("Programma van eisen voor een overstap", level=0)
p = doc.add_paragraph()
p.add_run(
    "Een programma van eisen gaat vaak over functies. Dit deel gaat over de overstap zelf: hoe uw gegevens meegaan, "
    "hoe de declaraties doorlopen, hoe u bij het oude dossier blijft en hoe u er later weer uit komt. Vul het aan met "
    "uw eigen eisen voor zorg, planning en administratie."
)
p = doc.add_paragraph()
r = p.add_run(
    f"Opgesteld door Curanta, een leverancier van zorgsoftware, zo dat elke leverancier de eisen kan beantwoorden. "
    f"Laat uw jurist of FG meekijken; dit is geen juridisch advies. Peildatum {inhoud['peildatum']}. "
    "Online: curanta.nl/overstappen/programma-van-eisen."
)
r.italic = True
r.font.color.rgb = GRIJS

doc.add_heading("Hoe u dit gebruikt", level=2)
for regel in [
    "Leg de eisen aan elke leverancier op uw shortlist voor, met dezelfde nummers.",
    "Vraag per eis: voldoet het pakket (ja, deels, nee), en hoe. Vraag bij 'deels' en 'nee' wat de leverancier in plaats daarvan biedt.",
    "Schrap wat voor uw organisatie niet geldt, en maak zichtbaar welke eisen voor u hard zijn.",
]:
    doc.add_paragraph(regel, style="List Bullet")

for ci, cat in enumerate(inhoud["pve"], start=1):
    doc.add_heading(f"{ci}. {cat['categorie']}", level=1)
    tabel = doc.add_table(rows=1, cols=4)
    tabel.style = "Table Grid"
    tabel.alignment = WD_TABLE_ALIGNMENT.CENTER
    breedtes = [Cm(1.2), Cm(9.0), Cm(2.3), Cm(4.5)]
    kop = tabel.rows[0]
    kopregel_herhalen(kop)
    for i, tekst in enumerate(["Nr.", "Eis en waarom", "Voldoet", "Toelichting leverancier"]):
        cel = kop.cells[i]
        cel.width = breedtes[i]
        cel.text = ""
        run = cel.paragraphs[0].add_run(tekst)
        run.bold = True
        schaduw(cel, "E6F2F1")
    for ei, eis in enumerate(cat["eisen"], start=1):
        rij = tabel.add_row()
        for i, b in enumerate(breedtes):
            rij.cells[i].width = b
        rij.cells[0].text = f"{ci}.{ei}"
        cel = rij.cells[1]
        cel.text = ""
        cel.paragraphs[0].add_run(eis["eis"]).bold = True
        w = cel.add_paragraph().add_run(eis["waarom"])
        w.font.size = Pt(9.5)
        w.font.color.rgb = GRIJS
        rij.cells[2].text = "☐ ja\n☐ deels\n☐ nee"

doc.add_heading("Bronnen", level=2)
for sleutel in ("acmLeidraad", "dataAct", "mi2026"):
    b = inhoud["bronnen"][sleutel]
    doc.add_paragraph(f"{b['naam']} ({b['datum']}): {b['url']}", style="List Bullet")
doc.add_paragraph(
    "De termijnen bij vertrek komen uit de Dataverordening (Verordening (EU) 2023/2854), zoals de ACM die uitlegt. "
    "Of die regels voor een contract gelden, hangt af van het soort dienst; laat dat toetsen."
)

doc.save(uit)
print(f"geschreven: {uit.relative_to(ROOT)}")
