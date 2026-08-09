// Fictional demo analytics data for Agrinova

export const monthlyImpact = [
  { month: 'Jan', burned: 420, sold: 85, co2Avoided: 170, income: 180000 },
  { month: 'Feb', burned: 380, sold: 95, co2Avoided: 190, income: 210000 },
  { month: 'Mar', burned: 350, sold: 110, co2Avoided: 220, income: 245000 },
  { month: 'Apr', burned: 310, sold: 130, co2Avoided: 260, income: 290000 },
  { month: 'May', burned: 280, sold: 155, co2Avoided: 310, income: 340000 },
  { month: 'Jun', burned: 250, sold: 180, co2Avoided: 360, income: 395000 },
  { month: 'Jul', burned: 220, sold: 210, co2Avoided: 420, income: 460000 },
  { month: 'Aug', burned: 190, sold: 245, co2Avoided: 490, income: 530000 },
  { month: 'Sep', burned: 160, sold: 280, co2Avoided: 560, income: 610000 },
  { month: 'Oct', burned: 120, sold: 320, co2Avoided: 640, income: 700000 },
  { month: 'Nov', burned: 85, sold: 380, co2Avoided: 760, income: 820000 },
  { month: 'Dec', burned: 60, sold: 420, co2Avoided: 840, income: 910000 },
]

export const districtData = [
  { district: 'Patiala', farmers: 8, tonnes: 142, co2: 284, income: 890000 },
  { district: 'Sangrur', farmers: 6, tonnes: 98, co2: 196, income: 620000 },
  { district: 'Barnala', farmers: 4, tonnes: 76, co2: 152, income: 480000 },
  { district: 'Ludhiana', farmers: 3, tonnes: 58, co2: 116, income: 370000 },
  { district: 'Fatehgarh', farmers: 2, tonnes: 42, co2: 84, income: 265000 },
  { district: 'Malerkotla', farmers: 2, tonnes: 66, co2: 132, income: 415000 },
]

export const emissionScopes = [
  { name: 'Scope 1 (Burning)', value: 62, fill: '#ef4444' },
  { name: 'Scope 1 (Machinery)', value: 18, fill: '#f97316' },
  { name: 'Scope 2 (Energy)', value: 12, fill: '#eab308' },
  { name: 'Scope 3 (Supply Chain)', value: 8, fill: '#3b82f6' },
]

export const emissionScopesAfter = [
  { name: 'Scope 1 (Burning)', value: 8, fill: '#ef4444' },
  { name: 'Scope 1 (Machinery)', value: 22, fill: '#f97316' },
  { name: 'Scope 2 (Energy)', value: 15, fill: '#eab308' },
  { name: 'Scope 3 (Supply Chain)', value: 12, fill: '#3b82f6' },
  { name: 'Avoided (Sold)', value: 43, fill: '#3ecf6e' },
]

export const sustainabilityRadar = [
  { metric: 'Income', before: 35, after: 82 },
  { metric: 'Soil Health', before: 28, after: 74 },
  { metric: 'Water Use', before: 42, after: 68 },
  { metric: 'Emissions', before: 15, after: 78 },
  { metric: 'Residue Mgmt', before: 10, after: 91 },
  { metric: 'Market Access', before: 22, after: 85 },
]

export const residueFlow = [
  { month: 'Jun', rice: 45, wheat: 30, cotton: 12, maize: 8 },
  { month: 'Jul', rice: 52, wheat: 28, cotton: 15, maize: 10 },
  { month: 'Aug', rice: 58, wheat: 35, cotton: 18, maize: 12 },
  { month: 'Sep', rice: 72, wheat: 42, cotton: 22, maize: 15 },
  { month: 'Oct', rice: 95, wheat: 55, cotton: 28, maize: 18 },
  { month: 'Nov', rice: 120, wheat: 68, cotton: 32, maize: 22 },
]

export const aiAccuracy = [
  { week: 'W1', weather: 72, crop: 68, market: 65, match: 70 },
  { week: 'W2', weather: 75, crop: 71, market: 68, match: 74 },
  { week: 'W3', weather: 78, crop: 74, market: 72, match: 78 },
  { week: 'W4', weather: 82, crop: 77, market: 75, match: 82 },
  { week: 'W5', weather: 84, crop: 80, market: 78, match: 85 },
  { week: 'W6', weather: 86, crop: 82, market: 80, match: 87 },
]

export const priceDemandScatter = [
  { price: 600, demand: 250, type: 'Compost' },
  { price: 630, demand: 180, type: 'Cattle Feed' },
  { price: 650, demand: 200, type: 'Cattle Feed' },
  { price: 680, demand: 400, type: 'Biomass' },
  { price: 700, demand: 300, type: 'Paper' },
  { price: 710, demand: 220, type: 'Paper' },
  { price: 720, demand: 100, type: 'Packaging' },
  { price: 750, demand: 500, type: 'Biomass' },
  { price: 800, demand: 150, type: 'Biochar' },
  { price: 820, demand: 120, type: 'Biochar' },
]

export const farmerIncomeWaterfall = [
  { stage: 'Crop Sales', value: 185000, fill: '#7a8f7a' },
  { stage: 'Residue', value: 42000, fill: '#3ecf6e' },
  { stage: 'Govt Schemes', value: 6000, fill: '#3b82f6' },
  { stage: 'Saved Fines', value: 15000, fill: '#eab308' },
  { stage: 'Total', value: 248000, fill: '#4ade80' },
]

export const liveMetrics = [
  { label: 'Farmers Onboarded', value: '25', change: '+18%', icon: '👨‍🌾' },
  { label: 'Tonnes Rescued', value: '482', change: '+34%', icon: '♻️' },
  { label: 'CO₂ Avoided', value: '964 t', change: '+41%', icon: '🌍' },
  { label: 'Income Generated', value: '₹28.4L', change: '+52%', icon: '💰' },
  { label: 'Burning Reduced', value: '86%', change: '+12%', icon: '🔥' },
  { label: 'Match Accuracy', value: '87%', change: '+5%', icon: '🎯' },
]

export const comparisonStats = {
  withoutAgrinova: { income: 185000, co2: 12.4, fines: 75000, soilScore: 28 },
  withAgrinova: { income: 248000, co2: 3.7, fines: 0, soilScore: 74 },
}
