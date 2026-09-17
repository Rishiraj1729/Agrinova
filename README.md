# AgriNova

**Predict. Protect. Prosper. Recycle.**

Class XI NCSC research prototype — **Science and Innovation for Sustainability**  
(Waste management · Food, agriculture & health)

| | |
|---|---|
| **Group members** | Shikha Sharma · Samriddhi Ghosh |
| **School** | Kendriya Vidyalaya Dum Dum, Kolkata |
| **Live demo** | [agrinova-hazel.vercel.app](https://agrinova-hazel.vercel.app) |
| **GitHub** | [github.com/Rishiraj1729/Agrinova](https://github.com/Rishiraj1729/Agrinova) |

> Production URL: **agrinova-hazel.vercel.app** (free Vercel Hobby).

---

## Aim

After paddy harvest, rice straw still leaves the farm as:

- **Smoke** in Punjab (short sowing window → burn), or  
- **Mixed drain / municipal waste** in peri-urban West Bengal (wet leftover → dump / mix),

even though biomass plants, paper mills and compost pads already buy the same material.

**The missing step** is a shared **listing** — quantity, moisture, neighbourhood — that a small farm and a nearby gate can both see, with a real **five-day pickup**.

**AgriNova’s aim:** build and field-test that **matching / listing desk** so straw becomes income and utilised tonnes — not smoke, not drain waste — without putting farmer phones on a municipal officer screen.

**One-line thesis:** The gap is not another scheme pamphlet. It is a listing with moisture, buyer, and pickup time.

This project is a **research prototype + field book**, not a live municipal product, not a certified carbon registry, and not a statewide forecast.

---

## How it works

### The problem (two clocks, one material)

```text
Harvest → short/wet window → no plant phone / no small-lot lift
                ↓                         ↓
         Punjab: burn              Bengal: dump / mix
                ↓                         ↓
         Farmer cash = 0           Register = complaints, not tonnes
```

### The AgriNova loop (what the app demonstrates)

```text
1. Farmer lists lot     → acres, crop, tonnes (~2 t/acre rice default), moisture, place
2. Match score          → distance, demand, pathway, price, moisture (wet can zero a dry-gate match)
3. Pickup slot          → five-day trolley (simulated in the demo)
4. Credits / impact     → farmer credit + buyer CSR-style line (simulator)
5. Ward / ULB desk      → utilised vs dumped aggregates — no farmer phone on the officer screen
```

**Judge demo path (about 5 minutes):**

1. Open the live site → **Login** as a demo farmer (or custom login).  
2. Go to **Sell residue** (`/farmer/sell`) → list a lot with moisture.  
3. See **match cards** → accept / advance the transaction.  
4. Check **Credits** and **Impact**.  
5. Optional: login as **government** → see cluster aggregates (not personal numbers).  
6. Optional: **Case studies** (Punjab / West Bengal) — labelled **demonstration** data.  

### How matching thinks

The match score (see `src/services/scoreMatch.ts`) weights things a plant gate actually cares about: distance, demand, moisture fit, pathway, price, rating. A wet Madhyamgram heap should prefer a compost pad; a dry Punjab lot should prefer a ≤15% biomass cabin — not the other way around.

### How data is stored (important)

- Session, marketplace, wallets = **browser `localStorage`**.  
- No real backend, SMS, WhatsApp, UPI, or municipal API.  
- Clear the browser → demo state resets (admin can also reset demo data).  
- Weather, mandi, PM2.5 map = **demo / context models**, not live IMD/CPCB feeds.  
- Carbon ≈ **1.5 tCO₂e per tonne straw** (IPCC-style order-of-magnitude), not Verra credits.

### Optional AI (KisanSathi / Policy)

If `VITE_OPENAI_API_KEY` is set in `.env.local` (and on Vercel for the live site), chat uses OpenAI.  
If not, the app returns short **Demo mode** fallback answers so the booth still works.

---

## What we built

### 1. Web app (React 19 + TypeScript + Vite + Tailwind)

| Area | What you get |
|------|----------------|
| Landing + login | Public landing; demo profiles (farmer / buyer / government / admin) |
| Farmer portal | Dashboard, sell wizard, listings, pathways, demand, logistics, credits, impact, farm map, learn, KisanSathi |
| Business portal | Buyer / plant procurement-style dashboard |
| Government portal | Aggregates, ecological tracking, pollution-context map (demo) |
| Case studies | Punjab & West Bengal hubs (**demonstration** clusters) |
| Judge tools | Analytics, Science, Presentation mode, Guide, QA checklist |
| Provenance badges | Labels for DEMO / PUBLIC_DATA / MODEL_ESTIMATE |

### 2. Field survey + NCSC report

| Deliverable | Location |
|-------------|----------|
| NCSC LaTeX report | `report/Agrinova_NCSC_Report.tex` |
| Compiled PDF | `AgriNova_NCSC_Report.pdf` |
| Field survey Excel | `AgriNova_Field_Survey.xlsx` |
| Presentation PDF | `AgriNova_Presentation.pdf` |

**Authoritative field book (report — September 2025):**

- **6 farmers** doorstep / nearby in **Madhyamgram & Barasat** (start: **Hridaypur** — Tapas Mondal).  
- **4 farmers** in Punjab **by phone** (family contacts: Kharar, Nabha, Ghanaur, Rajpura rural).  
- **2 buyers** (phone): Madhyamgram conservancy pad; Rajpura biomass cabin.  
- **2 civic officers** (student conversations, not ULB circulars):  
  - Dr. Bibartan Saha — Councillor, Ward 21, Barasat Municipality  
  - Sudip Biswas — Sanitary Inspector, Madhyamgram Municipality  

**Impact on this book:** ~40.5 acres → ~81 t straw; 27 t burned (3 Punjab sheets); **8/10 would list** → ~72 t / ~₹50,000 at ₹700/t working gate.

> Large farmer/buyer numbers on the **website case studies** are labelled **demonstration examples**. The **survey claim** for NCSC is the **n=10** book above.

### 3. Suggested abatement system (proposal)

1. **Farm** — listing card (Bangla voice locally / Punjabi on phone sheets).  
2. **Pad** — moisture on the slip; refuse mixed drain waste.  
3. **Ward / SI** — weekly utilised vs dumped; no KCC / Aadhaar / farmer mobile.  
4. **Logistics** — one trolley in five days; neighbourhood pool for 1.5–3 acre lots.

---

## Run locally

```bash
npm install
npm run dev
```

Open **http://localhost:5173/**

### Optional OpenAI

```bash
# copy .env.example → .env.local
VITE_OPENAI_API_KEY=sk-your-key-here
```

Restart the dev server after editing `.env.local`.

### Deploy

```bash
npm run build
npx vercel --prod
```

---

## Key routes

| Route | Description |
|-------|-------------|
| `/` | Landing |
| `/login` | Demo / custom login |
| `/farmer` | Farmer dashboard |
| `/farmer/sell` | Residue sell wizard (main loop) |
| `/farmer/kisansathi` | Farmer AI chat |
| `/farmer/listings` | Seller listings |
| `/farmer/credits` | Credits / redemption simulator |
| `/farmer/impact` | Impact view |
| `/business` | Buyer / business portal |
| `/government` | Government / ecological desk |
| `/admin` | Admin / demo reset |
| `/case-studies` | Punjab & West Bengal demos |
| `/analytics` | Charts & impact analytics |
| `/science` | Science & methodology |
| `/presentation` | Judge presentation mode |
| `/guide` | How to use the demo |
| `/qa/checklist` | QA checklist |

---

## Project structure (high level)

```text
Agrinova/
├── src/
│   ├── pages/           # Landing, farmer, business, government, case studies…
│   ├── components/      # UI, chat, maps, marketplace cards
│   ├── contexts/        # Auth, marketplace, case study, language
│   ├── services/        # Match score, carbon, OpenAI, pathways…
│   ├── data/            # Demo profiles, case studies, analytics seeds
│   └── i18n/            # Translations
├── report/              # NCSC LaTeX + PDF
├── scripts/             # Excel survey builder, etc.
├── AgriNova_Field_Survey.xlsx
├── AgriNova_NCSC_Report.pdf
├── AgriNova_Presentation.pdf
├── PROJECT_SUMMARY.md   # Extra team notes (good/bad/gaps)
└── README.md            # This file
```

---

## Honest limits (what does *not* work as production)

| Topic | Reality |
|-------|---------|
| Backend | None — `localStorage` only |
| Pickup / SMS / WhatsApp / payments | Simulated |
| Live weather / mandi / CPCB | Demo / context data |
| Carbon credits | Estimates + UI simulator |
| ULB integration | Not connected to municipal systems |
| Live AI without API key | Fallback demo replies |
| Web `/survey` page | Code exists; **not routed** — use Excel + report |
| App case-study size | Larger **demo** packs ≠ report **n=10** |

---

## Stack

- **Frontend:** React 19, TypeScript, Vite 8, Tailwind 4, React Router  
- **Charts / maps:** Recharts, Leaflet  
- **AI (optional):** OpenAI via `src/services/openaiChat.ts`  
- **Hosting:** Vercel  

---

## For judges (30 seconds)

We are Class XI students at KV Dum Dum. We asked why rice straw still becomes smoke in Punjab and mixed drain waste near our school in Madhyamgram and Barasat, when plants already buy straw. In September we closed ten farmer sheets nearby and by phone, spoke to a pad and two local officers, and built AgriNova — a listing desk with moisture and a five-day pickup. Eight of ten would list. The website is a **demonstration** of that desk; larger website numbers are labelled demo data. The survey impact we claim is about **72 tonnes** that would move on this book if pickup is real.

---

## License / credit

NCSC school research prototype.  
**Shikha Sharma · Samriddhi Ghosh** — Kendriya Vidyalaya Dum Dum, Kolkata.
