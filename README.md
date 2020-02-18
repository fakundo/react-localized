# react-localized / preact-localized

[![npm](https://img.shields.io/npm/v/react-localized.svg)](https://www.npmjs.com/package/react-localized)

Internationalization for React and Preact components.

Features:
- based on `gettext` format, uses translation `.po` files

- translation strings can be extracted automatically from source files

- plural forms are supported

- locale data is extendable, for example by adding date formats, currencies, etc.

- locale data can be separated from the main bundle by using dynamic imports

## Usage

#### 1. Generate translation `.po` files

You can use the CLI extractor tool. Extractor generates `.po` files for the desired locales from the source files. If `.po` files already exist, extractor will take translations from them.

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
                                [string] [default: "./src/**/*.(js|ts|jsx|tsx)"]
  --output, -o   Output path                     [string] [default: "./locales"]
  --save-pot     Should save .pot file                [boolean] [default: false]
```

Usage example

```console
react-localized-extractor -l ru -s ./src/**/*.js -o ./locales
```

#### 2. Update translations in `.po` files

Use your favourite editor for `.po` files. I recommend to use Poedit.

#### 3. Configure `webpack` loader for `.po` files (optional)

The loader transforms the contents of the `.po` file to JSON using `gettext-parser`. Therefore, if you don't use `webpack`, you can generate JSON files in your desired way and import them later.

```console
npm i react-localized-loader
```

```javascript
module: {
  rules: [
    {
      test: /\.po$/,
      use: 'react-localized-loader'
    }
  ]
}
```

#### 4. Install `react-localized` for React or `preact-localized` for Preact

For React

```console
npm i react-localized
```

For Preact

```console
npm i preact-localized
```

#### 5. Create locale data

Use second argument for date formats, currencies, etc.

Example of the file `ru.js`

```javascript
import { createLocale } from 'react-localized' // or from 'preact-localized'
import messages from 'messages/ru.po'

const extraProps = { ... }

export default createLocale(messages, extraProps)
```

#### 6. Render provider

```javascript
import { LocalizedProvider } from 'react-localized' // or from 'preact-localized'

import fr from 'fr.js'
import de from 'de.js'

const ru = () => import('ru.js').then(data => data.default) // separated from the main bundle

const locales = { fr, de, ru }

export default () => (
  <LocalizedProvider locales={locales} selected="fr">
    { ({ localeReady }) => (
      localeReady ? 'render children' : 'loading locale'
    ) }
  </LocalizedProvider>
)
```

#### 7. Localize components using hook

```javascript
import { useLocales } from 'react-localized' // or from 'preact-localized'

export default () => {
  const { gettext, ngettext, ...extraProps } = useLocales()
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

```javascript
import { withLocales } from 'react-localized' // or from 'preact-localized'

@withLocales()
export default class LocalizedComponent extends Component {
  render() {
    const { gettext, pgettext, formatDate, formats } = this.props // 'formatDate' and 'formats' are extra props passed to the 'createLocale'
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

## See complex example

[Example](https://github.com/fakundo/react-localized/tree/master/examples)

## API

#### LocalizedProvider props

- `locales` - defined locales
- `selected` - selected locale (default `en`)
- `children({ localeReady })`

#### Data returned by hook / Props passed to the child of the HOC

- `locale`
- `gettext(input, ...injections)`
- `ngettext(singular, plural, n, ...injections)`
- `pgettext(context, input, ...injections)`
- `npgettext(context, singular, plural, n, ...injections)`
- `...extraProps` - extra props passed to the `createLocale`

## License

MIT
