import React from 'react'
import { useLocales } from 'react-localized'

export default () => {
  const { gettext, ngettext, pgettext } = useLocales()
  return (
    <>
      {gettext('Hello, world!')}
      <br />
      {ngettext('%s apple', '%s apples', 1, 1)}
      <br />
      {pgettext('Context', 'Text with context')}
      <br />
    </>
  )
}
