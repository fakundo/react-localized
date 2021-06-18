import React from 'react'
import { useLocales } from 'react-localized'

export default () => {
  const { gettext, pgettext, ngettext, npgettext } = useLocales()
  const name = 'John'
  const i = 5
  const j = 1
  return (
    <>
      <p>{gettext`My name is ${name}`}</p>
      <p>{pgettext('Context')`Text with context ${name}`}</p>
      <p>{ngettext`${i} apple``${i} apples`(i)}</p>
      <p>{npgettext('Context')`${j} table``${j} tables`(j)}</p>
    </>
  )
}
