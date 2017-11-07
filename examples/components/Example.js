import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { localized } from '../../src'

@localized
export default class Example extends Component {
  static propTypes = {
    gettext: PropTypes.func.isRequired,
    ngettext: PropTypes.func.isRequired,
    i18n: PropTypes.object.isRequired
  }

  render() {
    const { gettext, ngettext, i18n } = this.props
    return (
      <div>
        { gettext('Hello, world!') }
        <br />
        { gettext('My name is {0}', 'John') }
        <br />
        { gettext('My name is {0}', 'Anna') }
        <br />
        { ngettext('{0} apple', '{0} apples', 1, 1) }
        <br />
        { ngettext('{0} apple', '{0} apples', 2, 2) }
        <br />
        { ngettext('{0} apple', '{0} apples', 10, 10) }
        <br />
        { i18n.formatDate(new Date(), i18n.formats.humanizedDate) }
      </div>
    )
  }
}

