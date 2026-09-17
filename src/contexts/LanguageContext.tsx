import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { Lang } from '../types/index'
import { t as translate } from '../i18n/translations'

interface LanguageContextValue {
  lang: Lang
  setLang: (l: Lang) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextValue | null>(null)
const STORAGE = 'agrinova_lang'

function readLang(): Lang {
  try {
    const v = localStorage.getItem(STORAGE)
    if (v === 'hi' || v === 'bn' || v === 'en' || v === 'pa') return v
  } catch {
    /* ignore */
  }
  return 'en'
}

const HTML_LANG: Record<Lang, string> = { en: 'en', hi: 'hi', bn: 'bn', pa: 'pa' }

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(readLang)

  function setLang(l: Lang) {
    setLangState(l)
    try {
      localStorage.setItem(STORAGE, l)
    } catch {
      /* ignore */
    }
  }

  useEffect(() => {
    document.documentElement.lang = HTML_LANG[lang]
  }, [lang])

  return (
    <LanguageContext.Provider value={{ lang, setLang, t: (key) => translate(lang, key) }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage must be used within LanguageProvider')
  return ctx
}

export const SPEECH_LOCALE: Record<Lang, string> = {
  en: 'en-IN',
  hi: 'hi-IN',
  bn: 'bn-IN',
  pa: 'pa-IN',
}
