import React, { useState, useCallback } from 'react'
import { LocalizedProvider } from 'react-localized'
import HookedComponent from './HookedComponent'
import DecoratedFunctionalComponent from './DecoratedFunctionalComponent'
import DecoratedClassComponent from './DecoratedClassComponent'
import locales from '../locales'

export default () => {
  const [selectedLocale, setSelectedLocale] = useState('en')
  const toggleLocale = useCallback(() => setSelectedLocale((selected) => (selected === 'en' ? 'ru' : 'en')), [])
  return (
    <>
      <button onClick={toggleLocale} type="button">toggle locale</button>
      <hr />
      <LocalizedProvider locales={locales} selected={selectedLocale}>
        { ({ localeReady }) => (localeReady
          ? (
            <>
              <HookedComponent />
              <DecoratedFunctionalComponent />
              <DecoratedClassComponent />
            </>
          )
          : 'loading locale'
        )}
      </LocalizedProvider>
    </>
  )
}
