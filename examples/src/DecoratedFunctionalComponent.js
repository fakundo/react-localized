import React from 'react'
import { withLocales } from 'react-localized'

const DecoratedFunctionalComponent = ({ ngettext }) => (
  <>
    <p>{ngettext('%s apple', '%s apples', 1, 1)}</p>
    <p>{ngettext('%s apple', '%s apples', 2, 2)}</p>
    <p>{ngettext('%s apple', '%s apples', 10, 10)}</p>
    <p>{ngettext('%s table', '%s tables', 5, 5)}</p>
  </>
)

export default withLocales()(DecoratedFunctionalComponent)
