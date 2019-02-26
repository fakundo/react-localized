import isFunction from 'lodash/isFunction'
import { config } from './config'

const { Component } = config
const DEFAULT_LOCALE = 'en'

export default class LocalizedProvider extends Component {
  static defaultProps = {
    locales: {},
    locale: DEFAULT_LOCALE,
    children: () => null,
  }

  static childContextTypes = {
    i18n: () => {}
  }

  state = {
    currentLocale: null,
    currentLocaleData: null,
  }

  getChildContext() {
    const { currentLocale, currentLocaleData } = this.state
    return {
      i18n: {
        locale: currentLocale,
        localeData: currentLocaleData,
      }
    }
  }

  componentDidMount() {
    this.updateLocaleData(this.props, this.state)
  }

  componentWillReceiveProps(nextProps, nextState) {
    const { locale, locales } = this.props
    const { locale: nextLocale, locales: nextLocales } = nextProps
    if (nextLocale !== locale || nextLocales !== locales) {
      this.updateLocaleData(nextProps, nextState)
    }
  }

  getLocaleFromProps(props) {
    const { locales, locale } = props
    return locales[locale] ? locale : DEFAULT_LOCALE
  }

  async updateLocaleData(props, state) {
    const { locales } = props
    const locale = this.getLocaleFromProps(props)

    if (locale !== state.currentLocale) {
      let currentLocaleData = locales[locale]

      if (typeof currentLocaleData !== 'function') {
        this.setState({
          currentLocale: locale,
          currentLocaleData
        })
      } else {
        currentLocaleData = await currentLocaleData()
        if (locale === this.getLocaleFromProps(this.props)) {
          this.setState({
            currentLocale: locale,
            currentLocaleData
          })
        }
      }
    }
  }

  render() {
    const { children } = this.props
    const { currentLocale } = this.state
    const data = { locale: currentLocale }
    return isFunction(children) ? children(data) : children[0](data)
  }
}
