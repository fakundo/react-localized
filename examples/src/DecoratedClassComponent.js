import React, { Component } from 'react'
import { withLocales } from 'react-localized'

class DecoratedClassComponent extends Component {
  render() {
    const { pgettext, npgettext, formats, formatDate } = this.props
    return (
      <>
        <p>{formatDate(new Date(), formats.date)}</p>
        <p>{pgettext('Context', 'Text with context')}</p>
        <p>2 {npgettext('Context', 'table', 'tables', 2)}</p>
      </>
    )
  }
}

export default withLocales()(DecoratedClassComponent)
