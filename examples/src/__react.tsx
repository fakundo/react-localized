import { version } from 'react'
import { createRoot } from 'react-dom/client'

export { useState, useCallback, Component } from 'react'

export const libName = `React v${version}`

export const render = (element, container) => {
  const root = createRoot(container)
  root.render(element)
}
