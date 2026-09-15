"""AgriNova product presentation PDF - expanded layout & content."""
from pathlib import Path
import shutil

try:
    from fpdf import FPDF
except ImportError:
    import subprocess, sys

    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf2", "-q"])
    from fpdf import FPDF

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "AgriNova_Presentation.pdf"
SNAP = ROOT / "scripts" / "snapshots"
DIAG = ROOT / "scripts" / "diagrams"
for p in (
    Path(r"C:\Users\Rishiraj\.cursor\projects\c-Users-Rishiraj-Desktop-Agrinova\assets"),
    ROOT / "assets",
    ROOT / "public" / "diagrams",
):
    if (p / "agrinova-architecture.png").exists():
        DIAG = p
        break

SAFFRON = (255, 153, 51)
WHITE = (255, 255, 255)
GREEN = (19, 136, 8)
NAVY = (11, 61, 145)
FG = (20, 32, 24)
MUTED = (92, 107, 96)
PAGE = (247, 249, 247)
CARD = (255, 255, 255)
LINE = (216, 224, 217)
SOFT_GREEN = (232, 244, 232)
SOFT_SAFF = (255, 243, 230)
SOFT_NAVY = (232, 239, 250)


class Deck(FPDF):
    def header(self):
        w = self.w
        self.set_fill_color(*SAFFRON)
        self.rect(0, 0, w / 3, 4, "F")
        self.set_fill_color(*WHITE)
        self.rect(w / 3, 0, w / 3, 4, "F")
        self.set_fill_color(*GREEN)
        self.rect(2 * w / 3, 0, w / 3 + 1, 4, "F")

    def footer(self):
        self.set_y(-10)
        self.set_draw_color(*LINE)
        self.set_line_width(0.2)
        self.line(16, self.h - 12, self.w - 16, self.h - 12)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*MUTED)
        self.set_xy(16, self.h - 10)
        self.cell(120, 6, "AgriNova  |  Crop residue as income  |  NCSC")
        self.set_xy(self.w - 50, self.h - 10)
        self.cell(34, 6, f"{self.page_no()}/{{nb}}", align="R")


def fill_page(pdf: Deck):
    pdf.set_fill_color(*PAGE)
    pdf.rect(0, 4, pdf.w, pdf.h - 4, "F")


def kicker(pdf: Deck, text: str):
    pdf.set_xy(16, 10)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*SAFFRON)
    pdf.cell(0, 6, text.upper())


def heading(pdf: Deck, text: str, y=18, size=22):
    pdf.set_xy(16, y)
    pdf.set_font("Helvetica", "B", size)
    pdf.set_text_color(*FG)
    pdf.multi_cell(pdf.w - 32, 9, text)


def sub(pdf: Deck, text: str, y=None):
    if y is not None:
        pdf.set_xy(16, y)
    pdf.set_font("Helvetica", "", 11.5)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(pdf.w - 32, 6, text)


def bullets(pdf: Deck, items, x=18, y=None, w=None):
    if y is not None:
        pdf.set_y(y)
    w = w or (pdf.w - 36)
    for item in items:
        y0 = pdf.get_y() + 1.2
        pdf.set_fill_color(*GREEN)
        pdf.ellipse(x, y0 + 1.5, 2.6, 2.6, "F")
        pdf.set_xy(x + 6.5, y0)
        pdf.set_font("Helvetica", "", 11)
        pdf.set_text_color(*FG)
        pdf.multi_cell(w - 8, 5.8, item)
        pdf.ln(0.8)


def card(pdf: Deck, x, y, w, h, fill=CARD):
    pdf.set_fill_color(*fill)
    pdf.set_draw_color(*LINE)
    pdf.set_line_width(0.25)
    pdf.rect(x, y, w, h, "DF")


def accent_bar(pdf: Deck, x, y, w, color=GREEN):
    pdf.set_fill_color(*color)
    pdf.rect(x, y, w, 4.5, "F")


def caption_box(pdf: Deck, x, y, w, h, title, body):
    card(pdf, x, y, w, h)
    pdf.set_xy(x + 4, y + 4)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*NAVY)
    pdf.multi_cell(w - 8, 5, title)
    pdf.set_xy(x + 4, pdf.get_y() + 1.5)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(w - 8, 4.4, body)


