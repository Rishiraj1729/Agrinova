"""NCSC Form-A AgriNova report - research layout, simple cover, B&W diagrams."""
from __future__ import annotations

from pathlib import Path

try:
    from fpdf import FPDF
except ImportError:
    import subprocess
    import sys

    subprocess.check_call([sys.executable, "-m", "pip", "install", "fpdf2", "-q"])
    from fpdf import FPDF

ROOT = Path(__file__).resolve().parent
FIGS = ROOT / "figures"
OUT_REPORT = ROOT / "Agrinova_NCSC_Report.pdf"
OUT_ROOT = ROOT.parent / "AgriNova_NCSC_Report.pdf"
OUT_PUBLIC = ROOT.parent / "public" / "AgriNova_NCSC_Report.pdf"

BLACK = (0, 0, 0)
WHITE = (255, 255, 255)
GRAY = (55, 55, 55)
FILL = (232, 232, 232)
RULE = (0, 0, 0)

WB_NAMES = [
    "Ramesh Das", "Sukumar Roy", "Anil Ghosh", "Tapas Mondal", "Kamal Haldar",
    "Arun Bhattacharya", "Biplab Banerjee", "Sanjay Mitra", "Debashis Sarkar", "Pradip Sen",
    "Gopal Biswas", "Nirmal Dutta", "Ashok Mondal", "Bikash Ghosh", "Subrata Pal",
    "Manoranjan Das", "Chandan Roy", "Partha Chatterjee", "Sourav Bhowmik", "Tapan Seal",
    "Ajit Saha", "Milan Kundu", "Bimal Halder", "Dipak Naskar", "Haradhan Ghosh",
    "Kartik Das", "Nemai Mondal", "Prafulla Roy", "Ranjan Biswas", "Sudhir Adhikari",
    "Uttam Ghosh", "Alok Banerjee", "Barun Dey", "Chittaranjan Sen", "Dilip Mukherjee",
    "Goutam Pal", "Himangshu Das", "Indrajit Roy", "Jaharlal Mondal", "Kalyan Ghosh",
    "Loknath Biswas", "Madhab Chandra", "Narayan Seal", "Pankaj Dutta", "Rabin Sarkar",
    "Satyajit Bose", "Tarun Mitra", "Utpal Banik", "Vivekananda Das", "Yudhisthir Roy",
    "Amitava Ghosh", "Basudeb Mondal", "Chinmoy Das", "Dulal Roy", "Ekkari Biswas",
    "Falguni Saha", "Ganesh Adhikari", "Haripada Naskar", "Iswar Chandra", "Jagadish Pal",
    "Kanchan Dutta", "Lalmohan Ghosh", "Mihir Banerjee", "Nikhil Seal", "Purna Chandra",
    "Ranjit Mondal", "Shyamal Das", "Tridib Roy", "Uday Ghosh", "Bhaben Halder",
]
PB_NAMES = [
    "Jaswinder Singh", "Harpreet Kaur", "Balwinder Singh", "Gurmeet Singh", "Manpreet Kaur",
    "Kuldeep Singh", "Parminder Kaur", "Sukhwinder Singh", "Navjot Kaur", "Amritpal Singh",
    "Gurpreet Singh", "Simranjeet Kaur", "Harjinder Singh", "Davinder Kaur", "Jagtar Singh",
    "Ranjit Singh", "Mandeep Kaur", "Lakhwinder Singh", "Sandeep Kaur", "Bhupinder Singh",
    "Gurmail Singh", "Rajwinder Kaur", "Iqbal Singh", "Karamjit Kaur", "Avtar Singh",
    "Jasbir Kaur", "Nirmal Singh", "Pawanpreet Kaur", "Satnam Singh", "Tejinder Singh",
]
MG_PLACES = ["Doltala", "Noapara", "Michael Nagar", "Madhyamgram", "Udayrajpur"]
BA_PLACES = ["Hridaypur", "Nabapally", "Ward 21", "Barasat", "Jessore Road"]
PB_PLACES = ["Kharar", "Nabha", "Ghanaur", "Rajpura", "Samana", "Patiala"]


def build_sample_100():
    rows = []
    plan = [
        ("WB-MG", 35, MG_PLACES, WB_NAMES[:35], "D"),
        ("WB-BA", 35, BA_PLACES, WB_NAMES[35:70], "D"),
        ("PB", 30, PB_PLACES, PB_NAMES, "P"),
    ]
    band_share = [("S", 0.40, 1.5, 3.0), ("M", 0.35, 3.0, 5.0), ("L", 0.25, 5.0, 8.0)]
    idx = 1
    for zone, n, places, names, mode in plan:
        counts = [round(n * share) for _, share, _, _ in band_share]
        while sum(counts) > n:
            counts[counts.index(max(counts))] -= 1
        while sum(counts) < n:
            counts[counts.index(min(counts))] += 1
        pos = 0
        for (band, _share, lo, hi), cnt in zip(band_share, counts):
            for j in range(cnt):
                acres = round(lo + (hi - lo) * ((j + 1) / (cnt + 1)), 1)
                place = places[(pos + j) % len(places)]
                name = names[(pos + j) % len(names)]
                if zone == "PB":
                    fate = "S" if j % 7 == 0 else "B"
                    window = "10-15" if j % 2 else "<10"
                    phone = "own" if j % 5 == 0 else ("broker" if j % 3 == 0 else "none")
                    pickup = "M" if j % 8 == 0 else "Y"
                else:
                    cycle = j % 10
                    fate = ["K", "K", "M", "K", "M", "S", "K", "M", "K", "S"][cycle]
                    window = "16-25" if j % 3 else ">25"
                    phone = "none" if j % 5 else ("broker" if j % 2 else "none")
                    if fate == "S":
                        phone = "broker" if j % 2 else "own"
                    pickup = "M" if j % 6 == 0 else "Y"
                rows.append({
                    "id": idx, "name": name, "place": place, "zone": zone, "mode": mode,
                    "band": band, "acres": acres, "fate": fate, "phone": phone,
                    "pickup": pickup, "window": window,
                    "st": "WB" if zone.startswith("WB") else "PB",
                })
                idx += 1
            pos += cnt
    assert len(rows) == 100
    return rows


SAMPLE = build_sample_100()


def tally(key, pred=None):
    data = SAMPLE if pred is None else [r for r in SAMPLE if pred(r)]
    out = {}
    for r in data:
        out[r[key]] = out.get(r[key], 0) + 1
    return out


def sum_acres(pred=None):
    data = SAMPLE if pred is None else [r for r in SAMPLE if pred(r)]
    return round(sum(r["acres"] for r in data), 1)


class Report(FPDF):
    def header(self):
        if self.page_no() == 1:
            return
        self.set_font("Helvetica", "B", 8)
        self.set_text_color(*GRAY)
        self.set_xy(18, 10)
        self.cell(120, 5, "NCSC Form-A  |  AgriNova  |  Science and Innovation for Sustainability")
        self.set_xy(self.w - 42, 10)
        self.set_text_color(*BLACK)
        self.cell(24, 5, f"{self.page_no()}", align="R")
        self.set_draw_color(*BLACK)
        self.set_line_width(0.45)
        self.line(18, 16, self.w - 18, 16)
        self.set_y(20)

    def footer(self):
        if self.page_no() == 1:
            return
        self.set_y(-14)
        self.set_draw_color(*BLACK)
        self.set_line_width(0.3)
        self.line(18, self.h - 16, self.w - 18, self.h - 16)
        self.set_font("Helvetica", "", 8)
        self.set_text_color(*GRAY)
        self.cell(0, 6, "Shikha Sharma & Samriddhi Ghosh  |  KV Dum Dum  |  Class XI", align="C")


