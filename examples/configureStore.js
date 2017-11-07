import { createStore, combineReducers, applyMiddleware } from 'redux'
import { createLogger } from 'redux-logger'
import { reducer as localeReducer } from '../src'

export default () => {
  const logger = createLogger({ collapsed: true })
  const createReducer = () => combineReducers({
    locale: localeReducer
  })

  return createStore(
    createReducer(),
    applyMiddleware(logger)
  )
}

