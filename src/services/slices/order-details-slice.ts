import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

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
    sendOrderSuccess(state, action: PayloadAction<number>) {
      state.orderNumber = action.payload
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
