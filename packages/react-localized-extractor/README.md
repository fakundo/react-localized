# react-localized-extractor

[![npm](https://img.shields.io/npm/v/react-localized-extractor.svg)](https://www.npmjs.com/package/react-localized-extractor)

CLI tool extracts the translation messages the from source files and generates `.po` files (merges with existing files).

## Usage

```console
npm i react-localized-extractor
npx react-localized-extractor [options]
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
