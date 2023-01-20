import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  SAVE_SORTED_ORDERS,
} from '../constants/ws-constants'
import { TOrderData, TOrdersResponse } from '../types/data'

export interface IWsConnectAction {
  readonly type: typeof WS_CONNECTION_START
  readonly url: string
}

export interface IWsCloseAction {
  readonly type: typeof WS_CONNECTION_CLOSE
}

export interface IWsConnectionSuccessAction {
  readonly type: typeof WS_CONNECTION_SUCCESS
}

export interface IWsConnectionErrorAction {
  readonly type: typeof WS_CONNECTION_ERROR
}

export interface IWsConnectionClosedAction {
  readonly type: typeof WS_CONNECTION_CLOSED
}

export interface IWsGetMessageAction {
  readonly type: typeof WS_GET_MESSAGE
  readonly payload: TOrdersResponse
}

export interface ISaveSortedOrdersAction {
  readonly type: typeof SAVE_SORTED_ORDERS
  readonly orders: TOrderData[]
}

export type TWsActions =
  | IWsConnectAction
  | IWsCloseAction
  | IWsConnectionSuccessAction
  | IWsConnectionErrorAction
  | IWsConnectionClosedAction
  | IWsGetMessageAction
  | ISaveSortedOrdersAction

export const wsConnect = (url: string): IWsConnectAction => {
  return {
    type: WS_CONNECTION_START,
    url,
  }
}

export const wsClose = (): IWsCloseAction => {
  return {
    type: WS_CONNECTION_CLOSE,
  }
}

export const wsConnectionSuccess = (): IWsConnectionSuccessAction => {
  return {
    type: WS_CONNECTION_SUCCESS,
  }
}

export const wsConnectionError = (): IWsConnectionErrorAction => {
  return {
    type: WS_CONNECTION_ERROR,
  }
}

export const wsConnectionClosed = (): IWsConnectionClosedAction => {
  return {
    type: WS_CONNECTION_CLOSED,
  }
}

export const wsGetMessage = (message: TOrdersResponse): IWsGetMessageAction => {
  return {
    type: WS_GET_MESSAGE,
    payload: message,
  }
}

export const saveSortedOrders = (
  orders: TOrderData[]
): ISaveSortedOrdersAction => {
  return {
    type: SAVE_SORTED_ORDERS,
    orders,
  }
}
