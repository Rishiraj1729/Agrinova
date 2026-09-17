"""Build AgriNova field survey Excel form with sample responses."""
from pathlib import Path

import xlsxwriter

OUT = Path(__file__).resolve().parents[1] / "AgriNova_Field_Survey.xlsx"

GREEN = "#1F4D3A"
GREEN2 = "#3D6B54"
SAFFRON = "#9A6B32"
INK = "#1D1D1F"
MUTED = "#6E6E73"
LINE = "#E6E4DF"
SURFACE = "#F5F5F7"
WHITE = "#FFFFFF"
BAND = "#EEF3F0"
INPUT = "#FFFDF8"

STATES = ["Punjab", "West Bengal"]
FATE = [
    "Sold / gifted to a plant or neighbour",
    "Stacked and left to rot or dump",
    "Burned on a dry window",
    "Mixed into household / municipal waste",
]
WINDOW = ["Under 10 days", "10-15 days", "16-25 days", "More than 25 days"]
PHONE = ["Yes", "Only through a broker", "No"]
BARRIER = [
    "No buyer phone in the village",
    "Straw too wet to bale",
    "Transport cost eats the gate price",
    "Do not know compost / paper mill exists",
    "I did sell",
]
PICKUP = ["Yes", "Maybe", "No"]
LANG = ["Punjabi", "Hindi", "Bangla", "English", "Voice in my language, not a PDF"]
PLANT = ["Biomass", "Paper", "Compost / SWM", "Cattle feed", "Biogas"]
MOISTURE = ["12% or less", "15% or less", "18% or less", "We take mixed wet waste"]
SMALL = ["Often", "Rarely", "Almost never"]
LISTING = ["Yes", "Only if baled", "No"]
RANK = [
    "Agriculture Development Officer (ADO) / BAO",
    "Assistant Agricultural Officer",
    "Agriculture Sub-Inspector",
    "Sanitary Inspector (ULB / SWM)",
]
TRACK = ["Farmer names and FIRs", "Fires seen / complaints", "Tonnes lifted to a plant", "Almost nothing usable"]
GAP = [
    "No utilised-vs-burned / dumped view",
    "CRM machines exist but no matching desk",
    "Compost plant is hungry; villages dump in drains",
    "Cannot share farmer phones upward",
]
DESK = ["Yes", "If it stays at block level", "No"]

