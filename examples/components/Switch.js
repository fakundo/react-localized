import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { updateLocale } from '../../src'

const mapStateToProps = ({ locale }) => ({ locale })
const mapDispatchToProps = { updateLocaleAction: updateLocale }

@connect(mapStateToProps, mapDispatchToProps)
export default class Switch extends Component {
  static propTypes = {
    locale: PropTypes.string.isRequired,
    updateLocaleAction: PropTypes.func.isRequired
  }

  toggleLocale = () => {
    const { locale, updateLocaleAction } = this.props
    const nextLocale = locale === 'ru' ? 'en' : 'ru'
    updateLocaleAction(nextLocale)
  }

  render() {
    const { locale } = this.props
    return (
      <button onClick={this.toggleLocale}>
        Toggle locale (Current: { locale })
      </button>
    )
  }
}
