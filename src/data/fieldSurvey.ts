export type SurveyRole = 'farmer' | 'buyer' | 'government'
export type SurveyState = 'Punjab' | 'West Bengal'

export interface SurveyQuestion {
  id: string
  roles: SurveyRole[]
  prompt: string
  type: 'choice' | 'text' | 'number'
  options?: string[]
}

export interface SurveyEntry {
  id: string
  role: SurveyRole
  name: string
  designation?: string
  village: string
  district: string
  state: SurveyState
  acres?: number
  answers: Record<string, string>
}

export const surveyQuestions: SurveyQuestion[] = [
  { id: 'role', roles: ['farmer', 'buyer', 'government'], prompt: 'Who are you filling this for?', type: 'choice', options: ['Farmer', 'Buyer / plant staff', 'Government official'] },
  { id: 'state', roles: ['farmer', 'buyer', 'government'], prompt: 'State', type: 'choice', options: ['West Bengal', 'Punjab'] },
  { id: 'district', roles: ['farmer', 'buyer', 'government'], prompt: 'District / block', type: 'text' },
  { id: 'village', roles: ['farmer', 'buyer', 'government'], prompt: 'Village / plant / office', type: 'text' },
  { id: 'name', roles: ['farmer', 'buyer', 'government'], prompt: 'Name (first name is enough)', type: 'text' },
  { id: 'acres', roles: ['farmer'], prompt: 'Operated land (acres)', type: 'number' },
  {
    id: 'fate',
    roles: ['farmer'],
    prompt: 'What happened to most of last season’s residue?',
    type: 'choice',
    options: ['Sold / gifted to a plant or neighbour', 'Stacked and left to rot or dump', 'Burned on a dry window', 'Mixed into household / municipal waste'],
  },
  {
    id: 'window',
    roles: ['farmer'],
    prompt: 'Days between harvest and next sowing',
    type: 'choice',
    options: ['Under 10 days', '10–15 days', '16–25 days', 'More than 25 days'],
  },
  {
    id: 'buyerPhone',
    roles: ['farmer'],
    prompt: 'Do you have a plant / buyer phone number you can call yourself?',
    type: 'choice',
    options: ['Yes', 'Only through a broker', 'No'],
  },
  {
    id: 'barrier',
    roles: ['farmer'],
    prompt: 'If you did not sell, the main reason was',
    type: 'choice',
    options: [
      'No buyer phone in the village',
      'Straw too wet to bale',
      'Transport cost eats the gate price',
      'Do not know compost / paper mill exists',
      'I did sell',
    ],
  },
  {
    id: 'pickup',
    roles: ['farmer'],
    prompt: 'Would you list on a phone desk if pickup is guaranteed in 5 days?',
    type: 'choice',
    options: ['Yes', 'Maybe', 'No'],
  },
  {
    id: 'lang',
    roles: ['farmer'],
    prompt: 'Preferred advice language',
    type: 'choice',
    options: ['Punjabi', 'Hindi', 'Bangla', 'English', 'Voice in my language, not a PDF'],
  },
  { id: 'farmerNote', roles: ['farmer'], prompt: 'One sentence in your words', type: 'text' },
  {
    id: 'plant',
    roles: ['buyer'],
    prompt: 'Plant type',
    type: 'choice',
    options: ['Biomass', 'Paper', 'Compost / SWM', 'Cattle feed', 'Biogas'],
  },
  {
    id: 'moisture',
    roles: ['buyer'],
    prompt: 'Moisture you will actually lift',
    type: 'choice',
    options: ['≤12%', '≤15%', '≤18%', 'We take mixed wet waste'],
  },
  {
    id: 'smallholders',
    roles: ['buyer'],
    prompt: 'Do 2–6 acre farms reach your gate without a broker?',
    type: 'choice',
    options: ['Often', 'Rarely', 'Almost never'],
  },
  {
    id: 'listingHelp',
    roles: ['buyer'],
    prompt: 'Would a moisture-tagged listing + pickup slot help you take small lots?',
    type: 'choice',
    options: ['Yes', 'Only if baled', 'No'],
  },
  { id: 'buyerNote', roles: ['buyer'], prompt: 'One sentence from the plant floor', type: 'text' },
  {
    id: 'rank',
    roles: ['government'],
    prompt: 'Your post (this survey is for field / block staff, not secretariat)',
    type: 'choice',
    options: [
      'Agriculture Development Officer (ADO) / BAO',
      'Assistant Agricultural Officer',
      'Agriculture Sub-Inspector',
      'Sanitary Inspector (ULB / SWM)',
    ],
  },
  {
    id: 'trackNow',
    roles: ['government'],
    prompt: 'What do you currently put in the register?',
    type: 'choice',
    options: ['Farmer names and FIRs', 'Fires seen / complaints', 'Tonnes lifted to a plant', 'Almost nothing usable'],
  },
  {
    id: 'gap',
    roles: ['government'],
    prompt: 'Biggest gap in your block',
    type: 'choice',
    options: [
      'No utilised-vs-burned / dumped view',
      'CRM machines exist but no matching desk',
      'Compost plant is hungry; villages dump in drains',
      'Cannot share farmer phones upward',
    ],
  },
  {
    id: 'desk',
    roles: ['government'],
    prompt: 'Would an aggregate desk (no farmer PII) help your weekly note?',
    type: 'choice',
    options: ['Yes', 'If it stays at block level', 'No'],
  },
  { id: 'govNote', roles: ['government'], prompt: 'One sentence from the block office', type: 'text' },
]

