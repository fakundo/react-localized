# react-localized

[![npm](https://img.shields.io/npm/v/react-localized.svg)](https://www.npmjs.com/package/react-localized)

Internationalization for React components.

Features:
- based on `gettext` format, uses translation `.po` files

- translation strings can be extracted automatically from source files

- plural forms are supported

- locale data is extendable, for example by adding date formats, currencies, etc.

- locale data can be separated from the main bundle by using dynamic import

### Component example

```js
import { useLocales } from 'react-localized'

export default () => {
  const { gettext } = useLocales()
  return (
    <>
      { gettext('Hello, world!') } // Привет, мир!
    </>
  )
}
```

### Installation and usage

#### 1. Use existing `.po` files with translation or generate them from your project source files

To generate `.po` files you can use the extractor CLI tool. Extractor searches your project source files for functions like `gettext`, `ngettext`, etc. Extractor also can update existing `.po` files without erasing existing translations in those files.

```console
npm i react-localized-extractor
```

```console
react-localized-extractor [options]

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --locales, -l  List of desired locales                      [array] [required]
  --source, -s   Source files pattern
                                [string] [default: "./src/**/*.@(js|ts|jsx|tsx)"]
  --output, -o   Output path                     [string] [default: "./locales"]
  --save-pot     Should save .pot file                [boolean] [default: false]
```

```console
react-localized-extractor -l ru -s ./src/**/*.js -o ./locales
```

#### 2. Add / edit translation in `.po` files

Use your favourite editor for `.po` files. I recommend you to use `Poedit`.

#### 3. Import `.po` files into your project by using webpack loader (optional)

The loader transforms the contents of the `.po` files to JSON using `gettext-parser`. Therefore, if you are not using `webpack`, you can generate JSON files using this parser and import them into your project. 

```console
npm i react-localized-loader
```

```js
module: {
  rules: [
    {
      test: /\.po$/,
      use: 'react-localized-loader'
    }
  ]
}
```

#### 4. Install `react-localized`

```console
npm i react-localized
```

#### 5. Create locale data

Use the second argument for extra data such as date formats, currencies, and so on.

Example of the file `ru.js`

```js
import { createLocale } from 'react-localized'
import messages from 'messages/ru.po'

const extra = { ... }

export default createLocale(messages, extra)
```

##### 6. Render provider

```js
import { LocalizedProvider } from 'react-localized'

import fr from 'fr.js'
import de from 'de.js'

const ru = () => import('ru.js').then(data => data.default) // separated from the main bundle

const locales = { fr, de, ru }

export default () => (
  <LocalizedProvider locales={locales} selected="fr">
    { ({ localeReady }) => (
      localeReady 
        ? 'render children' 
        : 'loading locale'
    ) }
  </LocalizedProvider>
)
```

#### 7. Localize components using hook

```js
import { useLocales } from 'react-localized'

export default () => {
  const { gettext, ngettext, ...extra } = useLocales()
  return (
    <>
      { gettext('Hello, world!') } // Привет, мир!
      { ngettext('%s apple', '%s apples', 1, 1) } // 1 яблоко
      { ngettext('%s apple', '%s apples', 2, 2) } // 2 яблока
      { ngettext('%s apple', '%s apples', 10, 10) } // 10 яблок
    </>
  )
}
```

#### 8. Localize components using HOC (Higher-Order Component)

```js
import { withLocales } from 'react-localized'

@withLocales()
export default class LocalizedComponent extends Component {
  render() {
    const { gettext, pgettext, formatDate, formats } = this.props // 'formatDate' and 'formats' are extra data passed to the 'createLocale'
    return (
      <>
        { gettext('My name is %s', 'John') } // Мое имя John
        { pgettext('Context', 'Text with context') } // Текст с контекстом
        { formatDate(new Date(), formats.date) } // 1 января 2020
      </>
    )
  }
}
```

### See example

[Demo](http://fakundo.github.io/react-localized/)
|
[Source](https://github.com/fakundo/react-localized/tree/master/examples)

### API

#### LocalizedProvider props

- `locales` - defined locales
- `selected` - selected locale (default `en`)
- `children({ localeReady })`

#### Data returned by hook / props passed to the child of the HOC

- `locale`
- `gettext(input, ...injections)`
- `ngettext(singular, plural, n, ...injections)`
- `pgettext(context, input, ...injections)`
- `npgettext(context, singular, plural, n, ...injections)`
- `...extra` - extra data passed to the `createLocale`

### License

MIT
