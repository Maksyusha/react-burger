export const WS_CONNECTION_START = 'WS_CONNECTION_START'
export const WS_CONNECTION_CLOSE = 'WS_CONNECTION_CLOSE'
export const WS_CONNECTION_SUCCESS = 'WS_CONNECTION_SUCCESS'
export const WS_CONNECTION_ERROR = 'WS_CONNECTION_ERROR'
export const WS_CONNECTION_CLOSED = 'WS_CONNECTION_CLOSED'
export const WS_GET_MESSAGE = 'WS_GET_MESSAGE'
export const SAVE_SORTED_ORDERS = 'SAVE_SORTED_ORDERS'

export const wsConnect = (url) => {
  return {
    type: WS_CONNECTION_START,
    url,
  }
}

export const wsClose = () => {
  return {
    type: WS_CONNECTION_CLOSE,
  }
}

export const wsConnectionSuccess = () => {
  return {
    type: WS_CONNECTION_SUCCESS,
  }
}

export const wsConnectionError = () => {
  return {
    type: WS_CONNECTION_ERROR,
  }
}

export const wsConnectionClosed = () => {
  return {
    type: WS_CONNECTION_CLOSED,
  }
}

export const wsGetMessage = (message) => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  }
}

export const saveSortedOrders = (orders) => {
  return {
    type: SAVE_SORTED_ORDERS,
    orders,
  }
}
