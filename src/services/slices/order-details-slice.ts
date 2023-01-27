import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { sendOrderRequestApi } from '../api'
import { getIngredients } from './burger-ingredients-slice'
import { clearChosenIngredients } from './burger-constructor-slice'
import { AppThunk } from '../types'

export type TOrderDetailsState = {
  orderNumber: number | null
  orderRequest: boolean
  orderFailed: boolean
  orderModalIsOpened: boolean
}

const initialState: TOrderDetailsState = {
  orderNumber: null,
  orderRequest: false,
  orderFailed: false,
  orderModalIsOpened: false,
}

export const orderDetailsSlice = createSlice({
  name: 'orderDetails',
  initialState,
  reducers: {
    sendOrderRequest(state) {
      state.orderNumber = null
      state.orderRequest = true
      state.orderFailed = false
    },
    sendOrderSuccess(state, action: PayloadAction<{ orderNumber: number }>) {
      state.orderNumber = action.payload.orderNumber
      state.orderRequest = false
    },
    sendOrderFailed(state) {
      state.orderRequest = false
      state.orderFailed = true
    },
    showOrderModal(state) {
      state.orderModalIsOpened = true
    },
    hideOrderModal(state) {
      state.orderModalIsOpened = false
    },
  },
})

export const { sendOrderRequest, sendOrderSuccess, sendOrderFailed, showOrderModal, hideOrderModal } =
  orderDetailsSlice.actions

export const sendOrder = (data: any): AppThunk => (dispatch) => {
  dispatch(sendOrderRequest())
  sendOrderRequestApi(data)
    .then((data) => {
      dispatch(sendOrderSuccess({ orderNumber: data.order.number }))
      dispatch(getIngredients())
      dispatch(clearChosenIngredients())
    })
    .catch(() => sendOrderFailed())
}
