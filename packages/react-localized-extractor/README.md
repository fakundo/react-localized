# react-localized-extractor

[![npm](https://img.shields.io/npm/v/react-localized-extractor.svg)](https://www.npmjs.com/package/react-localized-extractor)

CLI tool extracts the translation messages the from source files and creates translation `.po` files (merging translations in existing files).

Part of [react-localized](https://www.npmjs.com/package/react-localized)

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
  --locales, -l  List of desired locales (comma separated)   [string] [required]
  --source, -s   Source files pattern
                               [string] [default: "./src/**/*.@(js|ts|jsx|tsx)"]
  --output, -o   Output .po files directory      [string] [default: "./locales"]
  --alias, -a    Function alias                                         [string]
  --save-pot     Should create catalog .pot file in output directory
                                                      [boolean] [default: false]
```
