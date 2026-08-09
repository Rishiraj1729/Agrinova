import type { Lang } from '../types/index'

type Dict = Record<string, string>

const en: Dict = {
  'app.name': 'Agrinova',
  'app.tagline': 'Predict. Protect. Prosper. Recycle.',
  'app.credit': 'Made by Shikha Sharma • NCSE',
  'nav.home': 'Home',
  'nav.farmer': 'Farmer',
  'nav.business': 'Business',
  'nav.research': 'Research',
  'nav.science': 'Science',
  'nav.presentation': 'Presentation',
  'nav.demo': 'Start Demo',
  'hero.title': 'AI-Powered Agricultural Intelligence',
  'hero.subtitle': 'Predict weather risks, optimize crops, connect residue to buyers, and measure environmental impact.',
  'hero.cta': 'Begin Judge Demo',
  'disclaimer.demo': 'Fictional demo data — not real national statistics',
  'disclaimer.carbon': 'Project-level estimate; not a certified carbon credit.',
  'disclaimer.prediction': 'Estimated risk — not a guarantee. See confidence & data context.',
  'farmer.dashboard': 'Farmer Dashboard',
  'farmer.weather': 'Weather Intelligence',
  'farmer.crop': 'Crop Intelligence',
  'farmer.risk': 'Risk & Warnings',
  'farmer.market': 'Market Intelligence',
  'farmer.income': 'Income Simulator',
  'farmer.residue': 'Residue Marketplace',
  'farmer.buyers': 'Buyer Matching',
  'farmer.logistics': 'Logistics',
  'farmer.carbon': 'Carbon Impact',
  'farmer.ai': 'AI Assistant',
  'confidence': 'Confidence',
  'lastUpdated': 'Last updated',
  'estimated': 'Estimated',
  'voice.try': 'Try voice: "मेरे पास तीन टन धान का भूसा है"',
}

const hi: Dict = {
  ...en,
  'app.tagline': 'भविष्यवाणी। सुरक्षा। समृद्धि। पुनर्चक्रण।',
  'nav.home': 'होम',
  'nav.farmer': 'किसान',
  'nav.business': 'व्यवसाय',
  'nav.research': 'अनुसंधान',
  'nav.science': 'विज्ञान',
  'nav.presentation': 'प्रस्तुति',
  'nav.demo': 'डेमो शुरू करें',
  'hero.title': 'एआई-संचालित कृषि बुद्धिमत्ता',
  'hero.subtitle': 'मौसम जोखिम की भविष्यवाणी, फसल अनुकूलन, अवशेष खरीदारों से जोड़ना, और पर्यावरणीय प्रभाव मापना।',
  'hero.cta': 'जज डेमो शुरू करें',
  'disclaimer.demo': 'काल्पनिक डेमो डेटा — वास्तविक राष्ट्रीय आंकड़े नहीं',
  'disclaimer.carbon': 'परियोजना-स्तरीय अनुमान; प्रमाणित कार्बन क्रेडिट नहीं।',
  'farmer.dashboard': 'किसान डैशबोर्ड',
  'farmer.weather': 'मौसम बुद्धिमत्ता',
  'farmer.crop': 'फसल बुद्धिमत्ता',
  'farmer.risk': 'जोखिम और चेतावनी',
  'farmer.market': 'बाजार बुद्धिमत्ता',
  'farmer.income': 'आय सिम्युलेटर',
  'farmer.residue': 'अवशेष बाज़ार',
  'farmer.carbon': 'कार्बन प्रभाव',
  'farmer.ai': 'एआई सहायक',
}

const bn: Dict = {
  ...en,
  'app.tagline': 'ভবিষ্যদ্বাণী। সুরক্ষা। সমৃদ্ধি। পুনর্ব্যবহার।',
  'nav.home': 'হোম',
  'nav.farmer': 'কৃষক',
  'nav.business': 'ব্যবসা',
  'nav.research': 'গবেষণা',
  'nav.science': 'বিজ্ঞান',
  'nav.presentation': 'উপস্থাপনা',
  'nav.demo': 'ডেমো শুরু',
  'hero.title': 'এআই-চালিত কৃষি বুদ্ধিমত্তা',
  'hero.subtitle': 'আবহাওয়া ঝুঁকি পূর্বাভাস, ফসল অপ্টিমাইজেশন, অবশেষ ক্রেতাদের সাথে সংযোগ।',
  'hero.cta': 'জাজ ডেমো শুরু',
  'disclaimer.demo': 'কাল্পনিক ডেমো ডেটা — প্রকৃত জাতীয় পরিসংখ্যান নয়',
  'farmer.dashboard': 'কৃষক ড্যাশবোর্ড',
  'farmer.weather': 'আবহাওয়া বুদ্ধিমত্তা',
  'farmer.crop': 'ফসল বুদ্ধিমত্তা',
  'farmer.carbon': 'কার্বন প্রভাব',
}

const translations: Record<Lang, Dict> = { en, hi, bn }

export function t(lang: Lang, key: string): string {
  return translations[lang][key] ?? translations.en[key] ?? key
}
