import React, { Component } from 'react'
import { withLocales } from 'react-localized'

class DecoratedClassComponent extends Component {
  render() {
    const { gettext, formats, formatDate } = this.props
    return (
      <>
        <p>{gettext('My name is %s', 'Anna')}</p>
        <p>{gettext('My name is %s', 'John')}</p>
        <p>{formatDate(new Date(), formats.date)}</p>
      </>
    )
  }
}

export default withLocales()(DecoratedClassComponent)
