# AgriNova — Project Summary

**Last updated:** September 2026  
**Purpose of this file:** One place that records what AgriNova is, what we intended, what we built, what works, what does not, and what still needs care for NCSC.

---

## 1. What AgriNova is

**AgriNova** is a Class XI NCSC research prototype under the theme **Science and Innovation for Sustainability** (waste management / food, agriculture & health).

| | |
|---|---|
| **Tagline** | Predict. Protect. Prosper. Recycle. |
| **Group members** | Shikha Sharma · Samriddhi Ghosh |
| **School** | Kendriya Vidyalaya Dum Dum, Kolkata |
| **Class** | XI (upper age group) |
| **Live demo** | https://agrinova-ochre.vercel.app |
| **GitHub** | https://github.com/Rishiraj1729/Agrinova |
| **Core idea** | After paddy harvest, straw still becomes **smoke (Punjab)** or **mixed drain waste (West Bengal)** even though plants buy the same material. The missing step is a **listing** (quantity, moisture, neighbourhood) that a small farm and a nearby gate can both see. AgriNova is that matching / listing desk. |

**One-line thesis:** The gap is not another scheme pamphlet — it is a shared listing with moisture, buyer, and a five-day pickup.

---

## 2. What we intended (original ambition)

The project started as a polished booth-ready web demo that would:

1. Help farmers **predict** weather / crop risks and make better decisions.
2. Help them **sell crop residue** to biomass, compost, paper, and similar buyers.
3. **Match** lots by distance, demand, and moisture (not WhatsApp rumours).
4. Show **carbon / ecological impact** (avoided CO₂e, credits).
5. Give **government / ULB** a ward-level view of tonnes utilised vs dumped — **without farmer phones** on the officer screen.
6. Support **multilingual / voice-friendly** use (Bangla locally, Punjabi on phone sheets).
7. Back the software with a **real field survey** and an **NCSC Form-A style report**.

**Important framing for judges:** AgriNova is a **research prototype + field book**, not a live municipal product, not a certified carbon registry, and not a statewide forecast.

---

## 3. What we have done (delivered)

### 3.1 Web application (React + TypeScript + Vite + Tailwind)

Live at **agrinova-ochre.vercel.app**. Main pieces:

| Area | What exists |
|------|-------------|
| **Landing + login** | Public landing; demo profiles (farmer / buyer / government / admin) and custom login |
| **Farmer portal** | Dashboard, sell wizard, listings, pathways, demand, logistics, credits, impact, farm map, learn, KisanSathi AI chat |
| **Business portal** | Buyer / plant-side dashboard and procurement-style views |
| **Government portal** | Aggregates, ecological tracking, pollution-context map (demo) |
| **Admin** | Demo reset / oversight |
| **Case studies** | Punjab and West Bengal hubs with labelled **demonstration** data |
| **Analytics / Science / Presentation / Guide / QA** | Judge-facing charts, methodology notes, presentation mode, checklist |
| **Marketplace loop** | List lot → classify / value → match score → offer → transaction steps → credits (all in-browser) |
| **i18n** | Language toggle (English / Hindi-style pack in translations) |
| **Provenance badges** | UI labels for DEMO / PUBLIC_DATA / MODEL_ESTIMATE so judges know what is fictional |

**Stack:** React 19, React Router, Recharts, Leaflet, localStorage for session + marketplace state. Optional OpenAI (`VITE_OPENAI_API_KEY`) for Kisan AI / Policy AI.

### 3.2 NCSC report (LaTeX → PDF)

| File | Role |
|------|------|
| `report/Agrinova_NCSC_Report.tex` | Full Form-A style report (Part I problem + Part II field test) |
| `AgriNova_NCSC_Report.pdf` | Compiled PDF (also under `report/`) |
| `report/wordcount.py` | Helper word count (word limits later relaxed) |

**Report field book (authoritative for NCSC narrative):**

- **Duration:** September 2025 (not October–November harvest-window study).
- **Start:** Hridaypur, Barasat — Tapas Mondal (doorstep).
- **10 farmers:** 6 nearby Madhyamgram–Barasat + 4 Punjab by phone (family contacts).
- **2 buyers (phone):** Madhyamgram conservancy pad; Rajpura biomass cabin.
- **2 civic officers (public posts, student conversations — not ULB circulars):**
  - Dr. Bibartan Saha, Councillor, Ward 21, Barasat Municipality  
  - Sudip Biswas, Sanitary Inspector, Madhyamgram Municipality  
- **Impact on this book:** ~40.5 acres → ~81 t straw; 27 t burned on three Punjab sheets; 8/10 would list (~72 t / ~₹50,000 at ₹700/t working gate). Carbon = IPCC-style estimates, not certified credits.

### 3.3 Survey materials