export const sampleSurvey: SurveyEntry[] = [
  // 11 Punjab farmers
  { id: 'f01', role: 'farmer', name: 'Jaswinder Singh', village: 'Kharar', district: 'Patiala', state: 'Punjab', acres: 6, answers: { fate: 'Burned on a dry window', window: '10–15 days', buyerPhone: 'Only through a broker', barrier: 'No buyer phone in the village', pickup: 'Yes', lang: 'Punjabi', farmerNote: '12 days for wheat. Last year I burned. If a trolley comes I will not light it.' } },
  { id: 'f02', role: 'farmer', name: 'Harpreet Kaur', village: 'Nabha', district: 'Patiala', state: 'Punjab', acres: 4.5, answers: { fate: 'Burned on a dry window', window: 'Under 10 days', buyerPhone: 'No', barrier: 'Transport cost eats the gate price', pickup: 'Yes', lang: 'Punjabi', farmerNote: 'Plant is 18 km. By the time the contractor quotes, sowing has started.' } },
  { id: 'f03', role: 'farmer', name: 'Balwinder Singh', village: 'Ghanaur', district: 'Patiala', state: 'Punjab', acres: 8, answers: { fate: 'Sold / gifted to a plant or neighbour', window: '10–15 days', buyerPhone: 'Yes', barrier: 'I did sell', pickup: 'Yes', lang: 'Hindi', farmerNote: 'Neighbour’s baler, GreenPower paid ₹740/t. I want the same slot on a phone, not WhatsApp.' } },
  { id: 'f04', role: 'farmer', name: 'Gurmeet Singh', village: 'Rajpura rural', district: 'Patiala', state: 'Punjab', acres: 3, answers: { fate: 'Burned on a dry window', window: '10–15 days', buyerPhone: 'No', barrier: 'No buyer phone in the village', pickup: 'Maybe', lang: 'Punjabi', farmerNote: 'Two acres is too small for the mill group. They skip us.' } },
  { id: 'f05', role: 'farmer', name: 'Manjeet Kaur', village: 'Sunam', district: 'Sangrur', state: 'Punjab', acres: 4, answers: { fate: 'Sold / gifted to a plant or neighbour', window: '10–15 days', buyerPhone: 'Only through a broker', barrier: 'I did sell', pickup: 'Yes', lang: 'Punjabi', farmerNote: 'Sold stubble once. Credits for urea would make me list again.' } },
  { id: 'f06', role: 'farmer', name: 'Jagdeep Singh', village: 'Dhuri', district: 'Sangrur', state: 'Punjab', acres: 7, answers: { fate: 'Burned on a dry window', window: 'Under 10 days', buyerPhone: 'Only through a broker', barrier: 'No buyer phone in the village', pickup: 'Yes', lang: 'Hindi', farmerNote: 'Happy Seeder is booked late. Burning is still the 2-hour option.' } },
  { id: 'f07', role: 'farmer', name: 'Kuldeep Singh', village: 'Malerkotla', district: 'Malerkotla', state: 'Punjab', acres: 5, answers: { fate: 'Stacked and left to rot or dump', window: '10–15 days', buyerPhone: 'No', barrier: 'Straw too wet to bale', pickup: 'Maybe', lang: 'Punjabi', farmerNote: 'Rain after harvest. Stack smelled. Nobody lifted it.' } },
  { id: 'f08', role: 'farmer', name: 'Nirmal Singh', village: 'Barnala', district: 'Barnala', state: 'Punjab', acres: 9, answers: { fate: 'Burned on a dry window', window: '10–15 days', buyerPhone: 'Only through a broker', barrier: 'Transport cost eats the gate price', pickup: 'Yes', lang: 'Punjabi', farmerNote: 'Broker took ₹120/t. Net was not worth the wait.' } },
  { id: 'f09', role: 'farmer', name: 'Sukhchain Singh', village: 'Tapa', district: 'Barnala', state: 'Punjab', acres: 2.5, answers: { fate: 'Burned on a dry window', window: 'Under 10 days', buyerPhone: 'No', barrier: 'No buyer phone in the village', pickup: 'Yes', lang: 'Hindi', farmerNote: 'ADO told us not to burn. He did not give a buyer number.' } },
  { id: 'f10', role: 'farmer', name: 'Ravinder Kaur', village: 'Bhawanigarh', district: 'Sangrur', state: 'Punjab', acres: 6, answers: { fate: 'Stacked and left to rot or dump', window: '16–25 days', buyerPhone: 'No', barrier: 'Do not know compost / paper mill exists', pickup: 'Yes', lang: 'Punjabi', farmerNote: 'I thought only biomass plants take straw. Nobody said compost.' } },
  { id: 'f11', role: 'farmer', name: 'Amrik Singh', village: 'Patran', district: 'Patiala', state: 'Punjab', acres: 5.5, answers: { fate: 'Burned on a dry window', window: '10–15 days', buyerPhone: 'Only through a broker', barrier: 'No buyer phone in the village', pickup: 'Yes', lang: 'Punjabi', farmerNote: 'If match and pickup sit on one screen I will try once this kharif.' } },
  // 10 West Bengal farmers
  { id: 'f12', role: 'farmer', name: 'Ramesh Das', village: 'Memari', district: 'Burdwan', state: 'West Bengal', acres: 3, answers: { fate: 'Stacked and left to rot or dump', window: '16–25 days', buyerPhone: 'No', barrier: 'No buyer phone in the village', pickup: 'Yes', lang: 'Bangla', farmerNote: 'Straw sits by the canal. Nobody from the mill has ever come here.' } },
  { id: 'f13', role: 'farmer', name: 'Sukumar Roy', village: 'Kalna', district: 'Burdwan', state: 'West Bengal', acres: 2, answers: { fate: 'Mixed into household / municipal waste', window: 'More than 25 days', buyerPhone: 'No', barrier: 'Do not know compost / paper mill exists', pickup: 'Yes', lang: 'Voice in my language, not a PDF', farmerNote: 'Pour into the drain after rain. Municipality swears at us, then takes mixed waste.' } },
  { id: 'f14', role: 'farmer', name: 'Anil Ghosh', village: 'Chandannagar outgrowth', district: 'Hooghly', state: 'West Bengal', acres: 4, answers: { fate: 'Sold / gifted to a plant or neighbour', window: '16–25 days', buyerPhone: 'Only through a broker', barrier: 'I did sell', pickup: 'Yes', lang: 'Bangla', farmerNote: 'Paper mill took one lot. Moisture argument at the gate. Need a card before travel.' } },
  { id: 'f15', role: 'farmer', name: 'Tapas Mondal', village: 'Balagarh', district: 'Hooghly', state: 'West Bengal', acres: 1.5, answers: { fate: 'Stacked and left to rot or dump', window: '16–25 days', buyerPhone: 'No', barrier: 'Straw too wet to bale', pickup: 'Maybe', lang: 'Bangla', farmerNote: 'Always wet. Brokers laugh at 1.5 acres.' } },
  { id: 'f16', role: 'farmer', name: 'Pradip Sen', village: 'Ranaghat', district: 'Nadia', state: 'West Bengal', acres: 5, answers: { fate: 'Burned on a dry window', window: '10–15 days', buyerPhone: 'No', barrier: 'No buyer phone in the village', pickup: 'Yes', lang: 'Bangla', farmerNote: 'One dry week. We burned the jute-rice leftover. Compost plant is 9 km and we did not know.' } },
  { id: 'f17', role: 'farmer', name: 'Kamal Haldar', village: 'Krishnanagar rural', district: 'Nadia', state: 'West Bengal', acres: 3.5, answers: { fate: 'Mixed into household / municipal waste', window: '16–25 days', buyerPhone: 'No', barrier: 'Do not know compost / paper mill exists', pickup: 'Yes', lang: 'Voice in my language, not a PDF', farmerNote: 'SI told us not to dump. He did not tell us where the compost pad is.' } },
  { id: 'f18', role: 'farmer', name: 'Debashis Sarkar', village: 'Beldanga', district: 'Murshidabad', state: 'West Bengal', acres: 6, answers: { fate: 'Stacked and left to rot or dump', window: '16–25 days', buyerPhone: 'Only through a broker', barrier: 'Transport cost eats the gate price', pickup: 'Yes', lang: 'Bangla', farmerNote: 'Quote from Malda biochar was good. Freight killed it.' } },
  { id: 'f19', role: 'farmer', name: 'Biplab Banerjee', village: 'Kandi', district: 'Murshidabad', state: 'West Bengal', acres: 2.5, answers: { fate: 'Burned on a dry window', window: '10–15 days', buyerPhone: 'No', barrier: 'Straw too wet to bale', pickup: 'Maybe', lang: 'Hindi', farmerNote: 'We dry one day then it rains. Burning is the only dry-hour option.' } },
  { id: 'f20', role: 'farmer', name: 'Sanjay Mitra', village: 'Guptipara', district: 'Hooghly', state: 'West Bengal', acres: 4, answers: { fate: 'Sold / gifted to a plant or neighbour', window: '16–25 days', buyerPhone: 'Yes', barrier: 'I did sell', pickup: 'Yes', lang: 'Bangla', farmerNote: 'Delta Compost took 3 t. If pickup is on a list I can send the rest.' } },
  { id: 'f21', role: 'farmer', name: 'Arun Bhattacharya', village: 'Katwa', district: 'Burdwan', state: 'West Bengal', acres: 5, answers: { fate: 'Stacked and left to rot or dump', window: '16–25 days', buyerPhone: 'No', barrier: 'No buyer phone in the village', pickup: 'Yes', lang: 'Voice in my language, not a PDF', farmerNote: 'Give me Bangla voice, not a scheme PDF. I will list.' } },
  // 5 buyers — plant-floor, not MDs
  { id: 'b01', role: 'buyer', name: 'Rakesh Kumar', designation: 'Shift supervisor', village: 'GreenPower gate', district: 'Rajpura', state: 'Punjab', answers: { plant: 'Biomass', moisture: '≤15%', smallholders: 'Rarely', listingHelp: 'Only if baled', buyerNote: 'We need 500 t this fortnight. Brokers bring 20-acre lots. 2-acre farms never call the cabin.' } },
  { id: 'b02', role: 'buyer', name: 'Pooja Rani', designation: 'Weighbridge clerk', village: 'Punjab Paper Mills', district: 'Patiala', state: 'Punjab', answers: { plant: 'Paper', moisture: '≤15%', smallholders: 'Almost never', listingHelp: 'Yes', buyerNote: 'If moisture is on the slip before the truck leaves the village we stop arguing at 6 am.' } },
  { id: 'b03', role: 'buyer', name: 'Harbhajan Lal', designation: 'Plant manager (unit)', village: 'AgroFeed', district: 'Sangrur', state: 'Punjab', answers: { plant: 'Cattle feed', moisture: '≤12%', smallholders: 'Rarely', listingHelp: 'Yes', buyerNote: 'We took Simran’s 3.2 t. That should not be a one-off WhatsApp favour.' } },
  { id: 'b04', role: 'buyer', name: 'Sk. Rafiq', designation: 'Pad operator', village: 'Delta Compost', district: 'Nadia', state: 'West Bengal', answers: { plant: 'Compost / SWM', moisture: '≤18%', smallholders: 'Almost never', listingHelp: 'Yes', buyerNote: 'ULB pad is hungry. Villages dump mixed wet straw in the drain 9 km away. We cannot take mixed waste.' } },
  { id: 'b05', role: 'buyer', name: 'Mithun Dey', designation: 'Purchase assistant', village: 'Bengal Paper Works', district: 'Hooghly', state: 'West Bengal', answers: { plant: 'Paper', moisture: '≤18%', smallholders: 'Rarely', listingHelp: 'Only if baled', buyerNote: 'We will not be a dump. Spec first, then lift. A listing with moisture would let us send one trolley.' } },
  // 3 government — low rank, field posts
  { id: 'g01', role: 'government', name: 'Gurpreet Singh', designation: 'Agriculture Development Officer (ADO)', village: 'Block Ghanaur', district: 'Patiala', state: 'Punjab', answers: { rank: 'Agriculture Development Officer (ADO) / BAO', trackNow: 'Fires seen / complaints', gap: 'No utilised-vs-burned / dumped view', desk: 'Yes', govNote: 'I file fire spots. I cannot tell the DAO how many tonnes left the block to a plant.' } },
  { id: 'g02', role: 'government', name: 'Mousumi Das', designation: 'Assistant Agricultural Officer', village: 'Burdwan-I Block', district: 'Burdwan', state: 'West Bengal', answers: { rank: 'Assistant Agricultural Officer', trackNow: 'Almost nothing usable', gap: 'CRM machines exist but no matching desk', desk: 'If it stays at block level', govNote: 'One shared baler, Excel of names. I will not put KCC numbers on a portal. Aggregates only.' } },
  { id: 'g03', role: 'government', name: 'Ranjit Halder', designation: 'Sanitary Inspector (Grade II)', village: 'Krishnanagar Municipality', district: 'Nadia', state: 'West Bengal', answers: { rank: 'Sanitary Inspector (ULB / SWM)', trackNow: 'Farmer names and FIRs', gap: 'Compost plant is hungry; villages dump in drains', desk: 'Yes', govNote: 'SWM Rules ask me to process bio-waste. Farm straw never arrives as a lot. I only see mixed drain waste.' } },
]

