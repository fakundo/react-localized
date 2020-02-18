import React, { Component } from 'react'
import { withLocales } from 'react-localized'

@withLocales()
export default class DecoratedClassComponent extends Component {
  render() {
    const { gettext, ngettext, formats, formatDate } = this.props
    return (
      <>
        {gettext('My name is %s', 'Anna')}
        <br />
        {ngettext('%s apple', '%s apples', 10, 10)}
        <br />
        {formatDate(new Date(), formats.date)}
        <br />
      </>
    )
  }
}
