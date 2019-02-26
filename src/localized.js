import isArray from 'lodash/isArray'
import memoize from 'lodash/memoize'
import { config } from './config'

const { Component, createElement } = config

const memoizedPluralForm = memoize((locale, localeData) => {
  const { messages } = localeData

  if (messages) {
    // eslint-disable-next-line
    return Function(
      'n',
      'nplurals',
      'plural',
      `${messages[''].plural_forms} return plural;`
    )
  }

  return n => (n === 1 ? 0 : 1)
})

export default WrappedComponent => (
  class LocalizedComponent extends Component {
    static contextTypes = {
      i18n: () => {}
    }

    getPluralForm(n) {
      const locale = this.getLocale()
      const localeData = this.getLocaleData()
      return memoizedPluralForm(locale, localeData)(n)
    }

    getMessage(message, context) {
      const { messages } = this.getLocaleData()

      if (messages) {
        const messageId = context ? `${context}\u0004${message}` : message
        return messages[messageId] || null
      }

      return null
    }

    getLocale() {
      const { i18n: { locale } } = this.context
      return locale
    }

    getLocaleData() {
      const { i18n: { localeData } } = this.context
      return localeData || {}
    }

    gettext = (...args) => {
      return this.pgettext(null, ...args)
    }

    pgettext = (context, input, ...injections) => {
      const message = this.getMessage(input, context)
      let output

      if (message) {
        output = isArray(message) ? message[0] : message
      } else {
        output = input
      }

      return this.replaceInjections(output, injections)
    }

    ngettext = (...args) => {
      return this.npgettext(null, ...args)
    }

    npgettext = (context, singular, plural, n, ...injections) => {
      const message = this.getMessage(singular, context)
      let output

      if (message) {
        output = message[this.getPluralForm(n)]
      } else {
        output = [singular, plural][this.getPluralForm(n)]
      }

      return this.replaceInjections(output, injections)
    }

    replaceInjections(input, injections) {
      return input.replace(/{([0-9])}/g, (match, index) => (
        injections[index]
      ))
    }

    render() {
      const { localizedInnerRef, ...rest } = this.props
      const locale = this.getLocale()
      const localeData = this.getLocaleData()
      return createElement(WrappedComponent, {
        ...rest,
        ...localeData.extra,
        locale,
        gettext: this.gettext,
        ngettext: this.ngettext,
        pgettext: this.pgettext,
        npgettext: this.npgettext,
        ref: localizedInnerRef
      })
    }
  }
)
