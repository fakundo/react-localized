/** @jsx h */
import { render, h } from 'preact'

import '../usePreact'
import AppPreact from './AppPreact'

const container = document.createElement('div')
document.body.appendChild(container)
render(<AppPreact />, container)
