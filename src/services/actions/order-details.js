import { sendOrderRequest } from '../api'

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST'
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS'
export const SEND_ORDER_ERROR = 'SEND_ORDER_ERROR'

export const SHOW_ORDER_MODAL = 'SHOW_ORDER_MODAL'
export const HIDE_ORDER_MODAL = 'HIDE_ORDER_MODAL'

export function showOrderModal() {
  return { type: SHOW_ORDER_MODAL }
}

export function hideOrderModal() {
  return { type: HIDE_ORDER_MODAL }
}

export function sendOrder(data) {
  return function (dispatch) {
    dispatch({ type: SEND_ORDER_REQUEST })
    sendOrderRequest(data)
      .then((data) => {
        dispatch({
          type: SEND_ORDER_SUCCESS,
          orderNumber: data.order.number,
        })
      })
      .catch(() => {
        dispatch({
          type: SEND_ORDER_ERROR,
        })
      })
  }
}
