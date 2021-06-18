import React from 'react'
import { useLocales } from 'react-localized'

export default () => {
  const { gettext } = useLocales()
  return (
    <>
      <p>{gettext('Hello, World!')}</p>
    </>
  )
}