FARMERS = [
    ["F01", "Jaswinder Singh", "Kharar", "Patiala", "Punjab", 6, FATE[2], WINDOW[1], PHONE[1], BARRIER[0], PICKUP[0], LANG[0], "12 days for wheat. Last year I burned. If a trolley comes I will not light it."],
    ["F02", "Harpreet Kaur", "Nabha", "Patiala", "Punjab", 4.5, FATE[2], WINDOW[0], PHONE[2], BARRIER[2], PICKUP[0], LANG[0], "Plant is 18 km. By the time the contractor quotes, sowing has started."],
    ["F03", "Balwinder Singh", "Ghanaur", "Patiala", "Punjab", 8, FATE[0], WINDOW[1], PHONE[0], BARRIER[4], PICKUP[0], LANG[1], "Neighbour's baler, GreenPower paid Rs 740/t. I want the same slot on a phone, not WhatsApp."],
    ["F04", "Gurmeet Singh", "Rajpura rural", "Patiala", "Punjab", 3, FATE[2], WINDOW[1], PHONE[2], BARRIER[0], PICKUP[1], LANG[0], "Two acres is too small for the mill group. They skip us."],
    ["F05", "Manjeet Kaur", "Sunam", "Sangrur", "Punjab", 4, FATE[0], WINDOW[1], PHONE[1], BARRIER[4], PICKUP[0], LANG[0], "Sold stubble once. Credits for urea would make me list again."],
    ["F06", "Jagdeep Singh", "Dhuri", "Sangrur", "Punjab", 7, FATE[2], WINDOW[0], PHONE[1], BARRIER[0], PICKUP[0], LANG[1], "Happy Seeder is booked late. Burning is still the 2-hour option."],
    ["F07", "Kuldeep Singh", "Malerkotla", "Malerkotla", "Punjab", 5, FATE[1], WINDOW[1], PHONE[2], BARRIER[1], PICKUP[1], LANG[0], "Rain after harvest. Stack smelled. Nobody lifted it."],
    ["F08", "Nirmal Singh", "Barnala", "Barnala", "Punjab", 9, FATE[2], WINDOW[1], PHONE[1], BARRIER[2], PICKUP[0], LANG[0], "Broker took Rs 120/t. Net was not worth the wait."],
    ["F09", "Sukhchain Singh", "Tapa", "Barnala", "Punjab", 2.5, FATE[2], WINDOW[0], PHONE[2], BARRIER[0], PICKUP[0], LANG[1], "ADO told us not to burn. He did not give a buyer number."],
    ["F10", "Ravinder Kaur", "Bhawanigarh", "Sangrur", "Punjab", 6, FATE[1], WINDOW[2], PHONE[2], BARRIER[3], PICKUP[0], LANG[0], "I thought only biomass plants take straw. Nobody said compost."],
    ["F11", "Amrik Singh", "Patran", "Patiala", "Punjab", 5.5, FATE[2], WINDOW[1], PHONE[1], BARRIER[0], PICKUP[0], LANG[0], "If match and pickup sit on one screen I will try once this kharif."],
    ["F12", "Ramesh Das", "Memari", "Burdwan", "West Bengal", 3, FATE[1], WINDOW[2], PHONE[2], BARRIER[0], PICKUP[0], LANG[2], "Straw sits by the canal. Nobody from the mill has ever come here."],
    ["F13", "Sukumar Roy", "Kalna", "Burdwan", "West Bengal", 2, FATE[3], WINDOW[3], PHONE[2], BARRIER[3], PICKUP[0], LANG[4], "Pour into the drain after rain. Municipality swears at us, then takes mixed waste."],
    ["F14", "Anil Ghosh", "Chandannagar outgrowth", "Hooghly", "West Bengal", 4, FATE[0], WINDOW[2], PHONE[1], BARRIER[4], PICKUP[0], LANG[2], "Paper mill took one lot. Moisture argument at the gate. Need a card before travel."],
    ["F15", "Tapas Mondal", "Balagarh", "Hooghly", "West Bengal", 1.5, FATE[1], WINDOW[2], PHONE[2], BARRIER[1], PICKUP[1], LANG[2], "Always wet. Brokers laugh at 1.5 acres."],
    ["F16", "Pradip Sen", "Ranaghat", "Nadia", "West Bengal", 5, FATE[2], WINDOW[1], PHONE[2], BARRIER[0], PICKUP[0], LANG[2], "One dry week. We burned the jute-rice leftover. Compost plant is 9 km and we did not know."],
    ["F17", "Kamal Haldar", "Krishnanagar rural", "Nadia", "West Bengal", 3.5, FATE[3], WINDOW[2], PHONE[2], BARRIER[3], PICKUP[0], LANG[4], "SI told us not to dump. He did not tell us where the compost pad is."],
    ["F18", "Debashis Sarkar", "Beldanga", "Murshidabad", "West Bengal", 6, FATE[1], WINDOW[2], PHONE[1], BARRIER[2], PICKUP[0], LANG[2], "Quote from Malda biochar was good. Freight killed it."],
    ["F19", "Biplab Banerjee", "Kandi", "Murshidabad", "West Bengal", 2.5, FATE[2], WINDOW[1], PHONE[2], BARRIER[1], PICKUP[1], LANG[1], "We dry one day then it rains. Burning is the only dry-hour option."],
    ["F20", "Sanjay Mitra", "Guptipara", "Hooghly", "West Bengal", 4, FATE[0], WINDOW[2], PHONE[0], BARRIER[4], PICKUP[0], LANG[2], "Delta Compost took 3 t. If pickup is on a list I can send the rest."],
    ["F21", "Arun Bhattacharya", "Katwa", "Burdwan", "West Bengal", 5, FATE[1], WINDOW[2], PHONE[2], BARRIER[0], PICKUP[0], LANG[4], "Give me Bangla voice, not a scheme PDF. I will list."],
]

BUYERS = [
    ["B01", "Rakesh Kumar", "Shift supervisor", "GreenPower gate", "Rajpura", "Punjab", PLANT[0], MOISTURE[1], SMALL[1], LISTING[1], "We need 500 t this fortnight. Brokers bring 20-acre lots. 2-acre farms never call the cabin."],
    ["B02", "Pooja Rani", "Weighbridge clerk", "Punjab Paper Mills", "Patiala", "Punjab", PLANT[1], MOISTURE[1], SMALL[2], LISTING[0], "If moisture is on the slip before the truck leaves the village we stop arguing at 6 am."],
    ["B03", "Harbhajan Lal", "Plant manager (unit)", "AgroFeed", "Sangrur", "Punjab", PLANT[3], MOISTURE[0], SMALL[1], LISTING[0], "We took Simran's 3.2 t. That should not be a one-off WhatsApp favour."],
    ["B04", "Sk. Rafiq", "Pad operator", "Delta Compost", "Nadia", "West Bengal", PLANT[2], MOISTURE[2], SMALL[2], LISTING[0], "ULB pad is hungry. Villages dump mixed wet straw in the drain 9 km away. We cannot take mixed waste."],
    ["B05", "Mithun Dey", "Purchase assistant", "Bengal Paper Works", "Hooghly", "West Bengal", PLANT[1], MOISTURE[2], SMALL[1], LISTING[1], "We will not be a dump. Spec first, then lift. A listing with moisture would let us send one trolley."],
]

