import { sendOrderRequest } from '../api'
import { CLEAR_CHOSEN_INGREDIENTS } from './burger-constructor'
import { getBurgerIngredients } from './burger-ingredients'

export const SEND_ORDER_REQUEST = 'SEND_ORDER_REQUEST'
export const SEND_ORDER_SUCCESS = 'SEND_ORDER_SUCCESS'
export const SEND_ORDER_ERROR = 'SEND_ORDER_ERROR'

export const SHOW_ORDER_MODAL = 'SHOW_ORDER_MODAL'
export const HIDE_ORDER_MODAL = 'HIDE_ORDER_MODAL'

export const SET_CURRENT_ORDER = 'SET_CURRENT_ORDER'

export function showOrderModal() {
  return { type: SHOW_ORDER_MODAL }
}

export function hideOrderModal() {
  return { type: HIDE_ORDER_MODAL }
}

export function setCurrentOrder(order) {
  return { type: SET_CURRENT_ORDER, order: order }
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
        dispatch(getBurgerIngredients())
        dispatch({ type: CLEAR_CHOSEN_INGREDIENTS })
      })
      .catch(() => {
        dispatch({
          type: SEND_ORDER_ERROR,
        })
      })
  }
}