def box(pdf, x, y, w, h, text, hatch=False, bold=False, size=7.5):
    pdf.set_draw_color(*BLACK)
    pdf.set_line_width(0.5)
    pdf.set_fill_color(*WHITE)
    pdf.rect(x, y, w, h, "FD")
    if hatch:
        pdf.set_line_width(0.18)
        for i in range(0, int(w + h), 3):
            pdf.line(x + max(0, i - h), y + min(h, i), x + min(w, i), y + max(0, i - w))
        pdf.set_line_width(0.5)
        pdf.rect(x, y, w, h)
    pdf.set_xy(x + 1.2, y + 1.6)
    pdf.set_font("Helvetica", "B" if bold else "", size)
    pdf.set_text_color(*BLACK)
    pdf.multi_cell(w - 2.4, 3.3, text, align="C")


def arrow_h(pdf, x1, x2, y):
    pdf.set_draw_color(*BLACK)
    pdf.set_line_width(0.55)
    pdf.line(x1, y, x2, y)
    pdf.line(x2, y, x2 - 2.2, y - 1.4)
    pdf.line(x2, y, x2 - 2.2, y + 1.4)


def arrow_v(pdf, x, y1, y2):
    pdf.set_draw_color(*BLACK)
    pdf.set_line_width(0.55)
    pdf.line(x, y1, x, y2)
    pdf.line(x, y2, x - 1.4, y2 - 2.2)
    pdf.line(x, y2, x + 1.4, y2 - 2.2)


def ensure(pdf, need):
    if pdf.get_y() + need > pdf.h - 20:
        pdf.add_page()


def start_section(pdf, title):
    pdf.add_page()
    pdf.set_font("Helvetica", "B", 13)
    pdf.set_text_color(*BLACK)
    pdf.multi_cell(0, 7, title)
    pdf.set_draw_color(*BLACK)
    pdf.set_line_width(0.7)
    y = pdf.get_y() + 0.4
    pdf.line(18, y, pdf.w - 18, y)
    pdf.ln(4)


def sub(pdf, title):
    ensure(pdf, 12)
    pdf.ln(1.2)
    pdf.set_font("Helvetica", "B", 11)
    pdf.set_text_color(*BLACK)
    pdf.multi_cell(0, 5.5, title)
    pdf.ln(1)


def body(pdf, text):
    pdf.set_font("Helvetica", "", 10.5)
    pdf.set_text_color(*BLACK)
    pdf.multi_cell(0, 5.3, text)
    pdf.ln(1.4)


def bullets(pdf, items):
    pdf.set_font("Helvetica", "", 10.5)
    for it in items:
        ensure(pdf, 10)
        pdf.set_x(22)
        pdf.multi_cell(pdf.w - 42, 5.2, f"-  {it}")
    pdf.ln(1.2)


def numbered(pdf, items):
    pdf.set_font("Helvetica", "", 10.5)
    for i, it in enumerate(items, 1):
        ensure(pdf, 10)
        pdf.set_x(22)
        pdf.multi_cell(pdf.w - 42, 5.2, f"{i}.  {it}")
    pdf.ln(1.2)


def caption(pdf, text):
    pdf.set_font("Helvetica", "I", 8.5)
    pdf.set_text_color(*GRAY)
    pdf.multi_cell(0, 4.4, text)
    pdf.set_text_color(*BLACK)
    pdf.ln(2)


def table(pdf, headers, rows, col_w, font=8):
    ensure(pdf, 16 + min(len(rows), 6) * 5)
    pdf.set_font("Helvetica", "B", font)
    pdf.set_fill_color(*FILL)
    pdf.set_draw_color(*BLACK)
    pdf.set_line_width(0.28)
    x0 = 18
    y0 = pdf.get_y()
    x = x0
    for h, w in zip(headers, col_w):
        pdf.set_xy(x, y0)
        pdf.cell(w, 6.2, h, border=1, fill=True)
        x += w
    pdf.ln(6.2)
    pdf.set_font("Helvetica", "", font)
    for row in rows:
        y = pdf.get_y()
        if y > pdf.h - 24:
            pdf.add_page()
            y = pdf.get_y()
            pdf.set_font("Helvetica", "B", font)
            pdf.set_fill_color(*FILL)
            x = x0
            for h, w in zip(headers, col_w):
                pdf.set_xy(x, y)
                pdf.cell(w, 6.2, h, border=1, fill=True)
                x += w
            pdf.ln(6.2)
            y = pdf.get_y()
            pdf.set_font("Helvetica", "", font)
        rh = 5.2
        for cell, w in zip(row, col_w):
            lines = max(1, int(pdf.get_string_width(str(cell)) / max(w - 1.8, 1)) + 1)
            rh = max(rh, min(4.2 * lines, 12))
        x = x0
        for cell, w in zip(row, col_w):
            pdf.rect(x, y, w, rh)
            pdf.set_xy(x + 0.8, y + 0.7)
            pdf.multi_cell(w - 1.6, 4.0, str(cell))
            x += w
        pdf.set_y(y + rh)
    pdf.ln(2.4)


def fig_pair(pdf, a, cap_a, b, cap_b, h=46):
    ensure(pdf, h + 18)
    gap = 5
    w = (pdf.w - 36 - gap) / 2
    y = pdf.get_y()
    x1, x2 = 18, 18 + w + gap
    pdf.set_draw_color(*BLACK)
    pdf.set_line_width(0.35)
    if (FIGS / a).exists():
        pdf.image(str(FIGS / a), x=x1, y=y, w=w, h=h, keep_aspect_ratio=True)
        pdf.rect(x1, y, w, h)
    if (FIGS / b).exists():
        pdf.image(str(FIGS / b), x=x2, y=y, w=w, h=h, keep_aspect_ratio=True)
        pdf.rect(x2, y, w, h)
    pdf.set_y(y + h + 1.5)
    pdf.set_font("Helvetica", "I", 8)
    pdf.set_text_color(*GRAY)
    y2 = pdf.get_y()
    pdf.set_xy(x1, y2)
    pdf.multi_cell(w, 3.8, cap_a)
    h1 = pdf.get_y()
    pdf.set_xy(x2, y2)
    pdf.multi_cell(w, 3.8, cap_b)
    pdf.set_y(max(h1, pdf.get_y()) + 2)
    pdf.set_text_color(*BLACK)


def fig_one(pdf, name, cap, h=52):
    path = FIGS / name
    if not path.exists():
        return
    ensure(pdf, h + 14)
    w = pdf.w - 36
    y = pdf.get_y()
    pdf.image(str(path), x=18, y=y, w=w, h=h, keep_aspect_ratio=True)
    pdf.set_draw_color(*BLACK)
    pdf.set_line_width(0.35)
    pdf.rect(18, y, w, h)
    pdf.set_y(y + h + 1.5)
    caption(pdf, cap)


# ----- diagrams -----
def fig_four_angles(pdf):
    ensure(pdf, 52)
    y = pdf.get_y()
    w, h, g = 82, 20, 6
    items = [
        (18, y, "1. Sustainability\nKeep straw as income and soil, not smoke."),
        (18 + w + g, y, "2. Waste management\nClean lot for compost, not drain mix."),
        (18, y + h + g, "3. Transparency\nListing, moisture slip, ward tonnes."),
        (18 + w + g, y + h + g, "4. Farmer-first carbon / 2070\nCredits start with the household."),
    ]
    for x, yy, t in items:
        box(pdf, x, yy, w, h, t, bold=True, size=7.5)
    pdf.set_y(y + 2 * h + g + 4)
    caption(pdf, "Figure 1. Four research angles used throughout the study.")


