import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_MESSAGE,
  SAVE_SORTED_ORDERS,
} from '../actions/ws-actions.js'

const initialState = {
  wsConnected: false,
  orders: null,
  sortedOrders: null,
  total: null,
  totalToday: null,
}

export const wsReducer = (state = initialState, action) => {
  switch (action.type) {
    case WS_CONNECTION_SUCCESS:
      return {
        ...state,
        wsConnected: true,
      }

    case WS_CONNECTION_ERROR:
      return {
        ...state,
        wsConnected: false,
      }

    case WS_CONNECTION_CLOSED:
      return {
        wsConnected: false,
        orders: null,
        sortedOrders: null,
        total: null,
        totalToday: null,
      }

    case WS_GET_MESSAGE:
      return {
        ...state,
        orders: action.payload.orders,
        total: action.payload.total,
        totalToday: action.payload.totalToday,
      }
    case SAVE_SORTED_ORDERS: {
      return {
        ...state,
        sortedOrders: action.orders,
      }
    }
    default:
      return state
  }
}
