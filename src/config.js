import assign from 'lodash/assign'

export const config = {
  Component: null,
  createElement: null,
}

export const setConfig = nextConfig => (
  assign(config, nextConfig)
)