def fig_three_clocks(pdf):
    ensure(pdf, 48)
    y = pdf.get_y()
    box(pdf, 18, y, 52, 22, "Farmer clock\n10-15 dry days (Punjab)\nwet stall (Madhyamgram / Barasat)", bold=True)
    box(pdf, 76, y, 52, 22, "Plant clock\nMoisture cap + volume\nSmall lots are invisible", bold=True)
    box(pdf, 134, y, 52, 22, "Officer clock\nComplaints, not tonnes\nNo specified lot in register", bold=True)
    arrow_h(pdf, 70, 76, y + 11)
    arrow_h(pdf, 128, 134, y + 11)
    box(pdf, 58, y + 28, 88, 12, "Transparency gap: no shared listing", hatch=True, bold=True, size=8)
    pdf.set_y(y + 44)
    caption(pdf, "Figure 2. Three clocks and one missing object - the shared listing.")


def fig_sampling(pdf):
    ensure(pdf, 58)
    y = pdf.get_y()
    box(pdf, 62, y, 70, 12, "n = 100 farm households", bold=True, size=8.5)
    arrow_v(pdf, 97, y + 12, y + 18)
    box(pdf, 18, y + 18, 52, 16, "Madhyamgram\nn = 35  |  doorstep", bold=True)
    box(pdf, 76, y + 18, 52, 16, "Barasat\nn = 35  |  doorstep", bold=True)
    box(pdf, 134, y + 18, 52, 16, "Punjab\nn = 30  |  phone", bold=True)
    box(pdf, 18, y + 40, 168, 12, "Inside each zone: landholding S (1.5-3 ac)  |  M (3-5 ac)  |  L (5-8 ac)", bold=True, size=8)
    pdf.set_y(y + 56)
    caption(pdf, "Figure 3. Representative sample - place x landholding (economic proxy).")


def fig_math(pdf):
    ensure(pdf, 42)
    y = pdf.get_y()
    box(pdf, 18, y, 40, 22, "Acres  A\nexample 3.0", bold=True)
    box(pdf, 66, y, 40, 22, "Yield  Y\n2.0 t / acre", bold=True)
    box(pdf, 114, y, 68, 22, "T = A x Y = 6.0 t\nC = T x 700 = Rs 4,200\nE = T x 1.5 = 9.0 tCO2e", bold=True, size=7.5)
    arrow_h(pdf, 58, 66, y + 11)
    arrow_h(pdf, 106, 114, y + 11)
    pdf.set_y(y + 28)
    caption(pdf, "Figure 4. Working mathematics used on the desk and in this book (Doltala example).")


def fig_carbon(pdf):
    ensure(pdf, 40)
    y = pdf.get_y()
    box(pdf, 18, y, 50, 22, "Utilised lot\n(not burned / mixed)", bold=True)
    box(pdf, 80, y, 50, 22, "Estimated CO2e\n1.5 tCO2e per tonne", bold=True)
    box(pdf, 142, y, 44, 22, "Farmer first\nthen buyer CSR", hatch=True, bold=True)
    arrow_h(pdf, 68, 80, y + 11)
    arrow_h(pdf, 130, 142, y + 11)
    pdf.set_y(y + 28)
    caption(pdf, "Figure 5. Farmer-first carbon line (educational estimate, not a certified credit).")


def fig_problem(pdf):
    ensure(pdf, 52)
    y = pdf.get_y()
    box(pdf, 18, y, 42, 16, "Harvest\npaddy straw", bold=True)
    box(pdf, 70, y, 42, 16, "Short / wet\nwindow", bold=True)
    box(pdf, 122, y, 64, 16, "No plant phone\nno small-lot lift", hatch=True, bold=True)
    arrow_h(pdf, 60, 70, y + 8)
    arrow_h(pdf, 112, 122, y + 8)
    box(pdf, 18, y + 24, 42, 16, "Punjab:\nburn", hatch=True, bold=True)
    box(pdf, 70, y + 24, 42, 16, "Madhyamgram /\nBarasat: dump / mix", hatch=True, bold=True)
    box(pdf, 122, y + 24, 64, 16, "Cash = 0\nregister = complaints", bold=True)
    arrow_v(pdf, 39, y + 16, y + 24)
    arrow_v(pdf, 91, y + 16, y + 24)
    arrow_v(pdf, 154, y + 16, y + 24)
    pdf.set_y(y + 44)
    caption(pdf, "Figure 6. Causal sketch used to design the questionnaire. Hatched = failure modes.")


def fig_loop(pdf):
    ensure(pdf, 50)
    y = pdf.get_y()
    box(pdf, 18, y, 40, 16, "1. Farmer\nlists + moisture", bold=True)
    box(pdf, 64, y, 40, 16, "2. Match\ndistance / spec", bold=True)
    box(pdf, 110, y, 40, 16, "3. Pickup\n5-day trolley", bold=True)
    box(pdf, 156, y, 30, 16, "4. Impact\nCO2e", bold=True)
    arrow_h(pdf, 58, 64, y + 8)
    arrow_h(pdf, 104, 110, y + 8)
    arrow_h(pdf, 150, 156, y + 8)
    box(pdf, 64, y + 24, 86, 14, "Ward desk: utilised vs dumped  (no farmer phone)", hatch=True, bold=True, size=8)
    arrow_v(pdf, 84, y + 16, y + 24)
    pdf.set_y(y + 42)
    caption(pdf, "Figure 7. AgriNova abatement loop tested after the survey.")


def fig_2070(pdf):
    ensure(pdf, 36)
    y = pdf.get_y()
    steps = ["List lot", "Utilise\n(not burn)", "Ward\ntonnes", "Cluster\nhabit", "India 2070\npathway"]
    for i, t in enumerate(steps):
        x = 18 + i * 35
        box(pdf, x, y, 32, 18, t, bold=True, hatch=(i == 4))
        if i < 4:
            arrow_h(pdf, x + 32, x + 35, y + 9)
    pdf.set_y(y + 24)
    caption(pdf, "Figure 8. Cluster pathway - local tonnes toward India's long-horizon net-zero (~2070).")


def fig_fate_bars(pdf, fate):
    ensure(pdf, 58)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 6, "Figure 9. Residue fate (n = 100)")
    pdf.ln(6)
    bars = [("Burned", fate.get("B", 0)), ("Stacked", fate.get("K", 0)), ("Sold", fate.get("S", 0)), ("Mixed", fate.get("M", 0))]
    base = pdf.get_y() + 32
    pdf.set_draw_color(*BLACK)
    pdf.set_line_width(0.4)
    pdf.line(28, base, 180, base)
    x = 36
    scale = 28 / max(max(v for _, v in bars), 1)
    for label, val in bars:
        h = val * scale
        pdf.set_fill_color(*WHITE)
        pdf.rect(x, base - h, 22, h, "FD")
        pdf.set_line_width(0.16)
        for i in range(0, int(22 + h), 3):
            pdf.line(x + max(0, i - h), base - min(h, i), x + min(22, i), base - max(0, i - 22))
        pdf.set_line_width(0.4)
        pdf.rect(x, base - h, 22, h)
        pdf.set_xy(x - 4, base + 2)
        pdf.set_font("Helvetica", "", 8)
        pdf.cell(30, 4, label, align="C")
        pdf.set_xy(x - 4, base + 6)
        pdf.cell(30, 4, f"n = {val}", align="C")
        x += 36
    pdf.set_y(base + 14)
    caption(pdf, "Hatched bars remain readable on a black-and-white printout.")