| Asset | Status |
|-------|--------|
| `AgriNova_Field_Survey.xlsx` | Fillable Excel + sample rows (built via `scripts/build_field_survey_xlsx.py`) |
| `src/data/fieldSurvey.ts` | Older/larger sample pack in code (21-farmer era) — **not** the final report n=10 |
| `src/pages/Survey.tsx` | Started for a web survey UI — **not routed** in `App.tsx` (cancelled in favour of Excel + report) |

### 3.4 Other deliverables

- Presentation PDF: `AgriNova_Presentation.pdf` (also under `public/`)
- README with live ochre URL
- Case-study data for Punjab & West Bengal (demo clusters for the app)

---

## 4. What is good (strengths)

1. **Clear, local problem** — peri-urban Madhyamgram–Barasat dump/mix vs Punjab phone burn clock; honest Class XI scope (nearby + phone, not fake travel).
2. **Honest civic names** — two real ULB posts students could reach; framed as student notes, not municipal endorsement.
3. **End-to-end demo loop** a judge can click in minutes: login → sell residue → match → pickup/credits.
4. **Explainable match score** (moisture can zero a wet lot sent to a dry biomass gate).
5. **Provenance discipline** in the UI (demo vs public data vs model estimate).
6. **Strong NCSC paper trail** — LaTeX report with questionnaire, field log, conversations, analysis, limitations, references.
7. **Live deployment** on Vercel for booth / judge review.
8. **Dual failure modes** taught well: same straw, two clocks — one desk must serve both.

---

## 5. What is bad / weak / does not work (honest gaps)

### 5.1 Product reality (demo, not production)

| Gap | Detail |
|-----|--------|
| **No real backend** | Auth, listings, wallets, transactions = `localStorage`. Not multi-user / multi-device. |
| **No real pickup / SMS / WhatsApp / UPI** | Logistics and payments are simulated. |
| **No live weather / mandi / CPCB feed** | Weather, MSP, PM2.5 heatmap = demo / public-context models. |
| **Carbon credits** | Simulator only (~1.5 tCO₂e/t straw estimate). Not Verra / not redeemable seed-urea in real life. |
| **Kisan AI on live site** | Without OpenAI key on Vercel → canned “Demo mode” replies. Client-side API keys are also not a secure production pattern. |
| **Government desk** | UI aggregates only — not connected to Barasat / Madhyamgram systems. |
| **URL** | `agrinova.vercel.app` is **not** this project. Correct: **agrinova-ochre.vercel.app**. |

### 5.2 Consistency / hygiene issues

| Gap | Detail |
|-----|--------|
| **Report n=10 ≠ app demo clusters** | Website Punjab/WB case studies use larger **demonstration** packs; report uses the small nearby+phone book. Judges must be told which is which. |
| **`fieldSurvey.ts` vs report** | Code still reflects an older broader sample (e.g. more districts). Prefer Excel + report for “what we surveyed.” |
| **Survey page unfinished** | `Survey.tsx` exists but is not in the router. |
| **Uncommitted local work** | Report, survey Excel, landing, ecological tracker, etc. may still sit uncommitted — push only when asked. |
| **Voice / Bangla listing** | Browser speech exists in chat UI; full Bangla voice listing + SMS keypad flow is **aspirational**, not shipped. |

### 5.3 Limitations we already admit in the report

- n = 10 farmers + 2 buyers + 2 officers — **not a census**.
- September sittings = leftover already sitting locally + last-season recall on Punjab calls — **not** a live Oct–Nov burn count.
- ₹700/t and carbon figures = **working estimates**.
- Officer quotes = **notes of student conversations**, not ULB circulars.

---

## 6. Intended vs delivered (quick map)

| Intended | Delivered? | Notes |
|----------|------------|-------|
| Residue marketplace matching desk | **Yes (demo)** | Full click-through in browser |
| Moisture-aware buyer match | **Yes (demo)** | Score breakdown in UI |
| Farmer income from straw | **Simulated** | Credits / gate price in app |
| Carbon / ecological tracking | **Simulated** | Farmer + gov views; estimates labelled |
| Multilingual / voice | **Partial** | i18n + browser voice; not full Bangla SMS listing |
| Real ULB integration | **No** | Mock desk only |
| Field survey supporting findings | **Yes (scoped)** | n=10 nearby + phone; Excel + LaTeX |
| NCSC written report | **Yes** | Form-A style PDF |
| Statewide impact claim | **Intentionally no** | Cluster demonstration only |
| Live AI advisor everywhere | **Conditional** | Needs API key; else fallback text |

---

## 7. Field book snapshot (for quick recall)

**Local (doorstep / nearby) — West Bengal**

| Name | Place | Acres | Fate (last season) |
|------|-------|------:|--------------------|
| Ramesh Das | Doltala, Madhyamgram | 3.0 | Stack / dump |
| Sukumar Roy | Ward 21, Barasat | 2.0 | Mixed municipal waste |
| Anil Ghosh | Noapara, Madhyamgram | 4.0 | Sold (broker; moisture fight) |
| Tapas Mondal | Hridaypur, Barasat | 1.5 | Stack (Maybe on 5-day pickup) |
| Kamal Haldar | Michael Nagar | 3.5 | Mixed |
| Arun Bhattacharya | Nabapally, Barasat | 5.0 | Stack |

