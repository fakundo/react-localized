import React from 'react'
import { withLocales } from 'react-localized'

export default withLocales()(({ gettext, ngettext }) => (
  <>
    {gettext('My name is %s', 'John')}
    <br />
    {ngettext('%s apple', '%s apples', 2, 2)}
    <br />
    {ngettext('%s table', '%s tables', 10, 10)}
    <br />
  </>
))