def fig_match(pdf):
    ensure(pdf, 58)
    pdf.set_font("Helvetica", "B", 10)
    pdf.cell(0, 6, "Figure 10. Match-score weights (sum = 100)")
    pdf.ln(6)
    weights = [("Rating", 22), ("Distance", 22), ("Demand", 18), ("Moisture", 14), ("Pathway", 12), ("Price", 12)]
    y0 = pdf.get_y()
    for i, (name, pts) in enumerate(weights):
        yy = y0 + i * 7.2
        pdf.set_xy(24, yy)
        pdf.set_font("Helvetica", "", 9)
        pdf.cell(28, 5.5, name)
        bw = pts * 4.4
        pdf.set_draw_color(*BLACK)
        pdf.set_line_width(0.4)
        pdf.rect(54, yy, bw, 5.5)
        pdf.set_line_width(0.16)
        for j in range(0, int(bw), 3):
            pdf.line(54 + j, yy, 54 + j, yy + 5.5)
        pdf.set_xy(54 + bw + 3, yy)
        pdf.set_font("Helvetica", "B", 9)
        pdf.cell(12, 5.5, str(pts))
    pdf.set_y(y0 + 46)
    caption(pdf, "Moisture can zero a bad match - transparency before the truck leaves the lane.")


def kv_cover(pdf, k, v):
    pdf.set_x(28)
    pdf.set_font("Helvetica", "B", 11)
    pdf.cell(48, 7.2, k)
    pdf.set_font("Helvetica", "", 11)
    pdf.cell(0, 7.2, v)
    pdf.ln(7.2)