**Punjab (phone)**

| Name | Place | Acres | Fate |
|------|-------|------:|------|
| Jaswinder Singh | Kharar | 6.0 | Burned |
| Harpreet Kaur | Nabha | 4.5 | Burned |
| Balwinder Singh | Ghanaur | 8.0 | Sold (own number) |
| Gurmeet Singh | Rajpura rural | 3.0 | Burned (Maybe — mill skips small lot) |

**Working constants used in report:** ~2.0 t straw/acre; ~1.5 tCO₂e/t (order-of-magnitude); ~₹700/t gate for cash illustrations.

---

## 8. Suggested abatement system (what we propose)

1. **Farm** — listing card: acres, crop, tonnes, moisture, neighbourhood; Bangla voice locally / Punjabi on phone sheets.  
2. **Pad / plant** — moisture on the slip; reject mixed drain waste; compost-first when wet, biomass-first when dry & baled.  
3. **Ward 21 / Madhyamgram SI** — weekly utilised vs dumped; **no** KCC / Aadhaar / farmer mobile on officer screen.  
4. **Logistics** — one trolley in five days; neighbourhood pool for 1.5–3 acre “Maybe” lots (Tapas, Gurmeet).

**Post-field improvements suggested:** wet/cannot-bale flag; auto neighbourhood pool; conservancy “tonnes lifted this week” without names; SMS for keypad phones; moisture written before the truck leaves the lane.

---

## 9. Key files & routes

### Files to know

| Path | Why it matters |
|------|----------------|
| `src/App.tsx` | Routes |
| `src/contexts/MarketplaceContext.tsx` | Demo marketplace + localStorage |
| `src/contexts/AuthContext.tsx` | Demo / custom login |
| `src/services/scoreMatch.ts` | Match scoring |
| `src/services/openaiChat.ts` | Kisan / Policy AI + demo fallback |
| `src/data/caseStudies/*` | Punjab & WB demo case studies |
| `report/Agrinova_NCSC_Report.tex` | NCSC report source |
| `AgriNova_Field_Survey.xlsx` | Survey workbook |
| `PROJECT_SUMMARY.md` | This file |

### Useful routes

| Route | Use |
|-------|-----|
| `/` | Landing |
| `/login` | Demo login |
| `/farmer/sell` | Residue sell wizard |
| `/farmer/kisansathi` | Farmer AI |
| `/business` | Buyer portal |
| `/government` | Gov / ecological desk |
| `/case-studies` | Punjab & WB demos |
| `/analytics` | Charts |
| `/presentation` | Judge presentation mode |
| `/science` | Methodology |

---

## 10. How to run locally

```bash
npm install
npm run dev
```

Optional AI:

1. Copy `.env.example` → `.env.local`
2. Set `VITE_OPENAI_API_KEY=sk-...`
3. Restart Vite

Deploy:

```bash
npm run build
npx vercel --prod
```

Compile report (Windows, if Tectonic is installed):

```text
tectonic report/Agrinova_NCSC_Report.tex
```

---

## 11. What to say to a judge (30 seconds)

> We are Class XI students at KV Dum Dum. We asked why rice straw still becomes smoke in Punjab and mixed drain waste next to our school in Madhyamgram and Barasat, when plants already buy straw. We closed ten farmer sheets nearby and by phone in September, spoke to a Madhyamgram pad and two local officers, and built AgriNova — a listing desk with moisture and a five-day pickup. Eight of ten would list. The live site is a **demonstration** of that desk; the large numbers on the website are labelled demo data, not our survey. The survey impact we claim is about **72 tonnes** that would move on this book if pickup is real.

---

## 12. Open / next steps (if we continue)

1. Align app case-study labels even more loudly with “demonstration vs field book n=10.”  
2. Wire or delete unused `Survey.tsx` so the codebase matches the story.  
3. Commit and push report + Excel when the team is ready.  
4. Add OpenAI key to Vercel env **only** if secure enough for a school demo (prefer server proxy later).  
5. Optional: custom domain instead of `agrinova-ochre.vercel.app`.  
6. Do **not** invent travel, extra officers, or statewide forecasts.

---

## 13. Bottom line

| | |
|---|---|
| **Good** | Clear problem, honest Class XI field scope, working booth demo, solid LaTeX report, live URL |
| **Bad** | Everything “live” in the product is still localStorage/demo; AI/weather/carbon/payments are not real operations |
| **Done** | App prototype + Excel survey + NCSC report PDF + presentation materials |
| **Intended end-state** | A ward/ULB matching desk that moves small wet or dry straw lots to the right gate in five days without putting farmer phones on a municipal screen — **proven as a concept**, not yet as city infrastructure |

*This summary is for the team and mentors. The official NCSC submission remains the report PDF and the live prototype link.*
