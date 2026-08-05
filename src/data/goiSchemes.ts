export interface GoiScheme {
  id: string
  name: string
  nameHindi: string
  ministry: string
  benefit: string
  eligibility: string
  amount?: string
  problem: string
  action: string
  status: 'active' | 'seasonal'
  icon: string
}

export const goiProblems = [
  {
    id: 'stubble',
    title: 'Stubble Burning',
    titleHindi: 'पराली जलाना',
    source: 'NGT / CPCB / CAQM',
    stat: 'Up to ₹15,000/acre fine + jail up to 5 years',
    hint: 'Punjab, Haryana & UP face strict enforcement every Oct–Nov. Sell residue instead.',
  },
  {
    id: 'soil',
    title: 'Soil Health Decline',
    titleHindi: 'मिट्टी का स्वास्थ्य',
    source: 'Ministry of Agriculture',
    stat: '29% soils deficient in organic carbon',
    hint: 'Get free Soil Health Card — test every 2 years, apply balanced fertilizers.',
  },
  {
    id: 'water',
    title: 'Groundwater Crisis',
    titleHindi: 'भूजल संकट',
    source: 'Jal Shakti / CGWA',
    stat: 'Punjab blocks 80%+ districts for new tube wells',
    hint: 'Switch to drip/sprinkler — 50% subsidy under PMKSY. Solar pumps under PM-KUSUM.',
  },
  {
    id: 'income',
    title: 'Income Uncertainty',
    titleHindi: 'आय की अनिश्चितता',
    source: 'DAC&FW / MSP Committee',
    stat: 'MSP covers 23 crops but procurement varies by state',
    hint: 'Check MSP before selling. Use e-NAM mandi for better prices.',
  },
]

export const goiSchemes: GoiScheme[] = [
  {
    id: 'pm-kisan',
    name: 'PM-KISAN',
    nameHindi: 'प्रधानमंत्री किसान सम्मान निधि',
    ministry: 'DAC&FW',
    benefit: '₹6,000/year in 3 installments',
    eligibility: 'All landholding farmer families',
    amount: '₹6,000/yr',
    problem: 'Cash flow between crop cycles',
    action: 'Register on pmkisan.gov.in with Aadhaar & land records',
    status: 'active',
    icon: '💰',
  },
  {
    id: 'soil-health',
    name: 'Soil Health Card',
    nameHindi: 'मृदा स्वास्थ्य कार्ड',
    ministry: 'Ministry of Agriculture',
    benefit: 'Free soil testing + crop-wise fertilizer recommendation',
    eligibility: 'All farmers',
    problem: 'Overuse of urea degrades soil & raises emissions (Scope 3)',
    action: 'Visit nearest Krishi Vigyan Kendra or apply on soilhealth.dac.gov.in',
    status: 'active',
    icon: '🧪',
  },
  {
    id: 'pmfby',
    name: 'PM Fasal Bima Yojana',
    nameHindi: 'प्रधानमंत्री फसल बीमा योजना',
    ministry: 'Ministry of Agriculture',
    benefit: 'Crop insurance at 1.5–2% premium for Kharif/Rabi',
    eligibility: 'All farmers growing notified crops',
    amount: 'Up to sum insured per crop',
    problem: 'Crop loss from weather, pests, or calamity',
    action: 'Enroll within 2 weeks of sowing via bank or CSC',
    status: 'seasonal',
    icon: '🛡️',
  },
  {
    id: 'pm-kusum',
    name: 'PM-KUSUM',
    nameHindi: 'प्रधानमंत्री किसान ऊर्जा योजना',
    ministry: 'MNRE',
    benefit: '60% subsidy on solar pumps — cuts Scope 2 emissions',
    eligibility: 'Farmers with existing grid/diesel pumps',
    amount: 'Up to 7.5 HP solar pump',
    problem: 'High diesel/electricity cost for irrigation',
    action: 'Apply through state nodal agency or pmkusum.mnre.gov.in',
    status: 'active',
    icon: '☀️',
  },
  {
    id: 'in-situ',
    name: 'In-Situ Crop Residue Mgmt',
    nameHindi: 'फसल अवशेष प्रबंधन',
    ministry: 'DAC&FW / CPCB',
    benefit: '50–80% subsidy on Happy Seeder, baler, mulcher',
    eligibility: 'Farmers & custom hiring centres in NCR states',
    amount: 'Up to ₹1.5 lakh/machine',
    problem: 'Stubble burning — NGT fines & air pollution',
    action: 'Apply via state agriculture department before harvest season',
    status: 'seasonal',
    icon: '🚜',
  },
  {
    id: 'kcc',
    name: 'Kisan Credit Card',
    nameHindi: 'किसान क्रेडिट कार्ड',
    ministry: 'RBI / NABARD',
    benefit: 'Low-interest credit up to ₹3 lakh at 4% (with interest subvention)',
    eligibility: 'Farmers, tenant farmers, SHGs',
    amount: '₹1.6–3 lakh',
    problem: 'High informal loan rates (24–36%)',
    action: 'Apply at any bank with land records & Aadhaar',
    status: 'active',
    icon: '💳',
  },
  {
    id: 'pmksy',
    name: 'PMKSY — Per Drop More Crop',
    nameHindi: 'प्रधानमंत्री कृषि सिंचाई',
    ministry: 'Jal Shakti',
    benefit: '55% subsidy on micro-irrigation (drip/sprinkler)',
    eligibility: 'All farmers with water source',
    amount: 'Up to ₹5 lakh/hectare',
    problem: 'Water wastage & declining groundwater',
    action: 'Apply via state horticulture/agriculture portal',
    status: 'active',
    icon: '💧',
  },
  {
    id: 'natural-farming',
    name: 'National Mission on Natural Farming',
    nameHindi: 'प्राकृतिक खेती मिशन',
    ministry: 'Ministry of Agriculture',
    benefit: 'Training + ₹15,000/ha for transition to chemical-free farming',
    eligibility: 'Willing farmers in mission districts',
    problem: 'Rising input costs & Scope 3 fertilizer emissions',
    action: 'Register at nearest KVK or state agriculture office',
    status: 'active',
    icon: '🌿',
  },
]
