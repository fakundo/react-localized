import React from 'react'
import { useLocales } from 'react-localized'

export default () => {
  const { __, __p, __n, __np } = useLocales()
  const name = 'Anna'
  const i = 0
  const j = 12
  return (
    <>
      <p>{__`My name is ${name}`}</p>
      <p>{__p('Context')`Text with context ${name}`}</p>
      <p>{__n`${i} apple``${i} apples`(i)}</p>
      <p>{__np('Context')`${j} table``${j} tables`(j)}</p>
    </>
  )
}
