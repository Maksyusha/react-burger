import { sendOrderRequestApi } from '../api'
import { clearChosenIngredients } from './burger-constructor'
import { getBurgerIngredients } from './burger-ingredients'
import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
  SHOW_ORDER_MODAL,
  HIDE_ORDER_MODAL,
} from '../constants/order-details'
import { AppDispatch, AppThunk } from '../types'

export interface ISendOrderRequestAction {
  readonly type: typeof SEND_ORDER_REQUEST
}

export interface ISendOrderSuccessAction {
  readonly type: typeof SEND_ORDER_SUCCESS
  readonly orderNumber: number
}

export interface ISendOrderErrorAction {
  readonly type: typeof SEND_ORDER_ERROR
}

export interface IShowOrderModalAction {
  readonly type: typeof SHOW_ORDER_MODAL
}

export interface IHideOrderModalAction {
  readonly type: typeof HIDE_ORDER_MODAL
}

export type TOrderDetailsActions =
  | ISendOrderRequestAction
  | ISendOrderSuccessAction
  | ISendOrderErrorAction
  | IShowOrderModalAction
  | IHideOrderModalAction

export function sendOrderRequest(): ISendOrderRequestAction {
  return { type: SEND_ORDER_REQUEST }
}

export function sendOrderSuccess(number: number): ISendOrderSuccessAction {
  return {
    type: SEND_ORDER_SUCCESS,
    orderNumber: number,
  }
}

export function sendOrderError(): ISendOrderErrorAction {
  return {
    type: SEND_ORDER_ERROR,
  }
}

export function showOrderModal() {
  return { type: SHOW_ORDER_MODAL }
}

export function hideOrderModal() {
  return { type: HIDE_ORDER_MODAL }
}

export const sendOrder: AppThunk =
  (data: any) => (dispatch: AppDispatch) => {
    dispatch(sendOrderRequest())
    sendOrderRequestApi(data)
      .then((data) => {
        dispatch(sendOrderSuccess(data.order.number))
        dispatch(getBurgerIngredients())
        dispatch(clearChosenIngredients())
      })
      .catch(() => {
        dispatch(sendOrderError())
      })
  }
