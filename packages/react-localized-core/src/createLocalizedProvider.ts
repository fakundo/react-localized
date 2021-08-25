/* eslint-disable no-new-func */
import { LocaleDataMessages, LocaleData, GettextFunctions, GetPluralForm, Alias, AliasObject, CreateLocalizedProviderOptions, LocalizedProviderProps, LocalizedContextValue, LocalizedProviderState } from './types'
import createLocale from './createLocale'

const PLURAL_HEADER = 'plural-forms'
const DEFAULT_LOCALE = 'en'
const DEFAULT_LOCALE_DATA = createLocale()
const EXPRESSION_REPLACER = '${}'
const EXPRESSION_REPLACER_REGEXP = new RegExp('\\${}', 'g')

const createGetPluralForm = (messages?: LocaleDataMessages): GetPluralForm => {
  const headers = messages?.headers || {}

  const headerKey = Object
    .keys(headers)
    .find((h) => h.toLowerCase() === PLURAL_HEADER)

  const header = headerKey && headers[headerKey]

  return header
    ? new Function('n', 'nplurals', 'plural', `${header} return ~~plural;`) as GetPluralForm
    : (n) => (n === 1 ? 0 : 1)
}

const createMsgid = (template: string[]): string => (
  template.join(EXPRESSION_REPLACER)
)

const injectValues = (str: string, values: any[]): string => {
  let i = 0
  return str.replace(EXPRESSION_REPLACER_REGEXP, () => (
    values[i++]
  ))
}

const normalizeAlias = (alias: Alias): AliasObject => (
  typeof alias === 'string'
    ? { [GettextFunctions.GETTEXT]: alias }
    : alias || {}
)

const createProviderValue = (
  locale: string,
  localeData: LocaleData,
  derivedAlias?: Alias,
): LocalizedContextValue => {
  const { messages, extra } = localeData
  const getDefaultPluralForm = createGetPluralForm()
  const getPluralForm = createGetPluralForm(messages)

  const getMessage = (ctx = '', msgid, plural = 0) => (
    messages?.translations?.[ctx]?.[msgid]?.msgstr?.[plural] || ''
  )

  const translate = (ctx?) => (text, ...values) => {
    // string template
    if (Array.isArray(text)) {
      const msgid = createMsgid(text)
      const message = getMessage(ctx, msgid) || msgid
      return injectValues(message, values)
    }
    // simple string
    return getMessage(ctx, text) || text
  }

  const translatePlural = (ctx?) => (text, ...values) => (textPlural, ...pluralValues) => (n) => {
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

  const value: LocalizedContextValue = {
    ...extra,
    locale,
    [GettextFunctions.GETTEXT]: translate(),
    [GettextFunctions.PGETTEXT]: (ctx, text?) => (
      !text
        ? translate(ctx)
        : translate(ctx)(text)
    ),
    [GettextFunctions.NGETTEXT]: (text, ...args) => (
      Array.isArray(text)
        ? translatePlural()(text, ...args)
        : translatePlural()(text)(args[0])(args[1])
    ),
    [GettextFunctions.NPGETTEXT]: (ctx, text?, textPlural?, n?) => (
      !text
        ? translatePlural(ctx)
        : translatePlural(ctx)(text)(textPlural)(n)
    ),
  }

  if (derivedAlias) {
    const alias = normalizeAlias(derivedAlias)
    Object.values(GettextFunctions).forEach((funcName) => {
      if (alias[funcName]) {
        value[alias[funcName] as string] = value[funcName]
      }
    })
  }

  return value
}

export default (
  options: CreateLocalizedProviderOptions,
) => (
  props: LocalizedProviderProps,
  ) => {
    const {
      localizedContext,
      createElement,
      useEffect,
      useState,
      useMemo,
    } = options

    const {
      children,
      alias,
      locales = {},
      selected = DEFAULT_LOCALE,
    } = props

    const [localeDataCache, setLocaleDataCache] = useState(null)
    const locale = locales[selected] ? selected : DEFAULT_LOCALE
    const localeData = locales[locale] || DEFAULT_LOCALE_DATA
    const useCache = typeof localeData === 'function'

    useEffect(async () => {
      let ignore
      if (typeof localeData === 'function') {
        const data = await localeData()
        if (!ignore) {
          setLocaleDataCache(data)
        }
      }
      return () => {
        ignore = true
      }
    }, [localeData])

    const finalLocaleData = useCache
      ? localeDataCache || DEFAULT_LOCALE_DATA
      : localeData

    const localeReady = useCache
      ? !!localeDataCache
      : !!localeData

    const providerProps = useMemo(() => ({
      value: createProviderValue(locale, finalLocaleData, alias),
    }), [finalLocaleData, alias])

    const childrenValue: LocalizedProviderState = useMemo(() => ({
      localeReady,
    }), [localeReady])

    return createElement(
      localizedContext.Provider,
      providerProps,
      children(childrenValue),
    )
  }