def img(pdf: Deck, path: Path, x, y, w, h):
    if path.exists():
        pdf.image(str(path), x=x, y=y, w=w, h=h)
        pdf.set_draw_color(*LINE)
        pdf.set_line_width(0.3)
        pdf.rect(x, y, w, h)
        return True
    return False


def draw_box(pdf: Deck, x, y, w, h, title, body="", fill=SOFT_GREEN, title_color=GREEN):
    card(pdf, x, y, w, h, fill)
    pdf.set_xy(x + 3, y + 3)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*title_color)
    pdf.multi_cell(w - 6, 4.5, title)
    if body:
        pdf.set_xy(x + 3, pdf.get_y() + 0.5)
        pdf.set_font("Helvetica", "", 8.5)
        pdf.set_text_color(*FG)
        pdf.multi_cell(w - 6, 4, body)


def arrow_right(pdf: Deck, x, y):
    pdf.set_fill_color(*NAVY)
    pdf.set_draw_color(*NAVY)
    pdf.set_line_width(0.8)
    pdf.line(x, y, x + 8, y)
    pdf.line(x + 8, y, x + 5.5, y - 2)
    pdf.line(x + 8, y, x + 5.5, y + 2)


def snapshot_slide(pdf: Deck, kicker_t, title, path: Path, caption_title, caption_body):
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, kicker_t)
    heading(pdf, title, 16, 17)
    if not img(pdf, path, 16, 32, 188, 118):
        card(pdf, 16, 32, 188, 118, SOFT_NAVY)
        pdf.set_xy(24, 80)
        pdf.set_font("Helvetica", "B", 14)
        pdf.set_text_color(*NAVY)
        pdf.cell(170, 8, "Product snapshot (capture pending)", align="C")
    caption_box(pdf, 210, 32, 70, 118, caption_title, caption_body)


def draw_architecture(pdf: Deck, x, y, w, h):
    card(pdf, x, y, w, h, WHITE)
    # four desks
    desks = [
        ("Farmer", "Map · Sell · AI · Credits", SOFT_GREEN, GREEN),
        ("Buyer", "Inbox · Specs · CSR", SOFT_SAFF, SAFFRON),
        ("Government", "Heatmap · Savings", SOFT_NAVY, NAVY),
        ("Admin", "Ledger · MRV", SOFT_GREEN, GREEN),
    ]
    bw = (w - 28) / 4
    for i, (t, b, fill, col) in enumerate(desks):
        draw_box(pdf, x + 8 + i * (bw + 4), y + 10, bw, 28, t, b, fill, col)
    # engine
    draw_box(
        pdf,
        x + 18,
        y + 52,
        w - 36,
        36,
        "Marketplace engine",
        "Match Score  ·  Moisture gate  ·  Transaction state  ·  Dual carbon credits  ·  localStorage seed",
        SOFT_NAVY,
        NAVY,
    )
    # bottom stack
    stack = [
        ("React + TS + Vite", GREEN),
        ("Leaflet / OSM", SAFFRON),
        ("OpenAI + voice", NAVY),
        ("Vercel host", GREEN),
    ]
    sw = (w - 36) / 4
    for i, (t, col) in enumerate(stack):
        draw_box(pdf, x + 18 + i * (sw + 4), y + 98, sw, 18, t, "", WHITE, col)


def draw_journey(pdf: Deck, x, y, w, h):
    card(pdf, x, y, w, h, WHITE)
    farmer_steps = [
        "Role login",
        "Plot map",
        "Burn vs sell",
        "List residue",
        "Match + pickup",
        "Credits",
    ]
    sw = (w - 30) / 6
    for i, t in enumerate(farmer_steps):
        bx = x + 10 + i * (sw + 2)
        draw_box(pdf, bx, y + 14, sw, 26, f"{i+1}", t, SOFT_GREEN, GREEN)
        if i < 5:
            arrow_right(pdf, bx + sw + 0.2, y + 27)
    pdf.set_xy(x + 10, y + 48)
    pdf.set_font("Helvetica", "B", 10)
    pdf.set_text_color(*NAVY)
    pdf.cell(w - 20, 6, "Officer path (parallel desk)")
    gov = ["Gov login", "Air heatmap", "Ops clusters", "Utilisation slider", "Policy AI"]
    gw = (w - 28) / 5
    for i, t in enumerate(gov):
        draw_box(pdf, x + 10 + i * (gw + 2), y + 58, gw, 24, f"G{i+1}", t, SOFT_NAVY, NAVY)
    pdf.set_xy(x + 10, y + 92)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.multi_cell(
        w - 20,
        4.5,
        "Farmer path is sequential. Government path never sees farmer PII - only district aggregates, operational savings, and policy chat.",
    )


