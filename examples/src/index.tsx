// @ts-ignore
import { render } from 'lib'
import App from './App'

const div = document.createElement('div')
document.body.appendChild(div)

render(<App />, div)