GOVT = [
    ["G01", "Gurpreet Singh", RANK[0], "Block Ghanaur", "Patiala", "Punjab", TRACK[1], GAP[0], DESK[0], "I file fire spots. I cannot tell the DAO how many tonnes left the block to a plant."],
    ["G02", "Mousumi Das", RANK[1], "Burdwan-I Block", "Burdwan", "West Bengal", TRACK[3], GAP[1], DESK[1], "One shared baler, Excel of names. I will not put KCC numbers on a portal. Aggregates only."],
    ["G03", "Ranjit Halder", RANK[3], "Krishnanagar Municipality", "Nadia", "West Bengal", TRACK[0], GAP[2], DESK[0], "SWM Rules ask me to process bio-waste. Farm straw never arrives as a lot. I only see mixed drain waste."],
]

F_END = 54  # Farmers rows 5-54
B_END = 24
G_END = 22


def fmt(wb, **kwargs):
    return wb.add_format(kwargs)


def write_list(ws, col, header, items):
    ws.write(0, col, header)
    for i, v in enumerate(items, 1):
        ws.write(i, col, v)
    return f"=Lists!${xlsxwriter.utility.xl_col_to_name(col)}$2:${xlsxwriter.utility.xl_col_to_name(col)}${1 + len(items)}"


def dropdown(ws, first_row, last_row, col, formula, input_fmt):
    ws.data_validation(first_row, col, last_row, col, {
        "validate": "list",
        "source": formula,
        "input_title": "Choose",
        "error_title": "Pick from list",
        "error_message": "Use the dropdown. Do not type a new option.",
    })
    ws.set_column(col, col, None, input_fmt)


def style_header_row(ws, row, n_cols, header_fmt):
    for c in range(n_cols):
        ws.write(row, c, ws.table.get((row, c), [None]) if False else None)