export function questionsFor(role: SurveyRole) {
  return surveyQuestions.filter((q) => q.roles.includes(role) && q.id !== 'role')
}

export function tallyChoice(entries: SurveyEntry[], role: SurveyRole, questionId: string) {
  const rows = entries.filter((e) => e.role === role)
  const counts: Record<string, number> = {}
  for (const e of rows) {
    const v = e.answers[questionId]
    if (!v) continue
    counts[v] = (counts[v] ?? 0) + 1
  }
  const n = rows.filter((e) => e.answers[questionId]).length
  return Object.entries(counts)
    .map(([label, count]) => ({ label, count, pct: n ? Math.round((count / n) * 100) : 0 }))
    .sort((a, b) => b.count - a.count)
}

export const surveyMeta = {
  season: 'Kharif 2025 field pack (demonstration)',
  farmers: sampleSurvey.filter((e) => e.role === 'farmer').length,
  buyers: sampleSurvey.filter((e) => e.role === 'buyer').length,
  government: sampleSurvey.filter((e) => e.role === 'government').length,
  punjabFarmers: sampleSurvey.filter((e) => e.role === 'farmer' && e.state === 'Punjab').length,
  wbFarmers: sampleSurvey.filter((e) => e.role === 'farmer' && e.state === 'West Bengal').length,
  note: 'Names are fictional. Posts for officials are block / ULB grade (ADO, AAO, SI Grade II) — not secretariat. Pack is a method sample, not a census of Punjab or West Bengal.',
}