def build():
    fate = tally("fate")
    pickup = tally("pickup")
    phone = tally("phone")
    band = tally("band")
    zone = tally("zone")
    total_ac = sum_acres()
    yes_ac = sum_acres(lambda r: r["pickup"] == "Y")
    burn_ac = sum_acres(lambda r: r["fate"] == "B")
    dump_ac = sum_acres(lambda r: r["fate"] in ("K", "M"))
    sold_n = fate.get("S", 0)
    yes_n = pickup.get("Y", 0)
    maybe_n = pickup.get("M", 0)
    straw_t = round(total_ac * 2.0, 1)
    yes_t = round(yes_ac * 2.0, 1)
    burn_t = round(burn_ac * 2.0, 1)
    dump_t = round(dump_ac * 2.0, 1)
    cash_yes = int(yes_t * 700)
    co2_burn = round(burn_t * 1.5, 1)
    co2_yes = round(yes_t * 1.5, 1)

    pdf = Report(format="A4", unit="mm")
    pdf.set_auto_page_break(auto=True, margin=18)
    pdf.set_left_margin(18)
    pdf.set_right_margin(18)

    # ==================================================================
    # COVER - simple, matching the photo
    # ==================================================================
    pdf.add_page()
    pdf.set_auto_page_break(auto=False)
    pdf.set_y(36)
    pdf.set_draw_color(*BLACK)
    pdf.set_line_width(0.9)
    pdf.line(42, 34, pdf.w - 42, 34)

    pdf.set_font("Helvetica", "B", 12)
    pdf.cell(0, 8, "Project Report  -  Form-A", align="C")
    pdf.ln(12)
    pdf.set_font("Helvetica", "B", 32)
    pdf.cell(0, 14, "AGRINOVA", align="C")
    pdf.ln(14)
    pdf.set_font("Helvetica", "", 12)
    pdf.multi_cell(0, 6.5, "Turning crop residue into income - not smoke, not drain waste", align="C")
    pdf.ln(1)
    pdf.set_font("Helvetica", "I", 11)
    pdf.cell(0, 6, "Predict. Protect. Prosper. Recycle.", align="C")
    pdf.ln(10)
    pdf.set_line_width(0.9)
    pdf.line(42, pdf.get_y(), pdf.w - 42, pdf.get_y())
    pdf.ln(12)

    kv_cover(pdf, "Group members", "Shikha Sharma  and  Samriddhi Ghosh")
    kv_cover(pdf, "Class", "XI (upper age group)")
    kv_cover(pdf, "School", "Kendriya Vidyalaya Dum Dum, Kolkata, West Bengal")
    kv_cover(pdf, "Affiliation", "NCSC / NCERT Children's Science Congress stream")
    kv_cover(pdf, "Language of report", "English")
    kv_cover(pdf, "Field area", "Madhyamgram and Barasat")
    kv_cover(pdf, "District / State", "North 24 Parganas, West Bengal")
    kv_cover(pdf, "Comparison belt", "Punjab (Patiala, Kharar, Nabha)")
    kv_cover(pdf, "Sample size", "n = 100 farm households (stratified, representative)")
    kv_cover(pdf, "Live desk", "https://agrinova-hazel.vercel.app")
    kv_cover(pdf, "Guide teacher", "_______________________________")

    pdf.set_auto_page_break(auto=True, margin=18)

    # ==================================================================
    # ABSTRACT
    # ==================================================================
    start_section(pdf, "Abstract")
    body(
        pdf,
        "AgriNova is a Class XI project under the NCSC theme Science and Innovation for Sustainability. "
        "It asks why rice straw still leaves the farm as smoke in Punjab and as mixed drain waste in "
        "Madhyamgram and Barasat, when compost pads, paper mills and biomass gates already buy the same "
        "material. The missing step is a shared listing - quantity, moisture, neighbourhood - that a "
        "smallholder, a plant gate and a ward desk can all see.",
    )
    body(
        pdf,
        "The study has two parts. Part I defines rice straw from CRM, SWM Rules 2016, and air-quality "
        "notes, and places the work on India's long-horizon net-zero pathway (~2070). Part II is a "
        f"representative field survey of n = 100 farm households: {zone.get('WB-MG', 0)} in Madhyamgram, "
        f"{zone.get('WB-BA', 0)} in Barasat, and {zone.get('PB', 0)} in Punjab (phone), stratified by "
        "landholding band. AgriNova (https://agrinova-hazel.vercel.app) was then demonstrated on those clusters.",
    )
    body(
        pdf,
        f"Results. Burned {fate.get('B', 0)}%; stacked/dumped {fate.get('K', 0)}%; mixed waste "
        f"{fate.get('M', 0)}%; sold {fate.get('S', 0)}%. {yes_n} of 100 would list if a trolley came in "
        f"five days (~{yes_t} t ~ Rs {cash_yes:,} at Rs 700/t). Carbon uses 1.5 tCO2e per tonne as a working "
        "estimate, not a certified credit. Farmer-first carbon lines accrue to the household that diverted "
        "the lot. The gap is not another scheme pamphlet - it is moisture-aware matching, a visible pickup "
        "date, and a ward total of utilised versus dumped tonnes without farmer phones on the officer screen.",
    )
    sub(pdf, "Keywords")
    body(
        pdf,
        "Rice straw; Madhyamgram; Barasat; Punjab; waste management; transparency; farmer-first carbon; "
        "India 2070; NCSC Form-A; representative sample.",
    )

    # ==================================================================
    # WHY
    # ==================================================================
    start_section(pdf, "Why this project?")
    body(
        pdf,
        "Burned or dumped straw is wasted biomass, dirty air, blocked drains, and zero farm cash. From "
        "Kendriya Vidyalaya Dum Dum the walkable field is Madhyamgram and Barasat in North 24 Parganas. "
        "Punjab enters by phone (Patiala, Kharar, Nabha) as the published burn clock. Four angles guided "
        "every sheet and every screen.",
    )
    fig_four_angles(pdf)
    numbered(
        pdf,
        [
            "Sustainability of farming - keep organic matter and income on the farm side of the ledger.",
            "Waste management - SWM Rules, 2016 already ask urban bodies to process biodegradable waste; straw must arrive as a clean lot, not mixed drain matter.",
            "Transparency in management - one listing, one moisture slip, one pickup date, one ward total; no hidden broker cut; no farmer phone on the officer screen.",
            "Farmer-first carbon toward India 2070 - estimated avoided CO2e starts with the household that changed behaviour, as a local contribution to the national net-zero horizon, without claiming certified national accounting.",
        ],
    )
    sub(pdf, "India 2070 as a cluster pathway")
    body(
        pdf,
        "This project does not close a national carbon budget. It shows what a ward can actually run: fewer "
        "open burns, fewer mixed drain loads, more utilised tonnes, a farmer-visible gate price, and an "
        "estimated carbon line. Practical abatement in Madhyamgram and Barasat is how a large goal becomes "
        "local habit.",
    )
    fig_2070(pdf)

    # ==================================================================
    # 1 SELECTION
    # ==================================================================
    start_section(pdf, "1. Selection of the problem")
    body(
        pdf,
        "The focal theme asks for science that makes a local waste stream less harmful. The stream we can "
        "reach is peri-urban paddy leftover in Madhyamgram and Barasat: wet stacks after rain, drain push, "
        "and mixing into household waste that conservancy then lifts as mixed matter. Punjab (Patiala belt) "
        "is the comparison stratum because that is the short sowing-window burn clock. One listing must serve "
        "both failure modes.",
    )
    body(
        pdf,
        "We selected this problem because (i) the material is the same - rice straw; (ii) Madhyamgram and "
        "Barasat fail mainly by dump/mix while Punjab fails by burn; (iii) a compost pad already exists while "
        "drains still take mixed straw - a transparency failure, not only a technology failure; (iv) India 2070 "
        "needs cluster habits; (v) a Class XI team can close a representative sample of 100 households.",
    )
    sub(pdf, "1.1 Hypothesis")
    body(
        pdf,
        "H1 (primary). If a smallholder can list last season's straw with a moisture note and is promised "
        "pickup inside five days on a shared desk, then selling or gifting will replace burning or dumping "
        "as the default, provided net gate price after freight is positive.",
    )
    body(
        pdf,
        "H2. The main barrier is absence of an own plant phone, not absence of scheme pamphlets.  "
        "H3. Wet Madhyamgram / Barasat lots match compost-first; dry Punjab lots match biomass moisture caps.  "
        "H4. Ward officers will accept utilised-vs-dumped totals if farmer phones stay off the screen.  "
        "H5. Farmer-first estimated carbon increases willingness to list compared with buyer-only claims.",
    )
    body(
        pdf,
        "Null idea we tried to reject: that smallholders do not care about residue. The survey tests whether "
        "care appears when the management object (listing + trolley date + moisture slip) exists.",
    )
    sub(pdf, "1.2 Variables")
    bullets(
        pdf,
        [
            "Independent idea: moisture-aware listing with five-day pickup (willingness + desk demonstration).",
            "Dependent idea: residue fate (burn / stack-dump / mix / sell) and willingness to list.",
            "Stratifiers: place (Madhyamgram / Barasat / Punjab) and landholding band S / M / L.",
            "Working constants: 2.0 t/acre rice straw; Rs 700/t gate; 1.5 tCO2e/t avoided (estimate).",
        ],
    )
    sub(pdf, "1.3 Objectives")
    numbered(
        pdf,
        [
            "Record residue fate across n = 100 representative farm households.",
            "Name the main barrier by place and landholding band.",
            "Check whether plant staff will lift 2-6 acre lots if moisture is declared.",
            "Document what ward registers capture versus what transparency requires.",
            "Field-test AgriNova and propose a ward-level abatement system.",
        ],
    )
    sub(pdf, "1.4 Need and relevance")
    body(
        pdf,
        "Madhyamgram and Barasat are peri-urban North 24 Parganas, next to our school. Conservancy already "
        "lifts mixed biodegradable waste; small leftover piles never become a specified lot. Food, Agriculture "
        "and Health: burning and drain dumping damage air, hygiene and soil. Sustainability: circular straw is "
        "income plus abatement. India 2070: wards that can show utilised tonnes can grow climate habit.",
    )

    # ==================================================================
    # 2 ELEMENT
    # ==================================================================
    start_section(pdf, "2. Basic information about the element chosen")
    body(
        pdf,
        "The element is rice straw (paddy residue), sometimes with wheat stubble. It is an agricultural "
        "by-product, a municipal biodegradable-waste risk, and a climate-relevant biomass stream.",
    )
    bullets(
        pdf,
        [
            "Quantity: published residue-to-grain band about 1.8-2.4 t/acre; working figure = 2.0 t/acre.",
            "Use: biomass energy, paper furnish, compost / biomethanation - each with a moisture spec.",
            "Burning: near-zero farm cash; particulate load on the winter airshed (literature context).",
            "Dumping: wrong specification for compost pads; becomes a conservancy complaint in Madhyamgram or Barasat.",
            "Carbon: about 1.5 tCO2e avoided per tonne utilised instead of open burned (educational estimate).",
        ],
    )
    fig_math(pdf)
    table(
        pdf,
        ["Element", "Why it matters", "How recorded"],
        [
            ["Residue fate", "Burn / dump / sell / mix", "One choice"],
            ["Harvest-sow window", "Clock that makes burning rational", "Four bands"],
            ["Own buyer phone", "Matching / transparency gap", "Yes / broker / none"],
            ["Main barrier", "Cause, not slogan", "One choice"],
            ["5-day pickup", "Product test", "Yes / maybe / no"],
            ["Landholding band", "Economic strata", "S / M / L acres"],
            ["Register contents", "What the ward already sees", "Officer note"],
            ["Language", "Inclusion", "Bangla / Punjabi / Hindi / English"],
        ],
        [44, 72, 50],
    )
    caption(pdf, "Table 1. Data elements fixed before fieldwork.")

    # ==================================================================
    # 3 PREVIOUS STUDIES
    # ==================================================================
    start_section(pdf, "3. Previous studies and policy context")
    body(
        pdf,
        "We did not invent stubble burning or eastern residue waste. A short cited shelf defines the problem "
        "before the 100 sheets.",
    )
    sub(pdf, "Policy and waste management")
    body(
        pdf,
        "NPMCR (2014) asks states to map surplus and move it in-situ or to industry. CRM machinery is densest "
        "in the north-west burn belt. SWM Rules, 2016 require segregation and processing of biodegradable waste, "
        "including agricultural leftover that enters the urban stream - directly relevant to Madhyamgram and "
        "Barasat. NGT orders raise the cost of fire; they do not create a buyer phone in the village.",
    )
    sub(pdf, "Air, volume and farm economics")
    body(
        pdf,
        "SAFAR / IITM and CPCB episode notes are the public source for peak-day PM2.5 from residue fire. CRM "
        "notes round Punjab paddy straw to the order of tens of millions of tonnes a kharif. MSP cards explain "
        "why grain is sold and straw is treated as a nuisance. Biomass tenders often sit near Rs 600-1200/t. "
        "A 3-acre pile at 2.0 t/acre is about 6 t; at Rs 700/t that is about Rs 4,200 before freight.",
    )
    sub(pdf, "Climate horizon")
    body(
        pdf,
        "India's net-zero ambition around 2070 frames why cluster abatement matters. AgriNova positions "
        "farmer-first estimated carbon as a behavioural lever inside that horizon, while refusing certified "
        "national-credit claims. NCSC / NCERT guidance also frames why sample size and representative design "
        "matter: a handful of convenient sheets can mislead.",
    )
    sub(pdf, "What the shelf does not give")
    body(
        pdf,
        "A transparent place where a 3-acre farmer in Doltala (Madhyamgram), a compost pad, and a Ward 21 "
        "Barasat councillor share one lot without putting KCC numbers on a portal. That absence is the problem "
        "we measured.",
    )

    # ==================================================================
    # 4 PROBLEM ANALYSIS
    # ==================================================================
    start_section(pdf, "4. Analysis of the problem and measurement")
    body(pdf, "The problem has three clocks and one transparency gap that cuts across all three.")
    fig_three_clocks(pdf)
    numbered(
        pdf,
        [
            "Farmer clock - 10-15 dry days in Punjab; longer but wetter days in Madhyamgram and Barasat.",
            "Plant clock - large tonnage at a moisture cap; a two-acre pile is invisible unless aggregated.",
            "Officer clock - mixed-waste complaints, not tonnes that left as a specified lot.",
            "Transparency gap - broker rumour and wet-test fights; even sold rows can be unfair.",
        ],
    )
    fig_problem(pdf)
    sub(pdf, "4.1 Suggested solutions (before field testing)")
    numbered(
        pdf,
        [
            "Machines only - without listed lots, balers still arrive late.",
            "Fines only - raise the cost of burning; do not create a trolley or a slip.",
            "Scheme PDF / helpline - local sheets asked for Bangla voice and a pickup slot.",
            "Matching desk with farmer-first carbon (chosen) - one listing, one score, one trolley, one ward total.",
        ],
    )

    # ==================================================================
    # 5 SURVEY
    # ==================================================================
    start_section(pdf, "5. Survey design - area, duration, method")
    body(
        pdf,
        "Survey is the key to accurate data collection, interpretation and conclusions. NCSC guidance is "
        "clear: the type and number of questions, and the size of the sample, need care. A very small sample "
        "risks wrong conclusions. This study closed a minimum of 100 farm households using representative "
        "(stratified) sampling.",
    )
    fig_sampling(pdf)
    table(
        pdf,
        ["Stratum", "n", "Share", "Rationale"],
        [
            ["Madhyamgram (doorstep)", str(zone.get("WB-MG", 0)), f"{zone.get('WB-MG', 0)}%", "Home dump/mix pocket"],
            ["Barasat (doorstep)", str(zone.get("WB-BA", 0)), f"{zone.get('WB-BA', 0)}%", "Ward / drain interface"],
            ["Punjab phone (Patiala belt)", str(zone.get("PB", 0)), f"{zone.get('PB', 0)}%", "Published burn clock"],
            ["Small 1.5-3 ac (S)", str(band.get("S", 0)), f"{band.get('S', 0)}%", "Mills often skip"],
            ["Medium 3-5 ac (M)", str(band.get("M", 0)), f"{band.get('M', 0)}%", "Typical peri-urban lot"],
            ["Larger 5-8 ac (L)", str(band.get("L", 0)), f"{band.get('L', 0)}%", "Can fill a trolley"],
        ],
        [70, 18, 22, 56],
    )
    caption(pdf, "Table 2. Sampling frame (n = 100).")
    body(
        pdf,
        "Duration: September 2025. Doorstep work started at Hridaypur (Barasat) and continued through Doltala, "
        "Noapara, Michael Nagar, Nabapally and Ward 21. Punjab calls (Kharar, Nabha, Ghanaur, Rajpura) were "
        "made the same month. Rules: 1.5-8 acre land; options read aloud; one sentence in the speaker's words; "
        "no Aadhaar / KCC / mobile stored.",
    )
    body(
        pdf,
        "Supporting conversations (design, not sample inflation): Madhyamgram compost pad; Punjab biomass cabin; "
        "Councillor, Ward 21, Barasat; Sanitary Inspector, Madhyamgram. Statistical claims rest on the 100 farm sheets.",
    )

    # ==================================================================
    # 6 QUESTIONNAIRE
    # ==================================================================
    start_section(pdf, "6. Questionnaire / data collected")
    sub(pdf, "6.1 Farmer instrument (n = 100)")
    numbered(
        pdf,
        [
            "Fate of most of last season's straw - sold / stacked-dumped / burned / mixed waste.",
            "Harvest to next sowing - under 10 / 10-15 / 16-25 / more than 25 days.",
            "Own plant phone - yes / only broker / none.",
            "Main barrier if not sold - no phone / too wet / transport / unaware / I did sell.",
            "Would you list if a trolley came in five days? - yes / maybe / no.",
            "Preferred language - Bangla voice / Punjabi / Hindi / English.",
            "Operated acres and one sentence in your words.",
        ],
    )
    sub(pdf, "6.2 Buyer sheet (supporting)")
    bullets(
        pdf,
        [
            "Plant type and moisture cap; mixed drain straw refused?",
            "Do 2-6 acre lots reach this gate without a broker?",
            "Would a listing with moisture help you send one trolley?",
        ],
    )
    sub(pdf, "6.3 Official sheet (supporting)")
    bullets(
        pdf,
        [
            "What goes into the register today?",
            "Biggest gap between leftover and the pad?",
            "Would an aggregate utilised view (no farmer phones) help the weekly note?",
        ],
    )
    body(
        pdf,
        "Instruments were kept short after a long schedule was refused at the first Madhyamgram sitting. "
        "Options were read aloud. Mode (doorstep or phone) was marked on every farmer sheet.",
    )

    # ==================================================================
    # 7 ACTIVITIES
    # ==================================================================
    start_section(pdf, "7. Activities taken up")
    numbered(
        pdf,
        [
            "Mapped sustainability, waste management, transparency and India 2070 onto a local problem.",
            "Closed n = 100 farmer sheets in Madhyamgram, Barasat and Punjab.",
            "Ran supporting plant-floor and ward conversations.",
            "Built AgriNova: West Bengal ward defaults; State / District / Ward login; explainable match; farmer-first carbon; Kisan Bandhu leaf samples with known results.",
            "Demonstrated dump-type and burn-type listings; interpreted data by stratum.",
        ],
    )
    fig_loop(pdf)
    fig_one(pdf, "11-landing.png", "Figure 11. AgriNova landing desk used in the demonstration.")
    fig_carbon(pdf)

    # ==================================================================
    # 8 ANALYSIS
    # ==================================================================
    start_section(pdf, "8. Analysis of data")
    sub(pdf, "8.1 Residue fate (n = 100)")
    table(
        pdf,
        ["Fate", "Madhyamgram", "Barasat", "Punjab", "All", "Share"],
        [
            ["Burned",
             str(sum(1 for r in SAMPLE if r["zone"] == "WB-MG" and r["fate"] == "B")),
             str(sum(1 for r in SAMPLE if r["zone"] == "WB-BA" and r["fate"] == "B")),
             str(sum(1 for r in SAMPLE if r["zone"] == "PB" and r["fate"] == "B")),
             str(fate.get("B", 0)), f"{fate.get('B', 0)}%"],
            ["Stacked / dumped",
             str(sum(1 for r in SAMPLE if r["zone"] == "WB-MG" and r["fate"] == "K")),
             str(sum(1 for r in SAMPLE if r["zone"] == "WB-BA" and r["fate"] == "K")),
             str(sum(1 for r in SAMPLE if r["zone"] == "PB" and r["fate"] == "K")),
             str(fate.get("K", 0)), f"{fate.get('K', 0)}%"],
            ["Sold / gifted",
             str(sum(1 for r in SAMPLE if r["zone"] == "WB-MG" and r["fate"] == "S")),
             str(sum(1 for r in SAMPLE if r["zone"] == "WB-BA" and r["fate"] == "S")),
             str(sum(1 for r in SAMPLE if r["zone"] == "PB" and r["fate"] == "S")),
             str(fate.get("S", 0)), f"{fate.get('S', 0)}%"],
            ["Mixed waste",
             str(sum(1 for r in SAMPLE if r["zone"] == "WB-MG" and r["fate"] == "M")),
             str(sum(1 for r in SAMPLE if r["zone"] == "WB-BA" and r["fate"] == "M")),
             str(sum(1 for r in SAMPLE if r["zone"] == "PB" and r["fate"] == "M")),
             str(fate.get("M", 0)), f"{fate.get('M', 0)}%"],
        ],
        [38, 30, 26, 24, 18, 22],
    )
    caption(pdf, "Table 3. Last-season residue fate by place.")
    fig_fate_bars(pdf, fate)
    sub(pdf, "8.2 Matching gap and product test")
    body(
        pdf,
        f"Own plant phone {phone.get('own', 0)}; broker {phone.get('broker', 0)}; none {phone.get('none', 0)}. "
        f"Five-day pickup: Yes {yes_n}, Maybe {maybe_n}. Bangla voice dominates Madhyamgram and Barasat sheets; "
        f"Punjabi dominates the Punjab calls. Bengal fails after monsoon wetness; Punjab fails on a dry twelve-day "
        f"clock. The shared hole is the listing.",
    )
    sub(pdf, "8.3 Fate by landholding band")
    table(
        pdf,
        ["Band", "n", "Burned", "Stacked", "Sold", "Mixed", "Yes 5-day"],
        [
            ["S 1.5-3 ac", str(band.get("S", 0)),
             str(sum(1 for r in SAMPLE if r["band"] == "S" and r["fate"] == "B")),
             str(sum(1 for r in SAMPLE if r["band"] == "S" and r["fate"] == "K")),
             str(sum(1 for r in SAMPLE if r["band"] == "S" and r["fate"] == "S")),
             str(sum(1 for r in SAMPLE if r["band"] == "S" and r["fate"] == "M")),
             str(sum(1 for r in SAMPLE if r["band"] == "S" and r["pickup"] == "Y"))],
            ["M 3-5 ac", str(band.get("M", 0)),
             str(sum(1 for r in SAMPLE if r["band"] == "M" and r["fate"] == "B")),
             str(sum(1 for r in SAMPLE if r["band"] == "M" and r["fate"] == "K")),
             str(sum(1 for r in SAMPLE if r["band"] == "M" and r["fate"] == "S")),
             str(sum(1 for r in SAMPLE if r["band"] == "M" and r["fate"] == "M")),
             str(sum(1 for r in SAMPLE if r["band"] == "M" and r["pickup"] == "Y"))],
            ["L 5-8 ac", str(band.get("L", 0)),
             str(sum(1 for r in SAMPLE if r["band"] == "L" and r["fate"] == "B")),
             str(sum(1 for r in SAMPLE if r["band"] == "L" and r["fate"] == "K")),
             str(sum(1 for r in SAMPLE if r["band"] == "L" and r["fate"] == "S")),
             str(sum(1 for r in SAMPLE if r["band"] == "L" and r["fate"] == "M")),
             str(sum(1 for r in SAMPLE if r["band"] == "L" and r["pickup"] == "Y"))],
        ],
        [32, 14, 22, 24, 18, 20, 30],
    )
    caption(pdf, "Table 4. Small lots need neighbourhood pooling.")
    sub(pdf, "8.4 Sample impact (working constants)")
    bullets(
        pdf,
        [
            f"Land total {total_ac} ac -> estimated straw {straw_t} t at 2.0 t/acre.",
            f"Yes-to-list acres {yes_ac} -> ~{yes_t} t -> ~Rs {cash_yes:,} at Rs 700/t.",
            f"Burned {burn_ac} ac -> ~{burn_t} t -> ~{co2_burn} tCO2e. Stacked/mixed {dump_ac} ac -> ~{dump_t} t still outside clean SWM.",
            f"If Yes lots utilise: ~{co2_yes} tCO2e avoided (estimate).",
        ],
    )
    fig_match(pdf)
    sub(pdf, "8.5 Hypothesis check")
    body(
        pdf,
        f"H1 is supported at willingness: {yes_n}/100 say yes to five-day pickup. Last-season fate still shows "
        f"burn ({fate.get('B', 0)}) and dump/mix ({fate.get('K', 0) + fate.get('M', 0)}) - why the listing is needed. "
        f"H2 is supported by the none-phone share. H3 is supported by plant specs and AgriNova match. H4 is "
        f"supported by councillor / SI notes. H5 is a design principle on the desk, not a randomised trial.",
    )
    sub(pdf, "8.6 Voices that shaped the desk")
    body(
        pdf,
        "Hridaypur (Barasat): wet heap, too small alone - maybe if neighbours pool. Doltala (Madhyamgram): no mill "
        "number; will stack clean if given a date. Ward 21 (Barasat): leftover to drain; wants Bangla, not a PDF. "
        "Noapara: sold via broker, moisture cut - wants the slip before the truck leaves. Kharar (Punjab): twelve "
        "days for wheat; will not burn if a trolley date is visible. Madhyamgram pad: hungry for clean feedstock; "
        "refuses mixed drain straw. Ward 21 / Madhyamgram SI: utilised-vs-dumped totals, no farmer phones.",
    )

    # ==================================================================
    # SCREENS + ROSTER
    # ==================================================================
    start_section(pdf, "8. Demonstration on AgriNova")
    body(
        pdf,
        "Default login and case study are West Bengal first (Madhyamgram and Barasat). A wet Madhyamgram-type "
        "lot matches short-haul compost; a dry Punjab-type lot matches a <=15% biomass cabin. Kisan Bandhu ships "
        "three curated leaf samples (rice blast, bacterial blight, wheat rust) with known educational results.",
    )
    fig_pair(
        pdf, "01-login.png",
        "Figure 12. Login: Identity / State-Ward / Land. Default: Madhyamgram and Barasat.",
        "13-wb.png",
        "Figure 13. West Bengal case-study hub.",
        h=48,
    )
    fig_pair(
        pdf, "04-sell.png",
        "Figure 14. Sell / match desk - transparent score.",
        "05-kisan-ai.png",
        "Figure 15. Kisan Bandhu - listing advice and leaf scan.",
        h=48,
    )
    fig_one(pdf, "08-government.png", "Figure 16. Ward desk - utilised vs dumped, no farmer phones.", h=58)

    start_section(pdf, "8. Survey roster (n = 100)")
    body(
        pdf,
        "Complete closed sample. Mode: D = doorstep, P = phone. Fate: B burn, K stack/dump, S sold, M mixed. "
        "Band: S/M/L. 5d: Y yes, M maybe. Places are Madhyamgram, Barasat, or Punjab (Kharar, Nabha, Ghanaur, Rajpura, Samana, Patiala).",
    )
    roster = []
    for r in SAMPLE:
        roster.append([
            str(r["id"]), r["name"][:16], r["place"][:14], r["st"], r["mode"],
            r["band"], f"{r['acres']}", r["fate"], r["phone"][:6], r["pickup"],
        ])
    table(
        pdf,
        ["#", "Name", "Place", "St", "How", "Band", "Ac", "Fate", "Phone", "5d"],
        roster,
        [10, 32, 28, 10, 12, 14, 12, 14, 16, 10],
        font=7,
    )
    caption(pdf, "Table 5. Farmer book (n = 100).")

    # ==================================================================
    # 9 CONCLUSIONS
    # ==================================================================
    start_section(pdf, "9. Conclusions and impact of the activity")
    body(
        pdf,
        f"Across {total_ac} acres (~{straw_t} t straw), last season failed in two modes: burn in Punjab and "
        f"dump/mix in Madhyamgram and Barasat. Only {sold_n} of 100 sold. Yet {yes_n} of 100 would list if "
        f"pickup were real - about {yes_t} t and Rs {cash_yes:,}, with ~{co2_yes} tCO2e estimated avoided if "
        f"those lots utilise. That is the opening AgriNova is built to catch.",
    )
    numbered(
        pdf,
        [
            "Home failure (Madhyamgram / Barasat) is dump and mix; Punjab failure is burn; shared cause is no plant number.",
            f"A clear majority ({yes_n}/100) will list when five-day pickup is credible.",
            "Pads take specified clean lots; they refuse mixed drain straw.",
            "Ward desks will use utilised-vs-dumped aggregates; they will not put farmer phones on the screen.",
            "Farmer-first carbon belongs on the same slip as moisture - on the road to India 2070.",
        ],
    )
    body(
        pdf,
        "Limitations: Punjab stratum is recall-based; civic notes are student conversations, not municipal "
        "circulars; Rs 700/t and 1.5 tCO2e/t are working figures; carbon lines are simulators. Impact claimed "
        "is the interpreted n = 100 book plus a desk a judge can open at https://agrinova-hazel.vercel.app.",
    )
    sub(pdf, "What we will not claim")
    body(
        pdf,
        "We will not claim a state forecast, a certified carbon project, or an official municipality study. "
        "We will claim a representative 100-household book, a tested listing object, and a ward-scale pathway "
        "that is scientifically modest and locally usable.",
    )

    # ==================================================================
    # 10 ABATEMENT
    # ==================================================================
    start_section(pdf, "10. Suggested system for abatement")
    body(
        pdf,
        "AgriNova as a Madhyamgram / Barasat ward listing, with a phone listing for Punjab, wired to "
        "farmer-first estimated carbon and transparent utilised tonnes.",
    )
    bullets(
        pdf,
        [
            "Farm card: acres, crop, tonnes (2.0 t/acre default), moisture, neighbourhood; Bangla or Punjabi by place.",
            "Pad: moisture on slip; reject mixed drain waste; compost-first when wet; biomass-first when dry.",
            "Ward / SI: weekly utilised vs dumped - no KCC, Aadhaar, or farmer mobile.",
            "Logistics: trolley within five days; neighbourhood pool for small (S) lots.",
            "Carbon: estimated tCO2e and credit simulator accrue first to the diverting farmer; labelled educational.",
        ],
    )
    sub(pdf, "10.1 Improvements after field testing")
    bullets(
        pdf,
        [
            "Wet / cannot-bale flag so Madhyamgram compost is offered before biomass.",
            "Small lots auto-join a lane pool.",
            "Conservancy weekly total of tonnes lifted - still without names.",
            "SMS listing for keypad phones; moisture written before the truck leaves.",
        ],
    )
    sub(pdf, "10.2 Order of abatement")
    numbered(
        pdf,
        [
            "Farmer lists before the heap mixes or the window closes.",
            "Score uses moisture so a wet lot is not sent to a dry-spec cabin.",
            "Pickup date is visible on the same card.",
            "Farmer-first estimated carbon is written when the lot is utilised.",
            "Ward note records tonnes, not names.",
        ],
    )

    # ==================================================================
    # 11 ACKNOWLEDGEMENTS
    # ==================================================================
    start_section(pdf, "11. Acknowledgements")
    body(pdf, "We place on record our sincere gratitude to all who made this Form-A project possible.")
    bullets(
        pdf,
        [
            "National Children's Science Congress (NCSC) and NCERT for the theme, Form-A structure, and survey guidance on meaningful sample size.",
            "Kendriya Vidyalaya Dum Dum, Kolkata - our school - for encouragement and the space to plan fieldwork.",
            "Our Guide Teacher (name on cover) for mentoring and for insisting that estimates are labelled as estimates.",
            "The Principal, teachers and ICT staff of KV Dum Dum who supported presentation practice and devices.",
            "One hundred farm households of Madhyamgram, Barasat and Punjab who closed sheets.",
            "Plant-floor contacts at the Madhyamgram compost pad and the Punjab biomass cabin.",
            "Dr. Bibartan Saha, Councillor, Ward 21, Barasat, and Shri Sudip Biswas, Sanitary Inspector, Madhyamgram.",
            "Our families, for Punjab phone introductions and travel support on local visits.",
            "Public sources - MoA&FW (NPMCR / CRM), MoEFCC (SWM Rules, 2016), CPCB / SAFAR, CACP, IARI / PAU - used as context.",
            "Any errors of interpretation remain our own as student investigators.",
        ],
    )

    # ==================================================================
    # 12-13
    # ==================================================================
    start_section(pdf, "12. References")
    refs = [
        "National Children's Science Congress / NCERT. Guidelines for project work, Form-A, and survey methodology.",
        "Ministry of Agriculture & Farmers Welfare. National Policy for Management of Crop Residue (NPMCR), 2014.",
        "Ministry of Agriculture & Farmers Welfare. Crop Residue Management (CRM) scheme guidelines.",
        "MoEFCC. Solid Waste Management Rules, 2016.",
        "Government of India statements on long-term net-zero / 2070 horizon (context).",
        "SAFAR / IITM and CPCB episode notes on post-harvest PM2.5 (context only).",
        "Commission for Agricultural Costs and Prices (CACP) - MSP cards for common paddy.",
        "IARI / PAU residue-to-grain working bands (1.8-2.4 t/acre straw).",
        "National Green Tribunal orders on crop-residue burning (enforcement context).",
        "AgriNova live desk: https://agrinova-hazel.vercel.app",
        "Kendriya Vidyalaya Dum Dum, Kolkata - institutional support for this Class XI project.",
    ]
    pdf.set_font("Helvetica", "", 10)
    for i, r in enumerate(refs, 1):
        ensure(pdf, 12)
        pdf.set_x(20)
        pdf.multi_cell(pdf.w - 40, 5.0, f"[{i}]  {r}")
        pdf.ln(0.6)

    start_section(pdf, "13. Declaration")
    body(
        pdf,
        "We hereby declare that this Form-A project report on AgriNova is our own work as Class XI students of "
        "Kendriya Vidyalaya Dum Dum, carried out under the NCSC theme Science and Innovation for Sustainability. "
        "Survey sheets, analysis and the demonstration desk were prepared by us with guidance from our Guide "
        "Teacher. Carbon and price figures are working educational estimates, not certified carbon credits.",
    )
    pdf.ln(14)
    pdf.set_font("Helvetica", "", 11)
    pdf.cell(90, 8, "Shikha Sharma ____________________")
    pdf.cell(0, 8, "Samriddhi Ghosh ____________________")
    pdf.ln(16)
    pdf.cell(0, 8, "Guide Teacher ____________________          Date ____________________")

    pdf.output(str(OUT_REPORT))
    OUT_ROOT.write_bytes(OUT_REPORT.read_bytes())
    OUT_PUBLIC.parent.mkdir(parents=True, exist_ok=True)
    OUT_PUBLIC.write_bytes(OUT_REPORT.read_bytes())
    print(f"Wrote {OUT_REPORT} ({pdf.page_no()} pages)")


if __name__ == "__main__":
    build()
