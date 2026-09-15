"""Capture live product snapshots for the presentation PDF."""
from pathlib import Path
import json
import subprocess
import sys

ROOT = Path(__file__).resolve().parent.parent
OUT = ROOT / "scripts" / "snapshots"
OUT.mkdir(parents=True, exist_ok=True)

try:
    from playwright.sync_api import sync_playwright
except ImportError:
    subprocess.check_call([sys.executable, "-m", "pip", "install", "playwright", "-q"])
    subprocess.check_call([sys.executable, "-m", "playwright", "install", "chromium"])
    from playwright.sync_api import sync_playwright

FARMER = {
    "profileId": "ramesh",
    "role": "seller",
    "displayName": "Ramesh Singh",
    "village": "Kharar",
    "district": "Patiala",
    "state": "Punjab",
    "acres": 6,
    "phone": "+91 98765 10421",
    "gender": "male",
    "age": 42,
    "crops": ["Rice", "Wheat"],
    "farmerId": "farmer-001",
    "soil": {
        "type": "alluvial",
        "ph": 7.2,
        "organicCarbonPercent": 0.45,
        "nitrogen": "medium",
        "notes": "Patiala belt alluvial — demo soil card for Kisan AI.",
    },
    "parcels": [
        {
            "id": "parcel-rice",
            "label": "Paddy block A",
            "crop": "Rice",
            "acres": 2.5,
            "forSale": True,
            "points": [
                {"lat": 30.7389, "lng": 76.6486},
                {"lat": 30.7389, "lng": 76.6514},
                {"lat": 30.7411, "lng": 76.6514},
                {"lat": 30.7411, "lng": 76.6486},
            ],
        }
    ],
}

GOV = {
    "profileId": "anil",
    "role": "government",
    "displayName": "Dr. Anil Bedi",
    "village": "Patiala",
    "district": "Patiala",
    "state": "Punjab",
    "acres": 0,
    "phone": "+91 17200 00001",
    "gender": "male",
    "age": 48,
    "crops": ["Rice", "Wheat"],
    "soil": FARMER["soil"],
    "parcels": [],
}

BUYER = {
    "profileId": "priya",
    "role": "buyer",
    "displayName": "Priya Malhotra",
    "village": "Rajpura",
    "district": "Patiala",
    "state": "Punjab",
    "acres": 0,
    "phone": "+91 98150 33001",
    "gender": "female",
    "age": 36,
    "crops": ["Rice", "Wheat"],
    "buyerId": "buy-001",
    "soil": FARMER["soil"],
    "parcels": [],
}


def open_as(browser, user, path, name, extra_wait=1400):
    ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1.2)
    page = ctx.new_page()
    payload = json.dumps(user)
    page.add_init_script(f"localStorage.setItem('agrinova_session_v2', {json.dumps(payload)});")
    page.goto(f"http://localhost:5173{path}", wait_until="domcontentloaded", timeout=60000)
    page.wait_for_timeout(extra_wait)
    dest = OUT / f"{name}.png"
    page.screenshot(path=str(dest), full_page=False)
    print("saved", dest.name)
    ctx.close()


def main():
    with sync_playwright() as p:
        browser = p.chromium.launch()
        # clean login — no session
        ctx = browser.new_context(viewport={"width": 1440, "height": 900}, device_scale_factor=1.2)
        page = ctx.new_page()
        page.goto("http://localhost:5173/login", wait_until="networkidle", timeout=60000)
        page.wait_for_timeout(800)
        page.screenshot(path=str(OUT / "01-login.png"), full_page=False)
        print("saved 01-login.png")
        ctx.close()

        open_as(browser, FARMER, "/farmer", "02-farmer-home", 1400)
        open_as(browser, FARMER, "/farmer/map", "03-plot-map", 2800)
        open_as(browser, FARMER, "/farmer/sell", "04-sell", 1600)
        open_as(browser, FARMER, "/farmer/impact", "10-impact", 1600)
        open_as(browser, FARMER, "/farmer/kisansathi", "05-kisan-ai", 1600)
        open_as(browser, FARMER, "/farmer/learn", "06-learn", 1600)
        open_as(browser, FARMER, "/farmer/credits", "07-credits", 1400)
        open_as(browser, GOV, "/government", "08-government", 3200)
        open_as(browser, BUYER, "/business", "09-buyer", 1800)
        browser.close()


if __name__ == "__main__":
    main()
