import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
  SHOW_ORDER_MODAL,
  HIDE_ORDER_MODAL,
} from '../actions/order-details'

const initialState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderModalIsOpened: false,
}

export const orderDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEND_ORDER_REQUEST: {
      return {
        ...state,
        orderRequest: true,
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
