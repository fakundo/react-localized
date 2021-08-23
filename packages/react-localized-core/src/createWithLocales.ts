import { CreateWithLocalesOptions } from './types'

export default (options: CreateWithLocalesOptions) => () => (component) => (
  options.forwardRef((ownProps, ref) => {
    const value = options.useLocales()
    return options.createElement(component, { ...ownProps, ...value, ref })
  })
)