def main():
    wb = xlsxwriter.Workbook(str(OUT))

    title = fmt(wb, font_name="Calibri", font_size=18, bold=True, font_color=WHITE, bg_color=GREEN, align="left", valign="vcenter")
    sub = fmt(wb, font_name="Calibri", font_size=10, italic=True, font_color="#D7E4DC", bg_color=GREEN, align="left", valign="vcenter")
    section = fmt(wb, font_name="Calibri", font_size=11, bold=True, font_color=WHITE, bg_color=GREEN2, align="left", valign="vcenter")
    h = fmt(wb, font_name="Calibri", font_size=9, bold=True, font_color=WHITE, bg_color=GREEN2, align="left", valign="vcenter", text_wrap=True)
    body = fmt(wb, font_name="Calibri", font_size=10, font_color=INK, bg_color=WHITE, align="left", valign="vcenter", text_wrap=True, border=1, border_color=LINE)
    body_alt = fmt(wb, font_name="Calibri", font_size=10, font_color=INK, bg_color=BAND, align="left", valign="vcenter", text_wrap=True, border=1, border_color=LINE)
    num = fmt(wb, font_name="Calibri", font_size=10, font_color=INK, bg_color=WHITE, align="right", valign="vcenter", num_format="0.0", border=1, border_color=LINE)
    num_alt = fmt(wb, font_name="Calibri", font_size=10, font_color=INK, bg_color=BAND, align="right", valign="vcenter", num_format="0.0", border=1, border_color=LINE)
    blank = fmt(wb, font_name="Calibri", font_size=10, font_color=INK, bg_color=INPUT, align="left", valign="vcenter", text_wrap=True, border=1, border_color=LINE)
    blank_num = fmt(wb, font_name="Calibri", font_size=10, font_color=INK, bg_color=INPUT, align="right", valign="vcenter", num_format="0.0", border=1, border_color=LINE)
    note = fmt(wb, font_name="Calibri", font_size=10, font_color=MUTED, text_wrap=True, valign="top")
    label = fmt(wb, font_name="Calibri", font_size=10, bold=True, font_color=INK)
    muted = fmt(wb, font_name="Calibri", font_size=10, font_color=MUTED, text_wrap=True)
    kpi_lab = fmt(wb, font_name="Calibri", font_size=9, font_color=MUTED, bg_color=SURFACE, align="left", valign="vcenter")
    kpi_val = fmt(wb, font_name="Calibri", font_size=18, bold=True, font_color=GREEN, bg_color=SURFACE, align="left", valign="vcenter")
    kpi_hint = fmt(wb, font_name="Calibri", font_size=9, italic=True, font_color=MUTED, bg_color=SURFACE)
    pct = fmt(wb, font_name="Calibri", font_size=10, font_color=INK, num_format="0%", align="right", valign="vcenter", border=1, border_color=LINE)
    count_fmt = fmt(wb, font_name="Calibri", font_size=10, font_color=INK, num_format="0", align="right", valign="vcenter", border=1, border_color=LINE)
    qn = fmt(wb, font_name="Calibri", font_size=10, bold=True, font_color=SAFFRON, align="center", valign="top")
    qprompt = fmt(wb, font_name="Calibri", font_size=11, bold=True, font_color=INK, text_wrap=True, valign="top")
    qopt = fmt(wb, font_name="Calibri", font_size=10, font_color=INK, text_wrap=True, valign="top")

    cover = wb.add_worksheet("Cover")
    questions = wb.add_worksheet("Questions")
    farmers = wb.add_worksheet("Farmers")
    buyers = wb.add_worksheet("Buyers")
    govt = wb.add_worksheet("Government")
    findings = wb.add_worksheet("Findings")
    lists = wb.add_worksheet("Lists")

    for ws in (cover, questions, farmers, buyers, govt, findings):
        ws.hide_gridlines(2)
        ws.set_default_row(18)
        ws.freeze_panes(4, 0) if ws in (farmers, buyers, govt) else None

    lists.hide()
    lists_refs = {}
    for i, (name, items) in enumerate([
        ("state", STATES),
        ("fate", FATE),
        ("window", WINDOW),
        ("phone", PHONE),
        ("barrier", BARRIER),
        ("pickup", PICKUP),
        ("lang", LANG),
        ("plant", PLANT),
        ("moisture", MOISTURE),
        ("small", SMALL),
        ("listing", LISTING),
        ("rank", RANK),
        ("track", TRACK),
        ("gap", GAP),
        ("desk", DESK),
    ]):
        lists_refs[name] = write_list(lists, i, name, items)

    # ---- Cover ----
    cover.set_row(0, 28)
    cover.set_row(1, 20)
    cover.merge_range("A1:G1", "AgriNova field survey  |  residue, waste and matching", title)
    cover.merge_range("A2:G2", "Kharif 2025 demonstration pack  ·  Punjab and West Bengal  ·  names are fictional  ·  not a census", sub)
    cover.set_column("A:A", 28)
    cover.set_column("B:C", 16)
    cover.set_column("D:G", 22)

    cover.merge_range("A4:C4", "Who this form is for", section)
    cover.write("A5", "Farmers", label)
    cover.write("B5", 21, kpi_val)
    cover.write("C5", "11 Punjab + 10 West Bengal (2-9 acres)", muted)
    cover.write("A6", "Buyers / plant staff", label)
    cover.write("B6", 5, kpi_val)
    cover.write("C6", "Supervisor, clerk, pad operator, purchase assistant — not MDs", muted)
    cover.write("A7", "Government (field posts)", label)
    cover.write("B7", 3, kpi_val)
    cover.write("C7", "ADO, AAO, SI Grade II — not secretary / director", muted)

    cover.merge_range("A9:G9", "How to use", section)
    steps = [
        "1. Print or open Questions if you are interviewing in the field. Ask only the block for that role.",
        "2. Enter new people on Farmers, Buyers or Government. Yellow cells are blank form rows. Dropdowns are locked to the instrument.",
        "3. Do not add secretariat / director / MD ranks. Government sample is block and ULB grade only.",
        "4. Findings updates automatically from filled name cells. Extra rows stay in this file; they are not a statewide estimate.",
        "5. Sample rows F01-F21, B01-B05, G01-G03 are the pack the case studies rest on. Keep them; add new IDs from F22 / B06 / G04.",
    ]
    for i, line in enumerate(steps):
        cover.merge_range(9 + i, 0, 9 + i, 6, line, note)
        cover.set_row(9 + i, 22)

    cover.merge_range("A16:G16", "Why the questions look like this", section)
    cover.merge_range("A17:G19",
                      "Farmers: last-season fate, harvest window, whether they hold a plant phone, why they did not sell, and whether a 5-day pickup would make them list. "
                      "Buyers: moisture they will actually lift, and whether 2-6 acre lots ever reach the gate without a broker. "
                      "Officials: what sits in the register today, the block gap, and whether an aggregate desk without farmer phones would help the weekly note. "
                      "This is a method sample for AgriNova findings (matching desk, SWM gap in Bengal, burn window in Punjab). It is not a government census.",
                      note)
    cover.set_row(17, 36)
    cover.set_row(18, 36)

    cover.merge_range("A21:C21", "Officials in the sample (low rank, real posts)", section)
    cover.write_row("A22", ["ID", "Name", "Post", "Office", "District", "State"], h)
    for i, g in enumerate(GOVT):
        cover.write_row(22 + i, 0, [g[0], g[1], g[2], g[3], g[4], g[5]], body if i % 2 == 0 else body_alt)
    cover.set_column("C:C", 42)

    cover.merge_range("A27:G27", "Sheets in this workbook", section)
    cover.write("A28", "Questions — the instrument (farmer / buyer / government).", muted)
    cover.write("A29", "Farmers / Buyers / Government — sample answers plus blank yellow rows to add more.", muted)
    cover.write("A30", "Findings — counts and charts driven by formulas on the three response sheets.", muted)

    cover.set_row(0, 32)
    cover.freeze_panes(0, 0)

    # ---- Questions ----
    questions.set_row(0, 32)
    questions.merge_range("A1:D1", "Survey instrument  ·  one interview = one row on the matching sheet", title)
    questions.merge_range("A2:D2", "Read the prompt. Circle one option. Write the sentence last. First name is enough.", sub)
    questions.set_column("A:A", 8)
    questions.set_column("B:B", 22)
    questions.set_column("C:C", 52)
    questions.set_column("D:D", 62)

    q_rows = [
        ("All", "State", "Punjab  |  West Bengal", "Fill Farmers, Buyers or Government — not this sheet."),
        ("All", "District / block", "Free text (Patiala, Sangrur, Burdwan, Hooghly, Nadia, Murshidabad…)", ""),
        ("All", "Village / plant / office", "Free text", ""),
        ("All", "Name", "First name is enough. Do not collect KCC / Aadhaar / phone.", ""),
        ("Farmer", "Operated land (acres)", "Number", "Typical pack: 1.5 to 9 acres."),
        ("Farmer", "What happened to most of last season's residue?", " · ".join(FATE), "Supports burn vs dump vs sell finding."),
        ("Farmer", "Days between harvest and next sowing", " · ".join(WINDOW), "Punjab window is tighter."),
        ("Farmer", "Do you have a plant / buyer phone you can call yourself?", " · ".join(PHONE), "Matching-desk gap."),
        ("Farmer", "If you did not sell, the main reason was", " · ".join(BARRIER), "Pick 'I did sell' if they sold."),
        ("Farmer", "Would you list on a phone desk if pickup is guaranteed in 5 days?", " · ".join(PICKUP), "Product test."),
        ("Farmer", "Preferred advice language", " · ".join(LANG), "KisanSathi voice / Bangla."),
        ("Farmer", "One sentence in your words", "Free text", ""),
        ("Buyer", "Your post", "Shift supervisor / weighbridge clerk / pad operator / purchase assistant / unit manager", "Plant floor, not MD."),
        ("Buyer", "Plant type", " · ".join(PLANT), ""),
        ("Buyer", "Moisture you will actually lift", " · ".join(MOISTURE), "Rejects mixed wet waste as a dump."),
        ("Buyer", "Do 2-6 acre farms reach your gate without a broker?", " · ".join(SMALL), "Smallholder access."),
        ("Buyer", "Would a moisture-tagged listing + pickup slot help you take small lots?", " · ".join(LISTING), ""),
        ("Buyer", "One sentence from the plant floor", "Free text", ""),
        ("Government", "Your post (field / block / ULB only)", " · ".join(RANK), "Stop if respondent is secretary, director, or DC."),
        ("Government", "What do you currently put in the register?", " · ".join(TRACK), "No utilised-vs-dumped view."),
        ("Government", "Biggest gap in your block", " · ".join(GAP), ""),
        ("Government", "Would an aggregate desk (no farmer PII) help your weekly note?", " · ".join(DESK), "Privacy constraint."),
        ("Government", "One sentence from the block office", "Free text", ""),
    ]
    questions.write_row("A4", ["#", "Role", "Question", "Options / note"], h)
    for i, (role, prompt, opts, why) in enumerate(q_rows, start=5):
        f = body if i % 2 else body_alt
        questions.write(i - 1, 0, i - 4, qn)
        questions.write(i - 1, 1, role, f)
        questions.write(i - 1, 2, prompt, qprompt)
        questions.write(i - 1, 3, (opts + ("  —  " + why if why else "")), qopt)
        questions.set_row(i - 1, 36 if len(opts) > 40 else 24)
    questions.freeze_panes(4, 0)

    # ---- Farmers ----
    f_headers = [
        "ID", "Name", "Village", "District", "State", "Acres",
        "Last season residue fate", "Harvest-to-sow window", "Own buyer phone?",
        "Why not sold", "List if 5-day pickup?", "Advice language", "One sentence",
    ]
    farmers.set_row(0, 32)
    farmers.merge_range("A1:M1", "Farmers  ·  21 sample interviews  ·  add new rows in yellow", title)
    farmers.merge_range("A2:M2", "Sample F01-F11 Punjab, F12-F21 West Bengal. New IDs from F22. Fill yellow rows. Dropdowns only.", sub)
    farmers.write_row("A4", f_headers, h)
    farmers.set_row(3, 32)
    farmers.freeze_panes(4, 1)
    widths = [8, 18, 22, 14, 14, 10, 38, 18, 22, 38, 22, 32, 42]
    for i, w in enumerate(widths):
        farmers.set_column(i, i, w)

    for i, row in enumerate(FARMERS):
        r = 4 + i
        zebra = body if i % 2 == 0 else body_alt
        zn = num if i % 2 == 0 else num_alt
        farmers.write(r, 0, row[0], zebra)
        farmers.write(r, 1, row[1], zebra)
        farmers.write(r, 2, row[2], zebra)
        farmers.write(r, 3, row[3], zebra)
        farmers.write(r, 4, row[4], zebra)
        farmers.write_number(r, 5, row[5], zn)
        for c, val in enumerate(row[6:], start=6):
            farmers.write(r, c, val, zebra)
        farmers.set_row(r, 32)

    for r in range(25, F_END + 1):
        for c in range(13):
            farmers.write(r, c, None, blank_num if c == 5 else blank)
        farmers.set_row(r, 22)

    farmers.data_validation(4, 4, F_END - 1, 4, {"validate": "list", "source": lists_refs["state"]})
    farmers.data_validation(4, 6, F_END - 1, 6, {"validate": "list", "source": lists_refs["fate"]})
    farmers.data_validation(4, 7, F_END - 1, 7, {"validate": "list", "source": lists_refs["window"]})
    farmers.data_validation(4, 8, F_END - 1, 8, {"validate": "list", "source": lists_refs["phone"]})
    farmers.data_validation(4, 9, F_END - 1, 9, {"validate": "list", "source": lists_refs["barrier"]})
    farmers.data_validation(4, 10, F_END - 1, 10, {"validate": "list", "source": lists_refs["pickup"]})
    farmers.data_validation(4, 11, F_END - 1, 11, {"validate": "list", "source": lists_refs["lang"]})
    farmers.autofilter(3, 0, F_END - 1, 12)

    # ---- Buyers ----
    b_headers = [
        "ID", "Name", "Post (plant floor)", "Plant / gate", "District", "State",
        "Plant type", "Moisture you will lift", "2-6 acre farms reach gate without broker?",
        "Moisture listing + pickup help?", "One sentence from the floor",
    ]
    buyers.set_row(0, 32)
    buyers.merge_range("A1:K1", "Buyers  ·  plant-floor staff  ·  not MDs", title)
    buyers.merge_range("A2:K2", "Sample B01-B05. New IDs from B06. Yellow rows are blank form.", sub)
    buyers.write_row("A4", b_headers, h)
    buyers.set_row(3, 32)
    buyers.freeze_panes(4, 1)
    for i, w in enumerate([8, 16, 24, 22, 14, 14, 16, 20, 38, 30, 42]):
        buyers.set_column(i, i, w)
    for i, row in enumerate(BUYERS):
        r = 4 + i
        zebra = body if i % 2 == 0 else body_alt
        for c, val in enumerate(row):
            buyers.write(r, c, val, zebra)
        buyers.set_row(r, 36)
    for r in range(9, B_END + 1):
        for c in range(11):
            buyers.write(r, c, None, blank)
        buyers.set_row(r, 22)
    buyers.data_validation(4, 5, B_END - 1, 5, {"validate": "list", "source": lists_refs["state"]})
    buyers.data_validation(4, 6, B_END - 1, 6, {"validate": "list", "source": lists_refs["plant"]})
    buyers.data_validation(4, 7, B_END - 1, 7, {"validate": "list", "source": lists_refs["moisture"]})
    buyers.data_validation(4, 8, B_END - 1, 8, {"validate": "list", "source": lists_refs["small"]})
    buyers.data_validation(4, 9, B_END - 1, 9, {"validate": "list", "source": lists_refs["listing"]})
    buyers.autofilter(3, 0, B_END - 1, 10)

    # ---- Government ----
    g_headers = [
        "ID", "Name", "Post (block / ULB only)", "Office", "District", "State",
        "What is in the register today", "Biggest gap in the block",
        "Aggregate desk (no farmer PII) help weekly note?", "One sentence from the office",
    ]
    govt.set_row(0, 32)
    govt.merge_range("A1:J1", "Government  ·  ADO / AAO / SI Grade II  ·  no secretariat", title)
    govt.merge_range("A2:J2", "Do not interview DC, director, or secretary. Sample G01-G03. New IDs from G04.", sub)
    govt.write_row("A4", g_headers, h)
    govt.set_row(3, 32)
    govt.freeze_panes(4, 1)
    for i, w in enumerate([8, 16, 42, 26, 14, 14, 28, 42, 38, 42]):
        govt.set_column(i, i, w)
    for i, row in enumerate(GOVT):
        r = 4 + i
        zebra = body if i % 2 == 0 else body_alt
        for c, val in enumerate(row):
            govt.write(r, c, val, zebra)
        govt.set_row(r, 40)
    for r in range(7, G_END + 1):
        for c in range(10):
            govt.write(r, c, None, blank)
        govt.set_row(r, 22)
    govt.data_validation(4, 2, G_END - 1, 2, {"validate": "list", "source": lists_refs["rank"]})
    govt.data_validation(4, 5, G_END - 1, 5, {"validate": "list", "source": lists_refs["state"]})
    govt.data_validation(4, 6, G_END - 1, 6, {"validate": "list", "source": lists_refs["track"]})
    govt.data_validation(4, 7, G_END - 1, 7, {"validate": "list", "source": lists_refs["gap"]})
    govt.data_validation(4, 8, G_END - 1, 8, {"validate": "list", "source": lists_refs["desk"]})
    govt.autofilter(3, 0, G_END - 1, 9)

    # ---- Findings (formulas) ----
    findings.set_row(0, 32)
    findings.merge_range("A1:L1", "Findings  ·  live counts from the three response sheets", title)
    findings.merge_range("A2:L2", "Formulas count every filled name. Sample pack + any yellow-row additions. Method sample, not a census.", sub)
    findings.set_column("A:A", 44)
    findings.set_column("B:C", 12)
    findings.set_column("D:D", 16)
    findings.set_column("E:L", 14)

    findings.merge_range("A4:B4", "Farmers filled", kpi_lab)
    findings.merge_range("A5:B5", '=COUNTA(Farmers!B5:B54)', kpi_val)
    findings.merge_range("A6:B6", "name cells on Farmers", kpi_hint)

    findings.merge_range("C4:D4", "Punjab farmers", kpi_lab)
    findings.merge_range("C5:D5", '=COUNTIFS(Farmers!B5:B54,"<>",Farmers!E5:E54,"Punjab")', kpi_val)
    findings.merge_range("C6:D6", "state = Punjab", kpi_hint)

    findings.merge_range("E4:F4", "West Bengal farmers", kpi_lab)
    findings.merge_range("E5:F5", '=COUNTIFS(Farmers!B5:B54,"<>",Farmers!E5:E54,"West Bengal")', kpi_val)
    findings.merge_range("E6:F6", "state = West Bengal", kpi_hint)

    kpi_pct = fmt(wb, font_name="Calibri", font_size=18, bold=True, font_color=GREEN, bg_color=SURFACE, align="left", valign="vcenter", num_format="0%")
    findings.merge_range("G4:H4", "Would list (Yes)", kpi_lab)
    findings.merge_range("G5:H5", '=IF(COUNTA(Farmers!K5:K54)=0,"",COUNTIF(Farmers!K5:K54,"Yes")/COUNTA(Farmers!K5:K54))', kpi_pct)
    findings.merge_range("G6:H6", "of those who answered pickup", kpi_hint)

    findings.merge_range("I4:J4", "Buyers filled", kpi_lab)
    findings.merge_range("I5:J5", '=COUNTA(Buyers!B5:B24)', kpi_val)
    findings.merge_range("I6:J6", "plant-floor staff", kpi_hint)

    findings.merge_range("K4:L4", "Officials filled", kpi_lab)
    findings.merge_range("K5:L5", '=COUNTA(Government!B5:B22)', kpi_val)
    findings.merge_range("K6:L6", "ADO / AAO / SI only", kpi_hint)

    findings.merge_range("A8:C8", "Last season residue fate (farmers)", section)
    findings.write_row("A9", ["Answer", "Count", "Share"], h)
    for i, opt in enumerate(FATE):
        r = 9 + i
        findings.write(r, 0, opt, body if i % 2 == 0 else body_alt)
        findings.write_formula(r, 1, f'=COUNTIF(Farmers!$G$5:$G$54,A{r+1})', count_fmt)
        findings.write_formula(r, 2, f'=IF($B$5=0,"",B{r+1}/$B$5)', pct)

    findings.merge_range("A15:C15", "Why they did not sell", section)
    findings.write_row("A16", ["Answer", "Count", "Share"], h)
    for i, opt in enumerate(BARRIER):
        r = 16 + i
        findings.write(r, 0, opt, body if i % 2 == 0 else body_alt)
        findings.write_formula(r, 1, f'=COUNTIF(Farmers!$J$5:$J$54,A{r+1})', count_fmt)
        findings.write_formula(r, 2, f'=IF($B$5=0,"",B{r+1}/$B$5)', pct)

    findings.merge_range("A23:C23", "Own buyer phone?", section)
    findings.write_row("A24", ["Answer", "Count", "Share"], h)
    for i, opt in enumerate(PHONE):
        r = 24 + i
        findings.write(r, 0, opt, body if i % 2 == 0 else body_alt)
        findings.write_formula(r, 1, f'=COUNTIF(Farmers!$I$5:$I$54,A{r+1})', count_fmt)
        findings.write_formula(r, 2, f'=IF($B$5=0,"",B{r+1}/$B$5)', pct)

    findings.merge_range("E8:G8", "Fate by state (count)", section)
    findings.write_row("E9", ["Fate", "Punjab", "West Bengal"], h)
    for i, opt in enumerate(FATE):
        r = 9 + i
        findings.write(r, 4, opt, body if i % 2 == 0 else body_alt)
        findings.write_formula(r, 5, f'=COUNTIFS(Farmers!$G$5:$G$54,E{r+1},Farmers!$E$5:$E$54,"Punjab")', count_fmt)
        findings.write_formula(r, 6, f'=COUNTIFS(Farmers!$G$5:$G$54,E{r+1},Farmers!$E$5:$E$54,"West Bengal")', count_fmt)

    findings.merge_range("E15:G15", "Buyers — smallholders at the gate", section)
    findings.write_row("E16", ["Answer", "Count", "Share"], h)
    for i, opt in enumerate(SMALL):
        r = 16 + i
        findings.write(r, 4, opt, body if i % 2 == 0 else body_alt)
        findings.write_formula(r, 5, f'=COUNTIF(Buyers!$I$5:$I$24,E{r+1})', count_fmt)
        findings.write_formula(r, 6, f'=IF($I$5=0,"",F{r+1}/$I$5)', pct)

    findings.merge_range("E21:G21", "Officials — biggest gap", section)
    findings.write_row("E22", ["Answer", "Count", "Share"], h)
    for i, opt in enumerate(GAP):
        r = 22 + i
        findings.write(r, 4, opt, body if i % 2 == 0 else body_alt)
        findings.write_formula(r, 5, f'=COUNTIF(Government!$H$5:$H$22,E{r+1})', count_fmt)
        findings.write_formula(r, 6, f'=IF($K$5=0,"",F{r+1}/$K$5)', pct)

    findings.merge_range("A29:G30",
                         "Read: Punjab burns more; Bengal dumps or mixes more. Most farmers have no plant phone they can call themselves. "
                         "Plant staff say 2-6 acre lots almost never reach the gate without a broker. The three officials are field grade — they log fires or FIRs, not tonnes utilised.",
                         note)

    chart = wb.add_chart({"type": "bar"})
    chart.add_series({
        "name": "Farmers",
        "categories": ["Findings", 9, 0, 12, 0],
        "values": ["Findings", 9, 1, 12, 1],
        "fill": {"color": GREEN},
        "gap": 80,
    })
    chart.set_title({"name": "Residue fate (count)"})
    chart.set_legend({"none": True})
    chart.set_style(10)
    chart.set_size({"width": 480, "height": 220})
    chart.set_y_axis({"reverse": True})
    findings.insert_chart("I8", chart)

    chart2 = wb.add_chart({"type": "column"})
    chart2.add_series({
        "name": "Punjab",
        "categories": ["Findings", 9, 4, 12, 4],
        "values": ["Findings", 9, 5, 12, 5],
        "fill": {"color": SAFFRON},
    })
    chart2.add_series({
        "name": "West Bengal",
        "categories": ["Findings", 9, 4, 12, 4],
        "values": ["Findings", 9, 6, 12, 6],
        "fill": {"color": GREEN2},
    })
    chart2.set_title({"name": "Fate by state"})
    chart2.set_legend({"position": "bottom"})
    chart2.set_size({"width": 480, "height": 220})
    findings.insert_chart("I20", chart2)

    findings.freeze_panes(3, 0)

    wb.close()
    print(OUT)


if __name__ == "__main__":
    main()
