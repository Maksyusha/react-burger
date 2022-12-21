export const socketMiddleware = (wsActions) => {
  return (store) => {
    let socket = null

    return (next) => (action) => {
      const { dispatch } = store
      const { type, url } = action
      const { wsConnect, wsClose, onOpen, onClose, onError, onMessage } = wsActions

      if (type === wsConnect) {
        socket = new WebSocket(url)
      }

      if (socket && type === wsClose) {
        socket.close('1000', 'User closed connection')
      }
      if (socket) {
        socket.onopen = (event) => {
          dispatch({ type: onOpen, payload: event })
        }

        socket.onerror = (event) => {
          dispatch({ type: onError, payload: event })
        }

        socket.onmessage = (event) => {
          const { data } = event
          const parsedData = JSON.parse(data)

          dispatch({ type: onMessage, payload: parsedData })
        }

        socket.onclose = (event) => {
          dispatch({ type: onClose, payload: event })
        }
      }

      next(action)
    }
  }
}
