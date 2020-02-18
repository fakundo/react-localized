#!/usr/bin/env node
import yargs from 'yargs'
import path from 'path'
import fs from 'fs'
import gettextParser from 'gettext-parser'
import mkdirp from 'mkdirp'
import extract from './extract'
import merge from './merge'

const { argv } = yargs
  .locale('en')
  .usage('$0 [options]')
  .help()
  .options({
    locales: {
      alias: 'l',
      type: 'array',
      description: 'List of desired locales',
      require: true,
      requiresArg: true,
    },
    source: {
      alias: 's',
      type: 'string',
      description: 'Source files pattern',
      default: './src/**/*.@(js|ts|jsx|tsx)',
    },
    output: {
      alias: 'o',
      type: 'string',
      description: 'Output path',
      default: './locales',
    },
    'save-pot': {
      type: 'boolean',
      description: 'Should save .pot file',
      default: false,
    },
  })

const { source, output, locales, savePot } = argv
const extractor = extract(source)
const catalogData = gettextParser.po.parse(extractor.getPotString())

mkdirp.sync(path.resolve(output))

if (savePot) {
  extractor.savePotFile(path.resolve(output, './catalog.pot'))
}

locales.forEach((locale) => {
  let existingFile
  try {
    existingFile = fs.readFileSync(path.resolve(output, `./${locale}.po`))
  } catch (e) {
    existingFile = ''
  }

  const originData = gettextParser.po.parse(existingFile)
  const data = merge(locale, originData, catalogData)
  const outputFile = gettextParser.po.compile(data)
  fs.writeFileSync(path.resolve(output, `./${locale}.po`), outputFile)
})

extractor.printStats()
