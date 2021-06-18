import React, { useState, useCallback } from 'react'
import { LocalizedProvider } from 'react-localized'
import HookedComponent from './HookedComponent'
import DecoratedFunctionalComponent from './DecoratedFunctionalComponent'
import DecoratedClassComponent from './DecoratedClassComponent'
import TemplateUsingComponent from './TemplateUsingComponent'
import AliasUsingComponent from './AliasUsingComponent'
import locales from '../locales'

export default () => {
  const [locale, setLocale] = useState('en')

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'en' ? 'ru' : 'en'))
  }, [])

  return (
    <>
      <button
        type="button"
        onClick={toggleLocale}
      >
        Toggle locale
      </button>
      <hr />
      <LocalizedProvider
        locales={locales}
        selected={locale}
        alias={{
          gettext: '__',
          pgettext: '__p',
          ngettext: '__n',
          npgettext: '__np',
        }}
      >
        {({ localeReady }) => (
          localeReady
            ? (
              <>
                <HookedComponent />
                <hr />
                <DecoratedFunctionalComponent />
                <hr />
                <DecoratedClassComponent />
                <hr />
                <TemplateUsingComponent />
                <hr />
                <AliasUsingComponent />
              </>
            )
            : 'loading locale'
        )}
      </LocalizedProvider>
    </>
  )
}
