import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { Provider as LocaleProvider } from '../src'
import configureStore from './configureStore'
import englishLocaleData from './locales/en'

import Example from './components/Example'
import Switch from './components/Switch'

const store = configureStore()

const localeData = {
  en: englishLocaleData,
  ru: () => import('./locales/ru').then(data => data.default),
}

export default () => (
  <StoreProvider store={store}>
    <LocaleProvider localeData={localeData}>
      <div>
        <Example />
        <hr />
        <Switch />
      </div>
    </LocaleProvider>
  </StoreProvider>
)
