/** @jsx h */
import { h, Component } from 'preact'
import map from 'lodash/map'

import locales from './locales'
import { localized, LocalizedProvider } from '../src'

const Text = ({ gettext, ngettext, formats, formatDate }) => (
  <div>
    { gettext('Hello, world!') }
    <br />
    { gettext('My name is {0}', 'John') }
    <br />
    { gettext('My name is {0}', 'Anna') }
    <br />
    { ngettext('{0} apple', '{0} apples', 1, 1) }
    <br />
    { ngettext('{0} apple', '{0} apples', 2, 2) }
    <br />
    { ngettext('{0} apple', '{0} apples', 10, 10) }
    <br />
    { formatDate(new Date(), formats.humanizedDate) }
  </div>
)

const LocalizedText = localized(Text)

const Switch = ({ locale, locales: localesList, onChange }) => (
  <select value={locale} onChange={onChange}>
    { map(localesList, (l, key) => (
      <option key={key} value={key}>{key}</option>
    )) }
  </select>
)

export default class extends Component {
  state = {
    locale: 'en'
  }

  handleLocaleChange = (ev) => {
    const { value } = ev.target
    this.setState({ locale: value })
  }

  render() {
    const { locale } = this.state
    return (
      <LocalizedProvider locales={locales} locale={locale}>
        { ({ locale: currentLocale }) => currentLocale === locale && (
          <div>
            <Switch
              locale={currentLocale}
              locales={locales}
              onChange={this.handleLocaleChange}
            />
            <LocalizedText />
          </div>
        ) }
      </LocalizedProvider>
    )
  }
}
