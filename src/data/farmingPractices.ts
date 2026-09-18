/** Practices farmers can learn via Kisan AI — demo education pack */

export interface FarmingPractice {
  id: string
  title: string
  hindi: string
  category: 'residue' | 'sowing' | 'soil' | 'water' | 'income'
  summary: string
  benefits: string[]
  askPrompt: string
}

export const farmingPractices: FarmingPractice[] = [
  {
    id: 'happy-seeder',
    title: 'Happy Seeder / zero-till wheat',
    hindi: 'हैप्पी सीडर',
    category: 'sowing',
    summary: 'Sow wheat into standing rice residue without burning. Saves time between harvest and sowing.',
    benefits: ['Avoids residue burn fines', 'Keeps soil cover', 'Often lower diesel than full tillage'],
    askPrompt: 'Explain Happy Seeder for my Punjab rice–wheat farm: when to use, moisture, and cost vs burning.',
  },
  {
    id: 'dsr',
    title: 'Direct Seeded Rice (DSR)',
    hindi: 'डीएसआर धान',
    category: 'water',
    summary: 'Rice without puddling transplant. Cuts labour and can save irrigation water when timed well.',
    benefits: ['Lower transplant labour', 'Water saving potential', 'Earlier harvest window'],
    askPrompt: 'Teach me Direct Seeded Rice for Punjab: weed control, herbicide timing, and yield risk.',
  },
  {
    id: 'residue-bale',
    title: 'Bale & sell residue',
    hindi: 'पराली बेचना',
    category: 'residue',
    summary: 'Bale dry straw (≤15% moisture) and sell via AgriNova instead of burning.',
    benefits: ['Cash income ₹/t', 'Carbon credits', 'Buyer plant feedstock'],
    askPrompt: 'How do I bale rice straw for sale: moisture target, baler hire, and AgriNova listing steps?',
  },
  {
    id: 'biochar',
    title: 'On-farm biochar pathway',
    hindi: 'बायोचार',
    category: 'soil',
    summary: 'Convert part of residue to biochar for soil carbon — slower cash than biomass sale.',
    benefits: ['Soil organic carbon', 'MRV-friendly story', 'Partial residue use'],
    askPrompt: 'When should a small farmer prefer biochar vs selling straw to a biomass plant?',
  },
  {
    id: 'cover-mulch',
    title: 'Surface mulch & incorporation',
    hindi: 'मल्च / मिट्टी में मिलाना',
    category: 'soil',
    summary: 'Leave chopped residue as mulch or incorporate lightly where buyers are far.',
    benefits: ['Moisture retention', 'Less wind erosion', 'No transport cost'],
    askPrompt: 'Compare mulching vs selling straw for a 4-acre farm 40 km from the nearest plant.',
  },
  {
    id: 'intercrop',
    title: 'Pulse intercrop / diversification',
    hindi: 'दलहन अंतरफसल',
    category: 'income',
    summary: 'Add short-duration pulses or oilseeds where water and market allow.',
    benefits: ['Nitrogen fix', 'Extra income stream', 'Policy support schemes'],
    askPrompt: 'Suggest a simple diversification plan after rice for Madhyamgram with limited irrigation.',
  },
]
