export interface MspCrop {
  crop: string
  cropHindi: string
  season: string
  msp2025: number
  unit: string
  change: string
}

export const mspPrices: MspCrop[] = [
  { crop: 'Paddy (Common)', cropHindi: 'धान', season: 'Kharif', msp2025: 2300, unit: 'quintal', change: '+5.4%' },
  { crop: 'Wheat', cropHindi: 'गेहूं', season: 'Rabi', msp2025: 2275, unit: 'quintal', change: '+4.6%' },
  { crop: 'Maize', cropHindi: 'मक्का', season: 'Kharif', msp2025: 2225, unit: 'quintal', change: '+3.7%' },
  { crop: 'Cotton (Medium)', cropHindi: 'कपास', season: 'Kharif', msp2025: 7121, unit: 'quintal', change: '+5.0%' },
  { crop: 'Moong', cropHindi: 'मूंग', season: 'Kharif', msp2025: 8682, unit: 'quintal', change: '+6.2%' },
  { crop: 'Mustard', cropHindi: 'सरसों', season: 'Rabi', msp2025: 5650, unit: 'quintal', change: '+4.8%' },
]

export interface CropCalendarItem {
  month: string
  monthHindi: string
  activity: string
  activityHindi: string
  crop: string
  tip: string
  goiScheme?: string
}

export const cropCalendar: CropCalendarItem[] = [
  { month: 'Jun–Jul', monthHindi: 'जून–जुलाई', crop: 'Rice', activity: 'Nursery sowing & transplanting', activityHindi: 'बीज बोना व रोपाई', tip: 'Check PMFBY enrollment deadline', goiScheme: 'PM Fasal Bima' },
  { month: 'Oct–Nov', monthHindi: 'अक्टूबर–नवंबर', crop: 'Rice/Wheat', activity: 'Harvest & residue management', activityHindi: 'कटाई व पराली प्रबंधन', tip: 'DO NOT burn stubble — NGT fines active', goiScheme: 'In-Situ Residue Mgmt' },
  { month: 'Nov–Dec', monthHindi: 'नवंबर–दिसंबर', crop: 'Wheat', activity: 'Wheat sowing with Happy Seeder', activityHindi: 'हैप्पी सीडर से गेहूं बोना', tip: 'Zero-till saves diesel (Scope 1) + time', goiScheme: 'In-Situ Residue Mgmt' },
  { month: 'Apr–May', monthHindi: 'अप्रैल–मई', crop: 'Wheat', activity: 'Wheat harvest & sell at MSP', activityHindi: 'गेहूं कटाई व MSP पर बेचना', tip: 'Check MSP before selling to local buyer', goiScheme: 'MSP Procurement' },
  { month: 'Jan–Feb', monthHindi: 'जनवरी–फरवरी', crop: 'Wheat', activity: 'Irrigation & fertilizer top-dress', activityHindi: 'सिंचाई व उर्वरक', tip: 'Use Soil Health Card recommendations', goiScheme: 'Soil Health Card' },
]

export const weatherAdvisory = {
  location: 'Patiala, Punjab',
  temp: '28°C',
  condition: 'Partly Cloudy',
  humidity: '62%',
  wind: '12 km/h NW',
  alerts: [
    { type: 'warning', text: 'Stubble burning season — CAQM GRAP Stage II active in NCR', textHindi: 'पराली जलाने का मौसम — CAQM दिशानिर्देश लागू' },
    { type: 'info', text: 'Light rain expected Nov 12–13. Good for zero-till wheat sowing.', textHindi: 'हल्की बारिश की संभावना — जीरो टिल गेहूं बोने के लिए अच्छा' },
    { type: 'tip', text: 'Avoid irrigation 48hrs before rain to save electricity (Scope 2).', textHindi: 'बारिश से 48 घंटे पहले सिंचाई बंद करें' },
  ],
}

export interface SoilHealthTip {
  param: string
  paramHindi: string
  yourValue: string
  status: 'good' | 'low' | 'high'
  recommendation: string
}

export const soilHealthCard: SoilHealthTip[] = [
  { param: 'pH', paramHindi: 'अम्लीयता', yourValue: '7.2', status: 'good', recommendation: 'Ideal range. No lime needed.' },
  { param: 'Organic Carbon', paramHindi: 'जैविक कार्बन', yourValue: '0.42%', status: 'low', recommendation: 'Add FYM/compost 5t/acre. Stop burning residue.' },
  { param: 'Nitrogen (N)', paramHindi: 'नाइट्रोजन', yourValue: '280 kg/ha', status: 'good', recommendation: 'Apply 120 kg urea/acre as per SHC.' },
  { param: 'Phosphorus (P)', paramHindi: 'फास्फोरस', yourValue: '18 kg/ha', status: 'low', recommendation: 'Apply DAP 50 kg/acre before sowing.' },
  { param: 'Potassium (K)', paramHindi: 'पोटैश', yourValue: '145 kg/ha', status: 'good', recommendation: 'Maintain with MOP 25 kg/acre.' },
]

export const toolCards = [
  { id: 'emissions', icon: '📊', title: 'Emissions Tracker', titleHindi: 'उत्सर्जन ट्रैकर', desc: 'Scope 1, 2 & 3 calculator' },
  { id: 'schemes', icon: '🏛️', title: 'Govt Schemes', titleHindi: 'सरकारी योजनाएं', desc: 'PM-KISAN, SHC, PMFBY & more' },
  { id: 'msp', icon: '📈', title: 'MSP Prices', titleHindi: 'एमएसपी भाव', desc: '2025-26 minimum support prices' },
  { id: 'calendar', icon: '📅', title: 'Crop Calendar', titleHindi: 'फसल कैलेंडर', desc: 'Season-wise farming guide' },
  { id: 'weather', icon: '🌤️', title: 'Weather Advisory', titleHindi: 'मौसम सलाह', desc: 'Alerts & farming tips' },
  { id: 'soil', icon: '🧪', title: 'Soil Health', titleHindi: 'मिट्टी स्वास्थ्य', desc: 'Your Soil Health Card data' },
]
