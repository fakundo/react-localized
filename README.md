# react-localized

[![npm](https://img.shields.io/npm/v/react-localized.svg)](https://www.npmjs.com/package/react-localized)

Internationalization for React and Preact components.

Features:
- based on `gettext` format. This means that: 
  - plural forms are supported
  - translations can be edited by cool editors (for example Poedit)
  - translation files in `.po` format used by this library can be generated automatically by parsing source code

- allows you to extend locale data (for example by adding date formats, currencies, etc.)
- allows you to separate locale data from the main bundle by using webpack dynamic imports

## Installation

```
yarn add react-localized
```

## Usage

#### 1. Add webpack loader for .po files

```javascript
module: {
  rules: [
    {
      test: /\.po$/,
      use: 'react-localized/messages-loader'
    }
  ]
}
```

#### 2. Select React or Preact somewhere in root of your app

```javascript
import 'preact-localized/useReact'
```

```javascript
import 'preact-localized/usePreact'
```

#### 3. Create locales

Use Poedit to create and edit `.po` files. It also can parse your source code.

```javascript
import { createLocale } from 'react-localized'
import messages from 'messages/ru.po'

export default createLocale(messages)
```
#### Example of locale with extra data

Extra data will spread to localized components as props.

```javascript
import { createLocale } from 'react-localized'
import messages from 'messages/ru.po'

import format from 'date-fns/format'
import dateLocale from 'date-fns/locale/ru'

const extra = {
  formats: {
    time: 'HH:mm',
    date: 'DD.MM.YYYY',
    dateTime: 'DD.MM.YYYY HH:mm',
    humanizedDate: 'DD MMMM YYYY',
  },
  formatDate: (date, formatStr) => (
    format(date, formatStr, { locale: dateLocale })
  )
}

export default createLocale(messages, extra)
```

#### 4. Render LocalizedProvider

```javascript
import { LocalizedProvider } from 'react-localized'
import frenchLocale from 'locales/fr'
import deutschLocale from 'locales/de'

const locales = {
  fr: frenchLocale,
  de: deutschLocale,
  // separated from the main bundle
  ru: () => import('locales/ru').then(data => data.default)
}

export default () => (
  <LocalizedProvider locales={locales}>
    { ({ locale }) => !!locale && (
      <div>
        Current locale: { locale }
      </div>
    ) }
  </LocalizedProvider>
)
```

#### 5. Localize components and use them

```javascript
import React, { Fragment } from 'react'
import PropTypes from 'prop-types'
import { localized } from 'react-localized'

export default
@localized
class Text extends Component {
  static propTypes = {
    gettext: PropTypes.func.isRequired,
    ngettext: PropTypes.func.isRequired,
    formats: PropTypes.object.isRequired,
    formatDate: PropTypes.func.isRequired,
  }

  render() {
    const { gettext, ngettext, formatDate, formats } = this.props
    return (
      <Fragment>
        { gettext('Hello, world!') } // Привет, мир!
        { gettext('My name is {0}', 'John') } // Мое имя John
        { gettext('My name is {0}', 'Anna') } // Мое имя Anna
        { ngettext('{0} apple', '{0} apples', 1, 1) } // 1 яблоко
        { ngettext('{0} apple', '{0} apples', 2, 2) } // 2 яблока
        { ngettext('{0} apple', '{0} apples', 10, 10) } // 10 яблок
        { formatDate(new Date(), formats.humanizedDate) } // 10 октября 2017
      </Fragment>
    )
  }
}
```

#### See example

[Example](https://github.com/fakundo/react-localized/tree/master/examples)

## API

#### LocalizedProvider props

- `locale` - current locale
- `locales` - defined locales

#### Props passed to localized component

- `gettext(input, ...injections)`
- `ngettext(singular, plural, n, ...injections)`
- `pgettext(context, input, ...injections)`
- `npgettext(context, singular, plural, n, ...injections)`
- `...extra locale data`
- `ref = props.localizedInnerRef`

## License

MIT
