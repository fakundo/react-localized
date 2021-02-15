import createLocale from './createLocale'

const PLURAL_FORMS_HEADER = 'plural-forms'
const DEFAULT_LOCALE = 'en'
const DEFAULT_LOCALE_DATA = createLocale()

const createGetPluralForm = (messages) => {
  const { headers = {} } = messages || {}

  const headerKey = Object.keys(headers).find((h) => (
    h.toLowerCase() === PLURAL_FORMS_HEADER
  ))

  const header = headers[headerKey]

  if (!header) {
    return (n) => (n === 1 ? 0 : 1)
  }

  return Function( // eslint-disable-line
    'n',
    'nplurals',
    'plural',
    `${header} return ~~plural;`,
  )
}

const replaceInjections = (input, injections) => {
  let index = 0
  return input.replace(/%s/g, () => injections[index++])
}

const createProps = (locale, localeData) => {
  const { messages, extraProps } = localeData

  const getDefaultPluralForm = createGetPluralForm()
  const getPluralForm = createGetPluralForm(messages)

  const getTranslations = (context, text) => {
    const { translations = {} } = messages
    const t = translations[context]
    return ((t && t[text]) || {}).msgstr || []
  }

  const pgettext = (context, text, ...injections) => {
    const translations = getTranslations(context, text)
    const output = translations[0] || text
    return replaceInjections(output, injections)
  }

  const npgettext = (context, singular, plural, n, ...injections) => {
    const translations = getTranslations(context, singular)
    const output = translations[getPluralForm(n)]
      || [singular, plural][getDefaultPluralForm(n)]
      || singular
    return replaceInjections(output, injections)
  }

  const gettext = (...args) => pgettext('', ...args)
  const ngettext = (...args) => npgettext('', ...args)

  return { value: { ...extraProps, gettext, ngettext, pgettext, npgettext, locale } }
}

export default ({ LocalizedContext, createElement, useEffect, useState, useMemo }) => (
  ({ locales = {}, selected = DEFAULT_LOCALE, children = () => {} }) => {
    const [localeDataCache, setLocaleDataCache] = useState(null)
    const locale = locales[selected] ? selected : DEFAULT_LOCALE
    const localeData = locales[locale] || DEFAULT_LOCALE_DATA
    const useCache = typeof localeData === 'function'

    useEffect(() => {
      let ignore = false
      if (useCache) {
        (async () => {
          const nextLocaleDataCache = await localeData()
          if (!ignore) setLocaleDataCache(() => nextLocaleDataCache)
        })()
      }
      return () => { ignore = true }
    }, [locales, selected])

    const finalLocaleData = useCache ? (localeDataCache || DEFAULT_LOCALE_DATA) : localeData
    const localeReady = !!(useCache ? localeDataCache : localeData)
    const props = useMemo(() => createProps(locale, finalLocaleData), [finalLocaleData])

    return createElement(LocalizedContext.Provider, props, children({ localeReady }))
  }
)
