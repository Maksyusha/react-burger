import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TOrderData } from '../types/data'

export type TWsState = {
  wsConnected: boolean
  orders: TOrderData[] | null
  sortedOrders: TOrderData[] | null
  total: number | null
  totalToday: number | null
}

const initialState: TWsState = {
  wsConnected: false,
  orders: null,
  sortedOrders: null,
  total: null,
  totalToday: null,
}

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsConnectionSuccess(state) {
      state.wsConnected = true
    },
    wsConnectionError(state) {
      state.wsConnected = false
    },
    wsConnectionClosed(state) {
      state.wsConnected = false
      state.orders = null
      state.sortedOrders = null
      state.total = null
      state.totalToday = null
    },
    wsGetMessage(
      state,
      action: PayloadAction<{
        orders: TOrderData[]
        total: number
        totalToday: number
      }>
    ) {
      state.orders = action.payload.orders
      state.total = action.payload.total
      state.totalToday = action.payload.totalToday
    },
    saveSortedOrders(state, action: PayloadAction<{ orders: TOrderData[] }>) {
      state.sortedOrders = action.payload.orders
    },
  },
})
