import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { en } from './locales/en'
import { gu } from './locales/gu'
import { hi } from './locales/hi'
import { ur } from './locales/ur'
import type { Dictionary, Lang } from './types'

const dictionaries: Record<Lang, Dictionary> = { en, hi, gu, ur }

const LANG_KEY = 'alhussam-lang'

type I18nValue = {
  lang: Lang
  t: Dictionary
  setLang: (lang: Lang) => void
  languages: { code: Lang; label: string }[]
}

const I18nContext = createContext<I18nValue | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = localStorage.getItem(LANG_KEY) as Lang | null
    return saved && dictionaries[saved] ? saved : 'en'
  })

  const setLang = useCallback((next: Lang) => {
    setLangState(next)
    localStorage.setItem(LANG_KEY, next)
  }, [])

  const t = dictionaries[lang]

  useEffect(() => {
    document.documentElement.lang = lang
    document.documentElement.dir = t.dir
    document.title = t.metaTitle
  }, [lang, t.dir, t.metaTitle])

  const value = useMemo(
    () => ({
      lang,
      t,
      setLang,
      languages: [
        { code: 'en' as const, label: 'English' },
        { code: 'hi' as const, label: 'हिन्दी' },
        { code: 'gu' as const, label: 'ગુજરાતી' },
        { code: 'ur' as const, label: 'اردو' },
      ],
    }),
    [lang, t, setLang],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n must be used within I18nProvider')
  return ctx
}
