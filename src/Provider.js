import { Component, Children } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const DEFAULT_LOCALE = 'en'
const mapStateToProps = ({ locale }) => ({ locale })

@connect(mapStateToProps)
export default class LocaleProvider extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired, // eslint-disable-line
    children: PropTypes.any.isRequired,
    localeData: PropTypes.object // eslint-disable-line
  }

  static defaultProps = {
    localeData: {}
  }

  static childContextTypes = {
    i18n: PropTypes.object.isRequired
  }

  state = {
    currentLocale: undefined,
    currentLocaleData: undefined
  }

  getChildContext() {
    const { currentLocale, currentLocaleData } = this.state
    return {
      i18n: {
        locale: currentLocale,
        localeData: currentLocaleData
      }
    }
  }

  componentWillMount() {
    this.updateLocaleData(this.props, this.state)
  }

  componentWillReceiveProps(nextProps, nextState) {
    this.updateLocaleData(nextProps, nextState)
  }

  getLocaleFromProps(props) {
    const { localeData, locale } = props
    return localeData[locale] ? locale : DEFAULT_LOCALE
  }

  async updateLocaleData(props, state) {
    const { localeData } = props
    const locale = this.getLocaleFromProps(props)

    if (locale !== state.currentLocale) {
      let currentLocaleData = localeData[locale]

      if (typeof currentLocaleData !== 'function') {
        this.setState({
          currentLocale: locale,
          currentLocaleData
        })
      } else {
        currentLocaleData = await currentLocaleData()
        if (this.getLocaleFromProps(this.props) === locale) {
          this.setState({
            currentLocale: locale,
            currentLocaleData
          })
        }
      }
    }
  }

  render() {
    const { currentLocale } = this.state

    if (!currentLocale) {
      return null
    }

    return Children.only(this.props.children)
  }
}
