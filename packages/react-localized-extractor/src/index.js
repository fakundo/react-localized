#!/usr/bin/env node
import yargs from 'yargs'
import path from 'path'
import fs from 'fs'
import gettextParser from 'gettext-parser'
import mkdirp from 'mkdirp'
import configureExtractor from './configureExtractor'
import merge from './merge'

const { argv } = yargs
  .locale('en')
  .usage('$0 [options]')
  .help()
  .options({
    locales: {
      alias: 'l',
      type: 'string',
      description: 'List of desired locales (comma separated)',
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
      description: 'Output .po files directory',
      default: './locales',
    },
    alias: {
      alias: 'a',
      type: 'string',
      description: 'Function alias',
    },
    'save-pot': {
      type: 'boolean',
      description: 'Should create catalog .pot file in output directory',
      default: false,
    },
  })

const { locales, source, output, alias, savePot } = argv
const extractor = configureExtractor(source, alias)
const catalogData = gettextParser.po.parse(extractor.getPotString())

mkdirp.sync(path.resolve(output))

if (savePot) {
  extractor.savePotFile(path.resolve(output, './catalog.pot'))
}

locales.split(',').forEach((locale) => {
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
