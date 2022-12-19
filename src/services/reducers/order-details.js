import {
  SEND_ORDER_REQUEST,
  SEND_ORDER_SUCCESS,
  SEND_ORDER_ERROR,
  SHOW_ORDER_MODAL,
  HIDE_ORDER_MODAL,
  SET_CURRENT_ORDER,
} from '../actions/order-details'

const initialState = {
  currentOrder: null,
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
    case SET_CURRENT_ORDER: {
      return {
        ...state,
        currentOrder: action.order,
      }
    }
    default: {
      return state
    }
  }
}