def draw_impact_loop(pdf: Deck, x, y, w, h):
    card(pdf, x, y, w, h, WHITE)
    nodes = [
        (x + 12, y + 18, "Sell straw", SOFT_GREEN, GREEN),
        (x + w / 2 - 22, y + 14, "Plant feedstock", SOFT_SAFF, SAFFRON),
        (x + w - 56, y + 18, "Farmer Rs + credits", SOFT_GREEN, GREEN),
        (x + 12, y + 70, "Burn avoided", SOFT_NAVY, NAVY),
        (x + w / 2 - 22, y + 74, "Lower PM model", SOFT_NAVY, NAVY),
        (x + w - 56, y + 70, "Buyer CSR credits", SOFT_SAFF, SAFFRON),
    ]
    for nx, ny, t, fill, col in nodes:
        draw_box(pdf, nx, ny, 44, 22, t, "", fill, col)
    pdf.set_draw_color(*NAVY)
    pdf.set_line_width(0.6)
    # simple loop lines
    pdf.line(x + 34, y + 40, x + w / 2, y + 36)
    pdf.line(x + w / 2 + 22, y + 36, x + w - 34, y + 40)
    pdf.line(x + w - 34, y + 62, x + w - 34, y + 70)
    pdf.line(x + w - 34, y + 92, x + w / 2, y + 96)
    pdf.line(x + w / 2 - 22, y + 96, x + 34, y + 92)
    pdf.line(x + 34, y + 70, x + 34, y + 40)


