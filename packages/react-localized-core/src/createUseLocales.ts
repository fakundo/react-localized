import { CreateUseLocalesOptions } from './types'

export default (options: CreateUseLocalesOptions) => () => (
  options.useContext(options.localizedContext)
)
