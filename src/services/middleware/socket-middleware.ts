import { Middleware } from 'redux'
import { refreshToken } from '../api'
import { setFeedState } from '../slices/feed-slice'
import {
  wsConnect,
  wsConnectionSuccess,
  wsConnectionError,
  wsClose,
  wsConnectionClosed,
} from '../slices/ws-slice'

export const socketMiddleware = (): Middleware => {
  return (store) => {
    let socket: WebSocket | null = null

    return (next) => (action) => {
      const { dispatch } = store
      const { type, payload } = action

      if (type === wsConnect.type) {
        socket = new WebSocket(payload)
      }

      if (socket && type === wsClose.type) {
        socket.close(1000, 'User closed connection')
      }

      if (socket) {
        socket.onopen = () => {
          dispatch(wsConnectionSuccess())
        }

        socket.onerror = () => {
          dispatch(wsConnectionError())
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData = JSON.parse(data)

          dispatch(setFeedState({parsedData, ingredients: store.getState().burgerIngredients.ingredients}))
        }

        socket.onclose = (event) => {
          if (event.code !== 1000) {
            refreshToken()
              .then(() => dispatch(wsConnect(payload)))
              .catch(() => dispatch(wsConnectionClosed()))
          } else {
            dispatch(wsConnectionClosed())
          }
        }
      }

      next(action)
    }
  }
}
