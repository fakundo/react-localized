import { UPDATE_LOCALE } from './actions'

export default (state = 'en', action) => {
  switch (action.type) {
    case UPDATE_LOCALE:
      return action.locale

    default:
      return state
  }
}
