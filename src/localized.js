import { Component, createElement } from 'react'
import PropTypes from 'prop-types'
import isArray from 'lodash/isArray'
import memoize from 'lodash/memoize'

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

export const propTypes = {
  locale: PropTypes.string,
  gettext: PropTypes.func,
  ngettext: PropTypes.func,
  pgettext: PropTypes.func,
  npgettext: PropTypes.func,
  i18n: PropTypes.object,
  localizedRef: PropTypes.func,
}

export default WrappedComponent =>
  class LocalizedComponent extends Component {
    static propTypes = {
      localizedRef: PropTypes.func
    }

    static contextTypes = {
      i18n: PropTypes.object.isRequired
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
      const { locale } = this.context.i18n
      return locale
    }

    getLocaleData() {
      const { localeData } = this.context.i18n
      return localeData || {}
    }

    gettext = (...args) => {
      return this.pgettext(undefined, ...args)
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

    replaceInjections(input, injections) {
      return input.replace(/{([0-9])}/g, (match, index) => injections[index])
    }

    ngettext = (...args) => {
      return this.npgettext(undefined, ...args)
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

    render() {
      const { localizedRef } = this.props
      const locale = this.getLocale()
      const localeData = this.getLocaleData()
      return createElement(WrappedComponent, {
        ...this.props,
        locale,
        gettext: this.gettext,
        ngettext: this.ngettext,
        pgettext: this.pgettext,
        npgettext: this.npgettext,
        i18n: localeData.additions,
        ref: localizedRef
      })
    }
  }
