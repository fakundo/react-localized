// @ts-ignore
import { useState, useCallback, libName } from 'lib'
import { LocalizedProvider } from 'react-localized'
import CompHook from './CompHook'
import CompDecoratedFunctional from './CompDecoratedFunctional'
import CompDecoratedClass from './CompDecoratedClass'
import CompTemplates from './CompTemplates'
import CompAlias from './CompAlias'
import locales from '../locales'

export default () => {
  const [locale, setLocale] = useState('en')

  const toggleLocale = useCallback(() => {
    setLocale((prev) => (prev === 'en' ? 'ru' : 'en'))
  }, [])

  return (
    <>
      <h3>
        {libName}
      </h3>
      <hr />
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
                <CompHook />
                <hr />
                <CompDecoratedFunctional />
                <hr />
                <CompDecoratedClass />
                <hr />
                <CompTemplates />
                <hr />
                <CompAlias />
              </>
            )
            : 'loading locale'
        )}
      </LocalizedProvider>
    </>
  )
}
