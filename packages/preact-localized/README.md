# react-localized / preact-localized

[![npm](https://img.shields.io/npm/v/react-localized.svg)](https://www.npmjs.com/package/react-localized)
[![npm](https://img.shields.io/npm/v/preact-localized.svg)](https://www.npmjs.com/package/preact-localized)

Complete internationalization tool for React and Preact components.

Features:

- based on [gettext](https://www.gnu.org/software/gettext/manual/gettext.html) format, uses translation `.po` files

- translation strings for `.po` files can be extracted automatically from project source files

- plural forms are supported

- gettext function aliases are supported

- JavaScript string templates are supported

- locale data is extendable, for example by adding date formats, currencies, etc.

- locale data can be separated from the main bundle by using dynamic import

### Basic component example

```js
import { useLocales } from 'react-localized' // or from 'preact-localized'

export default () => {
  const { gettext } = useLocales()
  return (
    <>
      { gettext('Hello, World!') } // Привет, Мир!
    </>
  )
}
```

### Complex example

[Live demo](http://fakundo.github.io/react-localized/)
|
[Source](https://github.com/fakundo/react-localized/tree/master/examples)

### Installation and usage

#### 1. Use existing `.po` files with translation messages or generate them from your project source files

To generate `.po` files you can use the extractor CLI tool. Extractor searches your project source files for functions like `gettext`, `ngettext`, etc. Extractor also can update existing `.po` files without erasing existing translations in those files.

```console
npm i react-localized-extractor
```

```console
react-localized-extractor [options]

Options:
  --version      Show version number                                   [boolean]
  --help         Show help                                             [boolean]
  --locales, -l  List of desired locales (comma separated)   [string] [required]
  --source, -s   Source files pattern
                               [string] [default: "./src/**/*.@(js|ts|jsx|tsx)"]
  --output, -o   Output .po files directory      [string] [default: "./locales"]
  --alias, -a    Function alias                                         [string]
  --save-pot     Should create catalog .pot file in output directory
                                                      [boolean] [default: false]
```

```console
react-localized-extractor -l ru
```

#### 2. Modify `.po` files to add / edit translation

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

#### 4. Install `react-localized` or `preact-localized`

```console
// for React
npm i react-localized 

// for Preact
npm i preact-localized
```

#### 5. Create data object for each locale

Use the `createLocale` function from the package. The first argument is for translation messages taken from `.po` file. The second argument is for extra data such as date formats, currencies, and so on.

Example of the file `ru.js` for russian locale

```js
import { createLocale } from 'react-localized' // or from 'preact-localized'
import messages from 'messages/ru.po'

const extra = { ... }

export default createLocale(messages, extra)
```

#### 6. Render provider component

```js
import { LocalizedProvider } from 'react-localized' // or from 'preact-localized'

import fr from 'fr.js'
import de from 'de.js'

const ru = () => import('ru.js').then(data => data.default) // separated from the main bundle

const locales = { fr, de, ru }

export default () => (
  <LocalizedProvider 
    locales={locales} 
    selected="fr"
  >
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
import { useLocales } from 'react-localized' // or from 'preact-localized'

export default () => {
  const { gettext, ngettext, ...extra } = useLocales()
  return (
    <>
      { gettext('Hello, World!') } // Привет, Мир!
      { ngettext('apple', 'apples', 1) } // яблоко
      { ngettext('apple', 'apples', 2) } // яблока
      { ngettext('apple', 'apples', 5) } // яблок
    </>
  )
}
```

#### 8. Localize components using HOC (Higher-Order Component)

```js
import { withLocales } from 'react-localized' // or from 'preact-localized'

class LocalizedComponent extends Component {
  render() {
    const { pgettext, formatDate, formats } = this.props // 'formatDate' and 'formats' are extra data passed to the 'createLocale'
    return (
      <>
        { pgettext('Context', 'Text with context') } // Текст с контекстом
        { formatDate(new Date(), formats.date) } // 1 января 2020
      </>
    )
  }
}

export default withLocales()(LocalizedComponent)
```
### Using string templates

```js
import { useLocales } from 'react-localized' // or from 'preact-localized'

export default () => {
  const { gettext, ngettext, pgettext, npgettext } = useLocales()
  const name = 'Anna'
  const i = 2
  return (
    <>
      { gettext`My name is ${name}` } // Мое имя Anna
      { ngettext`${i} apple``${i} apples`(i) } // 2 яблока
      { pgettext('Ctx')`My name is ${name}` }
      { npgettext('Ctx')`${i} apple``${i} apples`(i) }
    </>
  )
}
```

### Using function aliases

Use `LocalizedProvider` `alias` prop to define function aliases.

Example of alias for `gettext` only

```js
<LocalizedProvider alias="__" />
```

Example of aliases for `gettext` and `ngettext`

```js
<LocalizedProvider alias={{ gettext: '__', ngettext: '__n' }} />
```

Example of alias usage

```js
import { useLocales } from 'react-localized' // or from 'preact-localized'

export default () => {
  const { __, __n } = useLocales()
  const name = 'Anna'
  return (
    <>
      { __('Hello, World!') }
      { __`My name is ${name}` }
      { __n`apple``apples`(5) }
    </>
  )
}
```

Also configure extractor.

Example of alias for `gettext` only

```console
react-localized-extractor -l ru -a __
```

Example of aliases for `gettext` and `ngettext`

```console
react-localized-extractor -l ru -a.gettext __ -a.ngettext __n
```

### API

#### LocalizedProvider props

- `locales` - defined locales
- `selected` - selected locale (default `en`)
- `alias` - function aliases (string or object)
- `children({ localeReady })`

#### Data returned by hook / props passed to the child of the HOC

- `locale`
- `gettext(text)`
- `ngettext(text, textPlural, n)`
- `pgettext(context, text)`
- `npgettext(context, text, textPlural, n)`
- `...aliases` - defined function aliases
- `...extra` - extra data passed to the `createLocale`

### License

MIT
