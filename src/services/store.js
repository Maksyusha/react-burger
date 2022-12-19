import { applyMiddleware, createStore, compose } from 'redux'
import { rootReducer } from './reducers'
import { socketMiddleware } from './middleware/socket-middleware.js'
import thunk from 'redux-thunk'
import {
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_START,
  WS_CONNECTION_SUCCESS,
  WS_GET_MESSAGE,
} from './actions/ws-actions'

const wsActions = {
  wsConnect: WS_CONNECTION_START,
  wsClose: WS_CONNECTION_CLOSE,
  onOpen: WS_CONNECTION_SUCCESS,
  onClose: WS_CONNECTION_CLOSED,
  onError: WS_CONNECTION_ERROR,
  onMessage: WS_GET_MESSAGE,
}

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(
  applyMiddleware(thunk, socketMiddleware(wsActions))
)

export const initStore = (initialState = {}) =>
  createStore(rootReducer, initialState, enhancer)
