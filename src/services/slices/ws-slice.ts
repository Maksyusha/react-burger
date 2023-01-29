import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

type TWsState = {
  wsConnecting: boolean
  wsClosing: boolean
  wsConnected: boolean
}

const initialState: TWsState = {
  wsConnecting: false,
  wsClosing: false,
  wsConnected: false,
}

export const wsSlice = createSlice({
  name: 'ws',
  initialState,
  reducers: {
    wsConnect(state, action: PayloadAction<string>) {
      state.wsConnecting = true
    },
    wsConnectionSuccess(state) {
      state.wsConnecting = false
      state.wsConnected = true
    },
    wsConnectionError(state) {
      state.wsConnected = false
    },
    wsClose(state) {
      state.wsClosing = true
    },
    wsConnectionClosed(state) {
      state.wsClosing = false
      state.wsConnected = false
    },
  },
})

export const {
  wsConnect,
  wsConnectionSuccess,
  wsConnectionError,
  wsClose,
  wsConnectionClosed,
} = wsSlice.actions
