import React from 'react'
import { useLocales } from 'react-localized'

export default () => {
  const { gettext, pgettext } = useLocales()
  return (
    <>
      <p>{gettext('Hello, world!')}</p>
      <p>{pgettext('Context', 'Text with context')}</p>
    </>
  )
}