def main():
    pdf = Deck(orientation="L", unit="mm", format="A4")
    pdf.alias_nb_pages()
    pdf.set_auto_page_break(False)
    pdf.set_margins(0, 0, 0)

    # 1 Cover
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "National Children's Science Congress")
    heading(pdf, "AgriNova", 26, 42)
    pdf.set_xy(16, 50)
    pdf.set_font("Helvetica", "B", 18)
    pdf.set_text_color(*GREEN)
    pdf.multi_cell(190, 8, "Crop residue as income. Not smoke.")
    sub(
        pdf,
        "A live marketplace for farmers, biomass buyers, and agriculture officers in Punjab - with Kisan AI, soil cards, plot mapping, burn-vs-sell calculator, dual carbon credits, and a government pollution heatmap.",
        68,
    )
    bullets(
        pdf,
        [
            "Live: https://agrinova-ochre.vercel.app",
            "Four role-separated desks from one login (logout to switch)",
            "Punjab case study (Patiala-Sangrur) with lived-in demo data",
            "PDF + in-app slides for judges who will not install Node",
        ],
        y=96,
    )
    card(pdf, 210, 24, 70, 138)
    accent_bar(pdf, 210, 24, 70, SAFFRON)
    pdf.set_xy(216, 34)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*FG)
    pdf.cell(58, 6, "INSIDE THIS DECK")
    pdf.set_xy(216, 46)
    pdf.set_font("Helvetica", "", 9.5)
    pdf.set_text_color(*FG)
    for line in [
        "01  Why the product exists",
        "02  How the system is built",
        "03  User journey",
        "04  Punjab case study",
        "05  Product snapshots",
        "06  Features in the live demo",
        "07  Burn vs sell calculator",
        "08  Technical impact",
        "09  Field & climate impact",
        "10  Science frame & limits",
    ]:
        pdf.cell(58, 7.5, line, ln=1)
        pdf.set_x(216)

    # 2 Why
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "Why")
    heading(pdf, "The harvest window forces a burn default")
    sub(
        pdf,
        "After paddy harvest in Punjab, wheat sowing is 10-15 days away. Burning residue is fast. Selling it is not - unless a buyer, a price, and a pickup exist in that window.",
    )
    blocks = [
        ("Air", "Peak November PM2.5 episodes show crop-fire share around 30-40% in public literature. District officers lack a utilised-vs-burned view.", SOFT_SAFF, SAFFRON),
        ("Farmer", "Burning earns Rs 0 and risks NGT fines. Smallholders cannot hire a baler alone or reach mill WhatsApp groups.", SOFT_GREEN, GREEN),
        ("Buyer", "Biomass plants need moisture-qualified straw (often <=15%). Informal brokers skip 2-acre farms.", SOFT_NAVY, NAVY),
        ("Gap", "No shared desk that turns a mapped field into a matched offer, a pickup, and a credit - in one session.", SOFT_SAFF, SAFFRON),
    ]
    for i, (t, b, fill, col) in enumerate(blocks):
        x = 16 + (i % 2) * 134
        yy = 56 + (i // 2) * 54
        card(pdf, x, yy, 128, 48, fill)
        pdf.set_xy(x + 6, yy + 6)
        pdf.set_font("Helvetica", "B", 13)
        pdf.set_text_color(*col)
        pdf.cell(110, 7, t)
        pdf.set_xy(x + 6, yy + 16)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(*FG)
        pdf.multi_cell(116, 5, b)

    # 3 Product overview
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "Product")
    heading(pdf, "One platform. Four desks. No mixed profiles.")
    sub(pdf, "Login selects a role. That session stays on one desk. Switch account to change person. Wallets, listings, and policy views never blend.")
    desks = [
        ("Farmer", "Plot map on OpenStreetMap, burn-vs-sell calculator, residue listing wizard, match score, pickup, credits, Kisan AI, soil card, learn farming."),
        ("Buyer", "Procurement inbox, moisture specs, RFQs, dual credits, indicative green-tax / CSR simulator."),
        ("Government", "Department-style portal: pollution heatmap, operational clusters, utilisation slider, savings table, Policy AI."),
        ("Admin", "Transaction pipeline, carbon ledger, MRV queue for the demo cluster."),
    ]
    for i, (t, b) in enumerate(desks):
        x = 16 + i * 67
        card(pdf, x, 58, 63, 108)
        accent_bar(pdf, x, 58, 63, GREEN if i % 2 == 0 else SAFFRON)
        pdf.set_xy(x + 4, 68)
        pdf.set_font("Helvetica", "B", 13)
        pdf.set_text_color(*FG)
        pdf.cell(55, 8, t)
        pdf.set_xy(x + 4, 80)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(55, 5.2, b)

    # 4 Architecture
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "How  |  System diagram")
    heading(pdf, "Architecture of the running product", 16, 18)
    arch = DIAG / "agrinova-architecture.png"
    if not img(pdf, arch, 16, 30, 175, 110):
        draw_architecture(pdf, 16, 30, 175, 130)
    caption_box(
        pdf,
        196,
        30,
        84,
        130,
        "Four desks, one engine",
        "Roles sit on a React + TypeScript UI. Maps use Leaflet/OSM. Matching is rule-based and moisture-aware. Kisan AI and Policy AI call OpenAI when a key is present, else researched fallbacks. Marketplace state lives in the browser (localStorage) with lived-in seed data so a booth demo is never empty. Hosting is Vercel.",
    )

    # 5 Tech
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "How  |  Technical stack")
    heading(pdf, "What the product is built on")
    rows = [
        ("Interface", "React 19, TypeScript, Vite, Tailwind. White canvas with saffron-white-green tricolor. Role-scoped navigation and toast feedback."),
        ("Maps", "Leaflet + OpenStreetMap. Farmers draw field corners in lat/lng; acres from geodesic area. Government heat and operational markers share the same basemap."),
        ("Marketplace", "Classify residue, value it, rank pathways, Match Score (distance, demand, moisture, price, pathway). Transaction state machine through pickup and complete."),
        ("Decision tool", "Burn-vs-sell calculator: acres, price, moisture, baling cost -> net income, NGT fine risk, credits, tCO2e, top buyer match."),
        ("AI", "OpenAI gpt-4o-mini with role system prompts. Voice input (browser speech recognition) and spoken replies. Soil card injected into farmer context."),
        ("Carbon", "Avoided tCO2e on completed sales. Farmer wallet (redeem seed/fertiliser). Buyer procurement credits feeding an indicative Rs/tCO2e simulator."),
        ("Data", "Punjab 25-farm pack + West Bengal comparison pack. Lived-in seed: Simran already sold; GreenPower RFQ is open."),
    ]
    for i, (t, b) in enumerate(rows):
        y = 46 + i * 16.5
        pdf.set_fill_color(*GREEN)
        pdf.rect(16, y + 1, 2.5, 9, "F")
        pdf.set_xy(22, y)
        pdf.set_font("Helvetica", "B", 11)
        pdf.set_text_color(*GREEN)
        pdf.cell(34, 6, t)
        pdf.set_xy(56, y)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(*FG)
        pdf.multi_cell(224, 5, b)

    # 6 Journey diagram
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "User journey")
    heading(pdf, "From login to credits - and the officer path", 16, 18)
    journey = DIAG / "agrinova-user-journey.png"
    if not img(pdf, journey, 16, 30, 264, 108):
        draw_journey(pdf, 16, 30, 264, 120)
    else:
        pdf.set_xy(16, 142)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(
            264,
            5,
            "Diagram: farmer path is sequential (role login, map, calculate, list, match, pickup, credits). Government path is parallel - heatmap, operational sites, savings slider - with no farmer PII on that desk.",
        )

    # 7 Journey detail
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "User journey  |  Farmer desk")
    heading(pdf, "Seven steps as implemented")
    steps = [
        ("1. Role login", "Select Farmer / Buyer / Government / Admin. Confirm name, village, district. One session, one desk."),
        ("2. Plot map", "Click field corners on OSM around Kharar. Sale parcels estimate straw (~2 t/acre rice). Pathways ranked for that tonnage."),
        ("3. Burn vs sell", "Slide acres, price, moisture, baling cost. See net income vs Rs 0 burn, fine risk, credits, and top Match Score."),
        ("4. List residue", "Wizard: farm, quality, moisture, bales, expected Rs/t, pathway. Classification can be overridden."),
        ("5. Match", "Top buyers scored. Moisture above plant spec is penalised. Quantity and radius remain hard filters."),
        ("6. Pickup", "Accept offer. Compare individual vs consolidated logistics. Advance the transaction."),
        ("7. Credits", "On complete: farmer credits for seed/urea; buyer procurement credits for the tax/CSR panel."),
    ]
    for i, (t, b) in enumerate(steps):
        x = 16 + (i % 4) * 66
        y = 50 + (i // 4) * 58
        if i == 6:
            x = 16 + 66
        card(pdf, x, y, 62, 52)
        pdf.set_xy(x + 4, y + 5)
        pdf.set_font("Helvetica", "B", 11)
        pdf.set_text_color(*SAFFRON)
        pdf.cell(54, 6, t)
        pdf.set_xy(x + 4, y + 14)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(*FG)
        pdf.multi_cell(54, 4.6, b)

    # Snapshots
    shots = [
        ("Snapshot  |  Login", "Role-first login", "01-login.png", "What this screen does",
         "Four roles on one form. Farmer is selected here with a Punjab profile (Kharar, 6 acres). Login is identity for the demo, not a password IdP. Citizen and officer desks stay separate after this step."),
        ("Snapshot  |  Farmer", "Farmer workspace home", "02-farmer-home.png", "What this screen does",
         "Signed-in farmer only. Sidebar is the residue desk: map, burn vs sell, sell, listings, credits, Kisan AI, learn, pickup. Language toggle EN/HI/BN. Switch account is logout - not a mid-session role flip."),
        ("Snapshot  |  Plot map", "Real map, drawn parcels, straw estimate", "03-plot-map.png", "What this screen does",
         "OpenStreetMap around Kharar. Green polygon is a sale parcel. 2.5 acres rice maps to ~5.0 t straw. Pathways (biomass, biochar, compost) sit under the map so geography feeds the market."),
        ("Snapshot  |  Sell wizard", "List residue: farm, quality, match", "04-sell.png", "What this screen does",
         "Seven-step golden path. AI classification of Rice Straw with override chips. Moisture later gates whether GreenPower can lift the lot. This is the 5-minute judge path from field to offer."),
        ("Snapshot  |  Burn vs sell", "Decision calculator before listing", "10-impact.png", "What this screen does",
         "Interactive sliders for acres, gate price, moisture, and baling cost. Compares net sell income vs burn (Rs 0 + NGT fine risk), credits, avoided tCO2e, and the best buyer Match Score at that moisture."),
        ("Snapshot  |  Kisan AI + soil", "Soil monitoring card + OpenAI chat", "05-kisan-ai.png", "What this screen does",
         "Editable soil card: alluvial, pH 7.2, OC 0.45%, N medium. KisanSathi uses that card plus mapped acres. Mic and spoken replies. OpenAI live when a local key is set; otherwise researched fallbacks."),
        ("Snapshot  |  Learn farming", "New methods taught inside the same desk", "06-learn.png", "What this screen does",
         "Practice cards (Happy Seeder, DSR, biochar, mulch, pulses) seed the chatbot. Voice on. The farmer stays in-role - learning is not a separate government portal."),
        ("Snapshot  |  Credits", "Farmer wallet after sales", "07-credits.png", "What this screen does",
         "Credits from completed residue sales. Redeem against seed/fertiliser catalogue with toast confirmation. Simran's lived-in sale is already in seed data so this screen is never empty on first load."),
        ("Snapshot  |  Buyer", "Procurement desk", "09-buyer.png", "What this screen does",
         "GreenPower-style inbox: listings with moisture, Rs/t, demand chart. Buyer carbon credits and indicative green-tax/CSR relief. Plant spec (max 15% moisture, 15 TPD) sits in the header."),
        ("Snapshot  |  Government", "Agriculture portal: heatmap + savings", "08-government.png", "What this screen does",
         "Department of Agriculture masthead. Heat blobs = demo PM intensity. Green markers = operational AgriNova clusters. Utilisation slider projects straw diverted, farmer income, and tCO2e. Model estimate, not a census forecast."),
    ]
    for k, title, file, ct, cb in shots:
        snapshot_slide(pdf, k, title, SNAP / file, ct, cb)

    # Case study
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "Punjab case study")
    heading(pdf, "Patiala-Sangrur cluster as the product's home")
    sub(pdf, "The running demo is a 25-farm pack in the rice-wheat belt. People are fictional; agronomy, distances, and air context are grounded in CRM practice and public episode literature.")
    facts = [
        ("Cluster", "25 farms, ~180 t straw in the pack. Default story: 2.5 acres paddy x ~2 t/acre = ~5 t for one listing."),
        ("Places", "Kharar (farmer plots), Rajpura (GreenPower plant, 8 km), Sangrur (second farmer), Patiala DAO desk."),
        ("Without AgriNova", "148 t burned / 32 t utilised in the pack. Farmer income Rs 0. Indicative PM index 172."),
        ("With 70% utilisation", "54 t burned / 126 t utilised. Farmer income Rs 9.45 lakh. ~151 tCO2e avoided. PM index 138."),
        ("Operational sites", "Kharar, Sunam, Rajpura live; Barnala pilot. Rollup: straw diverted, burn avoided, income, tCO2e on the map."),
        ("Honesty layer", "Labels: demonstration data, model estimate, public data. No statewide forecast from 25 farms."),
    ]
    for i, (t, b) in enumerate(facts):
        x = 16 + (i % 3) * 88
        y = 58 + (i // 3) * 54
        card(pdf, x, y, 84, 48)
        pdf.set_xy(x + 5, y + 5)
        pdf.set_font("Helvetica", "B", 11)
        pdf.set_text_color(*NAVY)
        pdf.cell(74, 6, t)
        pdf.set_xy(x + 5, y + 14)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(*FG)
        pdf.multi_cell(74, 4.8, b)

    # Features
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "Features")
    heading(pdf, "Capability list in the live product")
    feats = [
        ("Role login", "Farmer, buyer, government, admin - separate nav, RoleGate on URLs."),
        ("OSM plot map", "Draw parcels, geodesic acres, straw estimate, pathway ranking."),
        ("Burn vs sell", "Interactive calculator: income, fine risk, credits, Match Score."),
        ("Sell wizard", "Classify, value, moisture, offers, logistics, complete."),
        ("Match Score", "Five factors + moisture penalty vs plant spec."),
        ("Kisan AI", "OpenAI, Hindi/English, soil-aware, voice in and out."),
        ("Soil card", "Type, pH, OC%, N status persisted in session."),
        ("Learn farming", "Happy Seeder, DSR, biochar, mulch, diversification."),
        ("Dual credits", "Farmer redeem + buyer procurement / CSR panel."),
        ("Gov heatmap", "Heat + operational markers + utilisation slider."),
        ("Carbon ledger", "Avoided tCO2e entries and MRV queue."),
        ("Toast UX", "Confirm redemptions and soft warnings without blocking."),
        ("Lived-in seed", "Prior sale and open RFQ so tables are not empty."),
        ("i18n", "EN / HI / BN toggle on the shell."),
        ("Tricolor UI", "White base with saffron and India-green accents."),
    ]
    for i, (t, b) in enumerate(feats):
        x = 16 + (i % 3) * 88
        y = 46 + (i // 3) * 24
        pdf.set_xy(x, y)
        pdf.set_font("Helvetica", "B", 10.5)
        pdf.set_text_color(*GREEN)
        pdf.cell(80, 5, t)
        pdf.set_xy(x, y + 5.5)
        pdf.set_font("Helvetica", "", 9)
        pdf.set_text_color(*FG)
        pdf.multi_cell(82, 4.3, b)

    # Burn vs sell deep dive
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "Feature deep dive")
    heading(pdf, "Burn vs sell - decide before you list")
    sub(pdf, "Farmers often know burning is harmful but cannot see the rupee math in the harvest window. This calculator makes the swing visible before the sell wizard.")
    cards = [
        ("Inputs", "Paddy acres, gate price Rs/t, moisture %, baling + handling cost. Straw yield uses ~2 t/acre (IARI-style demo factor)."),
        ("Outputs", "Gross and net income, NGT environmental-compensation risk bands, AgriNova credits, avoided tCO2e, top buyer Match Score."),
        ("Action", "One click lists the calculated tonnage into the sell wizard so the decision becomes a transaction."),
    ]
    for i, (t, b) in enumerate(cards):
        x = 16 + i * 88
        card(pdf, x, 58, 84, 55)
        accent_bar(pdf, x, 58, 84, SAFFRON if i == 0 else GREEN if i == 1 else NAVY)
        pdf.set_xy(x + 5, 68)
        pdf.set_font("Helvetica", "B", 12)
        pdf.set_text_color(*FG)
        pdf.cell(74, 6, t)
        pdf.set_xy(x + 5, 78)
        pdf.set_font("Helvetica", "", 9.5)
        pdf.set_text_color(*MUTED)
        pdf.multi_cell(74, 4.8, b)
    bullets(
        pdf,
        [
            "Example: 2.5 acres -> ~5 t. At Rs 750/t and Rs 180/t baling, net ~Rs 2,850 - vs Rs 0 burn and up to Rs 5,000 compensation risk.",
            "Moisture above 15% surfaces a drying tip and lowers Match Score so the farmer fixes quality before listing.",
            "Carbon uses the same avoided-tCO2e service as the ledger, so booth numbers stay consistent across screens.",
        ],
        y=124,
    )

    # Technical impact
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "Technical impact")
    heading(pdf, "What the engineering choices enable")
    items = [
        ("Explainable matching", "Judges can open a score breakdown: distance, demand, moisture, price, pathway. Not a black box."),
        ("Geography is real", "OSM tiles and lat/lng parcels make straw-from-land credible. Heatmap uses district HQ coords, not a fake sketch."),
        ("AI is bounded", "Role system prompts. Soil and acres injected. Missing key -> fallback copy so the booth still runs."),
        ("State is demo-safe", "localStorage + seed data. Reset possible. No farmer PII on the government desk."),
        ("Honest models", "Utilisation slider and before/after charts are labelled MODEL ESTIMATE and scaled to the cluster."),
        ("Decision before listing", "Burn-vs-sell reuses Match Score and carbon services so the calculator is not a disconnected toy."),
        ("Deployed", "SPA on Vercel with SPA rewrites. Live URL for judges who will not install Node."),
    ]
    for i, (t, b) in enumerate(items):
        y = 48 + i * 16
        pdf.set_fill_color(*GREEN)
        pdf.rect(16, y + 1, 3, 10, "F")
        pdf.set_xy(24, y)
        pdf.set_font("Helvetica", "B", 11.5)
        pdf.set_text_color(*FG)
        pdf.cell(240, 6, t)
        pdf.set_xy(24, y + 6)
        pdf.set_font("Helvetica", "", 10)
        pdf.set_text_color(*MUTED)
        pdf.cell(250, 5.5, b)

    # Impact + loop
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "Impact")
    heading(pdf, "If straw is sold instead of burned", 16, 18)
    loop = DIAG / "agrinova-impact-loop.png"
    if not img(pdf, loop, 16, 30, 155, 95):
        draw_impact_loop(pdf, 16, 30, 155, 110)
    caption_box(
        pdf,
        176,
        30,
        104,
        110,
        "Circular residue loop",
        "Burn avoided feeds utilisation. Plants get feedstock. Farmers get Rs/t plus redeemable credits. Buyers get procurement credits. District PM index falls in the model. The loop is the product: marketplace + credits + officer view.",
    )
    bullets(
        pdf,
        [
            "Farmer: cash vs Rs 0 burn; credits for seed/fertiliser; calculator shows the swing before listing.",
            "Buyer: moisture-qualified lots from farms that never reached mill groups.",
            "Officer: utilised vs burned by district, operational cluster savings, dual-credit totals - aggregates only.",
            "Climate: avoided tCO2e on completed transactions; 70% utilisation pack ~151 tCO2e in the demo model.",
        ],
        y=128,
    )

    # Science
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "Science frame")
    heading(pdf, "Question the product is designed to test")
    sub(
        pdf,
        "Can an AI-assisted marketplace plus soil guidance and a clear burn-vs-sell decision shift the default from burn to sell for smallholders inside a 10-15 day harvest window?",
    )
    card(pdf, 16, 56, 125, 105)
    pdf.set_xy(22, 62)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(*SAFFRON)
    pdf.cell(110, 6, "Hypothesis")
    pdf.set_xy(22, 72)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(*FG)
    pdf.multi_cell(
        113,
        5.5,
        "Income + moisture-aware match + pickup logistics + soil-aware advice + visible rupee math beats the burn habit for a 4-6 acre rice-wheat farm.",
    )
    pdf.set_xy(22, 112)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(*SAFFRON)
    pdf.cell(110, 6, "Method")
    pdf.set_xy(22, 122)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(*FG)
    pdf.multi_cell(
        113,
        5.5,
        "Interactive simulation. Lived-in seed. Complete a sale in-session. Compare without vs 70% utilisation. West Bengal pack for comparative CRM.",
    )

    card(pdf, 148, 56, 132, 105)
    pdf.set_xy(154, 62)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(*GREEN)
    pdf.cell(120, 6, "Limits (stated in the UI)")
    pdf.set_xy(154, 74)
    pdf.set_font("Helvetica", "", 11)
    pdf.set_text_color(*FG)
    pdf.multi_cell(
        120,
        5.5,
        "Not cadastral land records. Not live CPCB sensors. Not a certified carbon registry. Buyer tax panel is indicative, not a finance-ministry rule. Fine bands are published NGT reference slabs, not a legal notice. Cluster numbers are not state totals.",
    )

    # Close
    pdf.add_page()
    fill_page(pdf)
    kicker(pdf, "Ready to run")
    heading(pdf, "AgriNova is live")
    sub(pdf, "Open the product. Pick a role. Walk one desk. Then switch account for the officer heatmap.")
    card(pdf, 16, 54, 170, 100)
    accent_bar(pdf, 16, 54, 170, GREEN)
    pdf.set_xy(24, 66)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(*GREEN)
    pdf.cell(150, 8, "https://agrinova-ochre.vercel.app")
    pdf.set_xy(24, 80)
    pdf.set_font("Helvetica", "", 11.5)
    pdf.set_text_color(*FG)
    pdf.multi_cell(
        154,
        6.5,
        "Login  ->  Farmer  ->  Plot map  ->  Burn vs sell  ->  Sell residue\nLogin  ->  Government  ->  Air heatmap + savings slider\nLogin  ->  Farmer  ->  Kisan AI (soil + voice)\nIn-app slides: /presentation\nPDF download: /AgriNova_Presentation.pdf",
    )
    card(pdf, 194, 54, 86, 100)
    accent_bar(pdf, 194, 54, 86, SAFFRON)
    pdf.set_xy(200, 66)
    pdf.set_font("Helvetica", "B", 12)
    pdf.set_text_color(*SAFFRON)
    pdf.cell(74, 8, "Tagline")
    pdf.set_xy(200, 80)
    pdf.set_font("Helvetica", "B", 14)
    pdf.set_text_color(*FG)
    pdf.multi_cell(74, 8, "Predict.\nProtect.\nProsper.\nRecycle.")
    pdf.set_xy(16, 164)
    pdf.set_font("Helvetica", "", 10)
    pdf.set_text_color(*MUTED)
    pdf.cell(0, 6, "National Children's Science Congress  |  Punjab case study demo  |  Product as shipped")

    pdf.output(str(OUT))
    public_out = ROOT / "public" / "AgriNova_Presentation.pdf"
    public_out.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(OUT, public_out)
    print(OUT)
    print(public_out)


if __name__ == "__main__":
    main()
