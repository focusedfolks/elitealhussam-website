import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

export type CurrencyCode =
  | 'INR'
  | 'AED'
  | 'USD'
  | 'SAR'
  | 'GBP'
  | 'EUR'
  | 'CAD'
  | 'AUD'

export type Currency = {
  code: CurrencyCode
  name: string
  locale: string
}

export const CURRENCIES: Currency[] = [
  { code: 'INR', name: 'Indian Rupee', locale: 'en-IN' },
  { code: 'AED', name: 'UAE Dirham', locale: 'en-AE' },
  { code: 'USD', name: 'US Dollar', locale: 'en-US' },
  { code: 'SAR', name: 'Saudi Riyal', locale: 'en-SA' },
  { code: 'GBP', name: 'British Pound', locale: 'en-GB' },
  { code: 'EUR', name: 'Euro', locale: 'en-IE' },
  { code: 'CAD', name: 'Canadian Dollar', locale: 'en-CA' },
  { code: 'AUD', name: 'Australian Dollar', locale: 'en-AU' },
]

const currencyMap = Object.fromEntries(
  CURRENCIES.map((currency) => [currency.code, currency]),
) as Record<CurrencyCode, Currency>

type CurrencyContextValue = {
  currency: CurrencyCode
  setCurrency: (currency: CurrencyCode) => void
  selectedCurrency: Currency
  loading: boolean
  error: boolean
  convertFromInr: (amount: number) => number
  formatPrice: (amount: number) => string
}

const CurrencyContext = createContext<CurrencyContextValue | null>(null)

const STORAGE_KEY = 'elite-alhussam-currency'

function readStoredCurrency(): CurrencyCode {
  if (typeof window === 'undefined') return 'INR'
  const stored = window.localStorage.getItem(STORAGE_KEY)
  if (stored && stored in currencyMap) return stored as CurrencyCode
  return 'INR'
}

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<CurrencyCode>(readStoredCurrency)
  const [rates, setRates] = useState<Record<CurrencyCode, number>>({
    INR: 1,
  } as Record<CurrencyCode, number>)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, currency)
  }, [currency])

  useEffect(() => {
    if (currency === 'INR') {
      setLoading(false)
      setError(false)
      setRates((prev) => ({ ...prev, INR: 1 }))
      return
    }

    if (rates[currency]) {
      setLoading(false)
      setError(false)
      return
    }

    let cancelled = false

    async function loadRate() {
      try {
        setLoading(true)
        setError(false)
        const response = await fetch(
          `https://api.frankfurter.dev/v2/rate/INR/${currency}`,
        )

        if (!response.ok) {
          throw new Error('Unable to load exchange rate')
        }

        const data = await response.json()
        const rate = Number(data.rate)

        if (!cancelled && Number.isFinite(rate) && rate > 0) {
          setRates((prev) => ({ ...prev, [currency]: rate }))
        } else if (!cancelled) {
          throw new Error('Invalid exchange rate')
        }
      } catch {
        if (!cancelled) setError(true)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    loadRate()

    return () => {
      cancelled = true
    }
  }, [currency])

  const value = useMemo<CurrencyContextValue>(() => {
    const selectedCurrency = currencyMap[currency]
    const hasRate = currency === 'INR' || Boolean(rates[currency])
    const rate = currency === 'INR' ? 1 : (rates[currency] ?? 1)
    const displayCode = hasRate ? currency : 'INR'
    const displayInfo = currencyMap[displayCode]

    return {
      currency,
      setCurrency,
      selectedCurrency,
      loading,
      error,
      convertFromInr: (amount: number) => (hasRate ? amount * rate : amount),
      formatPrice: (amount: number) =>
        new Intl.NumberFormat(displayInfo.locale, {
          style: 'currency',
          currency: displayCode,
          maximumFractionDigits: 0,
        }).format(amount),
    }
  }, [currency, error, loading, rates])

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  const context = useContext(CurrencyContext)
  if (!context) {
    throw new Error('useCurrency must be used within CurrencyProvider')
  }
  return context
}
