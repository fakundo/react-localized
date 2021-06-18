/* eslint-disable no-new-func */
import createLocale from './createLocale'

const GETTEXT = 'gettext'
const PGETTEXT = 'pgettext'
const NGETTEXT = 'ngettext'
const NPGETTEXT = 'npgettext'
const PLURAL_HEADER = 'plural-forms'
const DEFAULT_LOCALE = 'en'
const DEFAULT_LOCALE_DATA = createLocale()
const EXPRESSION_REPLACER = '${}'
const EXPRESSION_REPLACER_REGEXP = new RegExp('\\${}', 'g')

const createGetPluralForm = (messages) => {
  const { headers = {} } = messages || {}

  const headerKey = Object
    .keys(headers)
    .find((h) => h.toLowerCase() === PLURAL_HEADER)

  const header = headers[headerKey]

  return header
    ? new Function('n', 'nplurals', 'plural', `${header} return ~~plural;`)
    : (n) => (n === 1 ? 0 : 1)
}

const createMsgid = (template) => (
  template.join(EXPRESSION_REPLACER)
)

const injectValues = (str, values) => {
  let i = 0
  return str.replace(EXPRESSION_REPLACER_REGEXP, () => (
    values[i++] || ''
  ))
}

const normalizeAlias = (derivedAlias) => (
  typeof derivedAlias === 'string'
    ? { [GETTEXT]: derivedAlias }
    : derivedAlias || {}
)

const createProviderValue = (locale, localeData, derivedAlias) => {
  const { messages, extra } = localeData
  const getDefaultPluralForm = createGetPluralForm()
  const getPluralForm = createGetPluralForm(messages)

  const getMessage = (ctx = '', msgid, plural = 0) => (
    messages?.translations?.[ctx]?.[msgid]?.msgstr?.[plural] || ''
  )

  const translate = (ctx) => (text, ...values) => {
    // string template
    if (Array.isArray(text)) {
      const msgid = createMsgid(text)
      const message = getMessage(ctx, msgid) || msgid
      return injectValues(message, values)
    }
    // simple string
    return getMessage(ctx, text) || text
  }

  const translatePlural = (ctx) => (text, ...values) => (textPlural, ...pluralValues) => (n) => {
    // string template
    if (Array.isArray(text)) {
      const msgid = createMsgid(text)
      let form = getPluralForm(n)
      let message = getMessage(ctx, msgid, form)
      // found translation message
      if (message) {
        const vals = !form ? values : pluralValues
        return injectValues(message, vals)
      }
      // default translation message
      form = getDefaultPluralForm(n)
      message = [msgid, createMsgid(textPlural)][form]
      const vals = [values, pluralValues][form]
      return injectValues(message, vals)
    }
    // simple string
    return getMessage(ctx, text, getPluralForm(n))
      || [text, textPlural][getDefaultPluralForm(n)]
  }

  const value = {
    ...extra,
    locale,
    [GETTEXT]: translate(),
    [PGETTEXT]: (ctx, text) => (
      !text
        ? translate(ctx)
        : translate(ctx)(text)
    ),
    [NGETTEXT]: (text, ...args) => (
      Array.isArray(text)
        ? translatePlural()(text, ...args)
        : translatePlural()(text)(args[0])(args[1])
    ),
    [NPGETTEXT]: (ctx, text, textPlural, n) => (
      !text
        ? translatePlural(ctx)
        : translatePlural(ctx)(text)(textPlural)(n)
    ),
  }

  if (derivedAlias) {
    const alias = normalizeAlias(derivedAlias)
    const functions = [GETTEXT, PGETTEXT, NGETTEXT, NPGETTEXT]

    functions.forEach((func) => {
      if (alias[func]) {
        value[alias[func]] = value[func]
      }
    })
  }

  return value
}

export default ({
  LocalizedContext,
  createElement,
  useEffect,
  useState,
  useMemo,
}) => (
  ({
    selected = DEFAULT_LOCALE,
    locales = {},
    children,
    alias,
  }) => {
    const [localeDataCache, setLocaleDataCache] = useState(null)
    const locale = locales[selected] ? selected : DEFAULT_LOCALE
    const localeData = locales[locale] || DEFAULT_LOCALE_DATA
    const useCache = typeof localeData === 'function'

    useEffect(async () => {
      let ignore
      if (useCache) {
        const data = await localeData()
        if (!ignore) {
          setLocaleDataCache(data)
        }
      }
      return () => {
        ignore = true
      }
    }, [useCache, localeData])

    const finalLocaleData = useCache
      ? localeDataCache || DEFAULT_LOCALE_DATA
      : localeData

    const localeReady = useCache
      ? !!localeDataCache
      : !!localeData

    const providerProps = useMemo(() => ({
      value: createProviderValue(locale, finalLocaleData, alias),
    }), [finalLocaleData, alias])

    const childrenValue = useMemo(() => ({
      localeReady,
    }), [localeReady])

    return createElement(
      LocalizedContext.Provider,
      providerProps,
      children(childrenValue),
    )
  }
)
