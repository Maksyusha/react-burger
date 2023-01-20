import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TUserData } from '../types/data'
import { deleteCookie, setCookie } from '../utils'

export type TUserState = {
  isAuthChecked: boolean
  registrationRequest: boolean
  registrationFailed: boolean
  authorizationRequest: boolean
  authorizationFailed: boolean
  getLogoutRequest: boolean
  getLogoutFailed: boolean
  getUserRequest: boolean
  getUserFailed: boolean
  patchUserRequest: boolean
  patchUserFailed: boolean
  userData: TUserData | null
}

const initialState: TUserState = {
  isAuthChecked: false,
  registrationRequest: false,
  registrationFailed: false,
  authorizationRequest: false,
  authorizationFailed: false,
  getLogoutRequest: false,
  getLogoutFailed: false,
  getUserRequest: false,
  getUserFailed: false,
  patchUserRequest: false,
  patchUserFailed: false,
  userData: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authChecked(state) {
      state.isAuthChecked = true
    },
    sendRegistrationRequest(state) {
      state.registrationRequest = true
    },
    sendRegistrationSuccess(
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
        user: TUserData
      }>
    ) {
      setCookie('accessToken', action.payload.accessToken)
      setCookie('refreshToken', action.payload.refreshToken)

      state.registrationRequest = false
      state.userData = action.payload.user
    },
    sendRegistrationFailed(state) {
      state.registrationRequest = false
      state.registrationFailed = true
    },
    sendAuthorizationRequest(state) {
      state.authorizationRequest = true
    },
    sendAuthorizationSuccess(
      state,
      action: PayloadAction<{
        accessToken: string
        refreshToken: string
        user: TUserData
      }>
    ) {
      setCookie('accessToken', action.payload.accessToken)
      setCookie('refreshToken', action.payload.refreshToken)

      state.authorizationRequest = false
      state.userData = action.payload.user
    },
    sendAuthorizationError(state) {
      state.authorizationRequest = false
      state.authorizationFailed = true
    },
    getLogoutRequest(state) {
      state.getLogoutRequest = true
    },
    getLogoutSuccess(state) {
      deleteCookie('accessToken')
      deleteCookie('refreshToken')

      state.userData = null
      state.getLogoutRequest = false
    },
    getLogoutError(state) {
      state.getLogoutRequest = false
      state.getLogoutFailed = true
    },
    getUserRequest(state) {
      state.getUserRequest = true
    },
    getUserSuccess(state, action: PayloadAction<{ userData: TUserData }>) {
      state.userData = action.payload.userData
      state.getUserRequest = false
    },
    getUserError(state) {
      state.getUserRequest = false
      state.getUserFailed = true
    },
    patchUserRequest(state) {
      state.patchUserRequest = true
    },
    patchUserSuccess(state, action: PayloadAction<{ userData: TUserData }>) {
      state.userData = action.payload.userData
      state.patchUserRequest = false
    },
    patchUserError(state) {
      state.patchUserRequest = false
      state.patchUserFailed = true
    },
  },
})
