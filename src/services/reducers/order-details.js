import {
  POST_INGREDIENTS_REQUEST,
  POST_INGREDIENTS_SUCCESS,
  POST_INGREDIENTS_ERROR,
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
    case POST_INGREDIENTS_REQUEST: {
      return {
        ...state,
        orderRequest: true,
      }
    }
    case POST_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderRequest: false
      }
    }
    case POST_INGREDIENTS_ERROR: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    case SHOW_ORDER_MODAL: {
      return {
        ...state,
        orderModalIsOpened: true
      }
    }
    case HIDE_ORDER_MODAL: {
      return {
        ...state,
        orderModalIsOpened: false
      }
    }
    default: {
      return state
    }
  }
}
