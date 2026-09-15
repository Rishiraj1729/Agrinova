# AgriNova — Critical product & engineering decisions

This file records **what we chose and why**, so judges and future contributors understand intentional trade-offs.

---

## 1. Login = demo identity switch, not real auth

**Decision:** Ship a login / identity screen where you pick a **persona** (farmer, buyer, government, admin) and optionally fill demographic fields that persist in `localStorage`. No passwords, OTP, or backend auth for this NCSC prototype.

**Why:** A real IdP would dominate the sprint and hide the marketplace story. Judges need to become Ramesh / Priya / Dr. Bedi in one click. Demographics on the login card make profiles feel intentional instead of random generated names.

---

## 2. Plot map = **real OpenStreetMap** + draw parcels

**Decision:** Use Leaflet + OSM tiles. Farmers click field corners in lat/lng; acres from geodesic area. DAO pollution view uses the same real basemap with district markers.

**Why:** A sketch canvas looked fake. Real geography (Kharar / Patiala) makes the straw-from-land story credible for judges. Still not cadastral BhuNaksha — OSM is enough for a demo without API keys.

---

## 3. Matching is explainable and moisture-aware

**Decision:** AgriNova Match Score keeps five factors and **penalises moisture above buyer plant specs** (e.g. GreenPower ≤15%). Quantity and radius remain hard filters.

**Why:** Judges ask “why this buyer?” A score without moisture is fake for biomass. Transparency beats a black-box ML ranker for a science-congress demo.

---

## 4. Carbon credits are **two-sided** (farmer + buyer)

**Decision:** On completed sale:
- Farmer wallet: credits ≈ avoided tCO₂e × 1000 (redeem seed/fertiliser).
- Buyer wallet: **procurement credits** that feed a **green-tax / CSR offset simulator** (demo ₹/tCO₂e indicative, not a finance ministry rule).

**Why:** Residue utilisation is a supply-chain story. Buyers need a reason beyond cheap feedstock — tax/CSR narrative makes procurement stick. Labels stress **not** a certified registry or legal tax opinion.

---

## 5. OpenAI only through a thin client wrapper + role system prompts

**Decision:** `VITE_OPENAI_API_KEY` in **`.env.local` only** (never `.env.example`). Kisan AI / Policy AI use role-specific system prompts (soil, sowing, residue, policy). If key missing → researched fallback answers.

**Why:** Frontend keys are acceptable only for a local judge laptop demo. `.env.example` must stay a placeholder so the repo never leaks secrets. Fallback keeps the booth running offline.

---

## 6. “Before AgriNova vs projection” uses literature-scaled models

**Decision:** Government screen shows **baseline burn / PM2.5 context** (public episode literature) vs **with-AgriNova projection** if X% of demo-cluster straw is utilised. Numbers are scaled to the 25-farm cluster, not claimed as state-wide forecasts.

**Why:** Judges respect honesty. Inflating “state saved” from 25 fictional farms destroys credibility. Show method + limitations next to every chart.

---

## 7. UI direction: slate + blue + amber credits (no generic AI purple/green farm cliché)

**Decision:** Keep dark slate, blue primary, amber credit accents; login as first viewport; reduce nav clutter to story desks (Ramesh / Priya / DAO / Ops).

**Why:** Earlier green-on-black felt like a template. Login + people + maps make the first five minutes feel like a product, not a slide deck.

---

## 8. Seed data is “lived-in”

**Decision:** First load includes Simran’s completed sale, Harpreet’s open offers, GreenPower RFQ — not an empty marketplace.

**Why:** Empty tables fail demos. History proves credits + MRV work before the judge completes their own sale.

---

## 9. Login gate on all product routes

**Decision:** `/login` is public; everything under `AppShell` requires a session persona.

**Why:** Forces judges through identity + demographics so the rest of the app is about *someone*, not anonymous clicks.

---

## 10. Dual carbon credits (implemented)

**Decision:** On sale complete, farmer gets 100% credit units; buyer gets 70% as procurement credits feeding ₹1200/tCO₂e green-tax/CSR simulator.

**Why:** Both sides need climate incentive; buyer tax story makes procurement politically saleable without claiming a legal tax code.

---

## 11. Profiles stay separate (no mid-session switching)

**Decision:** Remove the “Switch desk” bar that hot-swapped Ramesh → Priya. Nav is **role-scoped**. Cross-role URLs redirect home. To change person: **Switch account** → login.

**Why:** Mixing personas in one session made the UI feel fake and confused judges about whose wallet/listings they were seeing.

