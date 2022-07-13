import { applyMiddleware, createStore } from '@reduxjs/toolkit'; /* FIX - here is from toolkit */
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import monitorReducersEnhancer from './store/enhancers/monitor-reducers'
import logger from './store/middleware/logger'
import { rootReducer } from './store/root.reducer'

export default function configureStore(preloadedState) {
  const middlewares = [thunkMiddleware] /* FIX - ADD LOGGER IF NEEDED */
  const middlewareEnhancer = applyMiddleware(...middlewares)

  const enhancers = [middlewareEnhancer, monitorReducersEnhancer]
  const composedEnhancers = composeWithDevTools(...enhancers)

  const store = createStore(rootReducer, preloadedState, composedEnhancers)

  return store
}

