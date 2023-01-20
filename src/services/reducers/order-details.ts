import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
  SHOW_ORDER_MODAL,
  HIDE_ORDER_MODAL,
} from '../constants/order-details'
import { TOrderDetailsActions } from '../actions/order-details'

type TInitialState = {
  orderNumber: number | null
  orderRequest: boolean
  orderFailed: boolean
  orderModalIsOpened: boolean
}

const initialState: TInitialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderModalIsOpened: false,
}

export const orderDetailsReducer = (
  state = initialState,
  action: TOrderDetailsActions
): TInitialState => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderNumber: null,
        orderRequest: true,
        orderFailed: false,
      }
    }
    case SEND_ORDER_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderRequest: false,
      }
    }
    case SEND_ORDER_ERROR: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true,
      }
    }
    case SHOW_ORDER_MODAL: {
      return {
        ...state,
        orderModalIsOpened: true,
      }
    }
    case HIDE_ORDER_MODAL: {
      return {
        ...state,
        orderModalIsOpened: false,
      }
    }
    default: {
      return state
    }
  }
}
