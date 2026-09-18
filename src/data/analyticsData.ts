// Demonstration analytics for the Madhyamgram–Barasat booth cluster

export const monthlyImpact = [
  { month: 'Jan', burned: 180, sold: 42, tonnes: 42, co2Avoided: 63, income: 25200 },
  { month: 'Feb', burned: 165, sold: 48, tonnes: 48, co2Avoided: 72, income: 28800 },
  { month: 'Mar', burned: 150, sold: 55, tonnes: 55, co2Avoided: 82, income: 33000 },
  { month: 'Apr', burned: 140, sold: 62, tonnes: 62, co2Avoided: 93, income: 37200 },
  { month: 'May', burned: 128, sold: 70, tonnes: 70, co2Avoided: 105, income: 42000 },
  { month: 'Jun', burned: 118, sold: 78, tonnes: 78, co2Avoided: 117, income: 46800 },
  { month: 'Jul', burned: 110, sold: 88, tonnes: 88, co2Avoided: 132, income: 52800 },
  { month: 'Aug', burned: 98, sold: 96, tonnes: 96, co2Avoided: 144, income: 57600 },
  { month: 'Sep', burned: 86, sold: 108, tonnes: 108, co2Avoided: 162, income: 64800 },
  { month: 'Oct', burned: 72, sold: 124, tonnes: 124, co2Avoided: 186, income: 74400 },
  { month: 'Nov', burned: 54, sold: 142, tonnes: 142, co2Avoided: 213, income: 85200 },
  { month: 'Dec', burned: 40, sold: 156, tonnes: 156, co2Avoided: 234, income: 93600 },
]

export const districtData = [
  { district: 'N 24 Pgs', farmers: 10, tonnes: 72, co2: 108, income: 432000 },
  { district: 'Madhyamgram', farmers: 6, tonnes: 28, co2: 42, income: 168000 },
  { district: 'Barasat', farmers: 6, tonnes: 24, co2: 36, income: 144000 },
  { district: 'Hooghly', farmers: 4, tonnes: 18, co2: 27, income: 108000 },
  { district: 'Nadia', farmers: 3, tonnes: 14, co2: 21, income: 84000 },
  { district: 'Howrah', farmers: 2, tonnes: 10, co2: 15, income: 60000 },
]

export const emissionScopes = [
  { name: 'Dump / mix', value: 48, fill: '#6e6e73' },
  { name: 'Rot / methane', value: 22, fill: '#f97316' },
  { name: 'Burn (dry days)', value: 18, fill: '#ef4444' },
  { name: 'Transport', value: 12, fill: '#3b82f6' },
]

export const emissionScopesAfter = [
  { name: 'Dump / mix', value: 12, fill: '#6e6e73' },
  { name: 'Rot / methane', value: 10, fill: '#f97316' },
  { name: 'Burn (dry days)', value: 6, fill: '#ef4444' },
  { name: 'Transport', value: 14, fill: '#3b82f6' },
  { name: 'Avoided (listed)', value: 58, fill: '#3ecf6e' },
]

export const sustainabilityRadar = [
  { metric: 'Income', axis: 'Income', before: 28, after: 74 },
  { metric: 'Soil Health', axis: 'Soil Health', before: 32, after: 68 },
  { metric: 'Water Use', axis: 'Water Use', before: 40, after: 62 },
  { metric: 'Emissions', axis: 'Emissions', before: 18, after: 72 },
  { metric: 'Residue Mgmt', axis: 'Residue Mgmt', before: 12, after: 86 },
  { metric: 'Market Access', axis: 'Market Access', before: 16, after: 80 },
]

export const residueFlow = [
  { name: 'Field straw', value: 180, month: 'Jun', rice: 45, wheat: 12, cotton: 4, maize: 6 },
  { name: 'Dumped / mixed', value: 74, month: 'Jul', rice: 52, wheat: 14, cotton: 5, maize: 7 },
  { name: 'Burned', value: 40, month: 'Aug', rice: 58, wheat: 16, cotton: 6, maize: 8 },
  { name: 'Sold / lifted', value: 32, month: 'Sep', rice: 72, wheat: 18, cotton: 6, maize: 8 },
  { name: 'Rot / unused', value: 34, month: 'Oct', rice: 95, wheat: 22, cotton: 8, maize: 10 },
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
  { price: 560, demand: 90, type: 'Compost' },
  { price: 590, demand: 120, type: 'Compost' },
  { price: 610, demand: 80, type: 'Biogas' },
  { price: 640, demand: 110, type: 'Paper' },
  { price: 660, demand: 70, type: 'Paper' },
  { price: 680, demand: 200, type: 'Biomass' },
  { price: 700, demand: 95, type: 'Biochar' },
]

export const farmerIncomeWaterfall = [
  { stage: 'Crop sales', step: 'Crop sales', value: 92000, fill: '#7a8f7a' },
  { stage: 'Residue lot', step: 'Residue lot', value: 18900, fill: '#3ecf6e' },
  { stage: 'Credits / urea', step: 'Credits / urea', value: 4200, fill: '#3b82f6' },
  { stage: 'Avoided dump cost', step: 'Avoided dump cost', value: 3500, fill: '#eab308' },
  { stage: 'Total', step: 'Total', value: 118600, fill: '#4ade80' },
]

export const liveMetrics = [
  { label: 'Farmers onboarded', value: '25', change: '+18%', icon: '👨‍🌾' },
  { label: 'Tonnes listed', value: '72', change: '+34%', icon: '♻️' },
  { label: 'CO₂ avoided', value: '108 t', change: '+41%', icon: '🌍' },
  { label: 'Income generated', value: '₹4.3L', change: '+52%', icon: '💰' },
  { label: 'Dump / mix cut', value: '58%', change: '+12%', icon: '🔥' },
  { label: 'Match accuracy', value: '87%', change: '+5%', icon: '🎯' },
]

export const comparisonStats = {
  withoutAgrinova: { income: 92000, co2: 9.8, fines: 0, soilScore: 32 },
  withAgrinova: { income: 118600, co2: 3.2, fines: 0, soilScore: 68 },
}
