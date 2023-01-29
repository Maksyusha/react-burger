import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TUser, TUserResponse } from '../types/data'
import { deleteCookie, getCookie, setCookie } from '../utils'
import {
  getLogoutRequestApi,
  getUserRequestApi,
  patchUserRequestApi,
  sendAuthorizationRequestApi,
  sendRegistrationRequestApi,
} from '../api'
import { AppThunk } from '../types'

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
  user: TUser | null
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
  user: null,
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
        user: TUser
      }>
    ) {
      setCookie('accessToken', action.payload.accessToken)
      setCookie('refreshToken', action.payload.refreshToken)

      state.registrationRequest = false
      state.user = action.payload.user
    },
    sendRegistrationError(state) {
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
        user: TUser
      }>
    ) {
      setCookie('accessToken', action.payload.accessToken)
      setCookie('refreshToken', action.payload.refreshToken)

      state.authorizationRequest = false
      state.user = action.payload.user
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

      state.user = null
      state.getLogoutRequest = false
    },
    getLogoutError(state) {
      state.getLogoutRequest = false
      state.getLogoutFailed = true
    },
    getUserRequest(state) {
      state.getUserRequest = true
    },
    getUserSuccess(state, action: PayloadAction<{ user: TUser }>) {
      state.user = action.payload.user
      state.getUserRequest = false
    },
    getUserError(state) {
      state.getUserRequest = false
      state.getUserFailed = true
    },
    patchUserRequest(state) {
      state.patchUserRequest = true
    },
    patchUserSuccess(state, action: PayloadAction<{ user: TUser }>) {
      state.user = action.payload.user
      state.patchUserRequest = false
    },
    patchUserError(state) {
      state.patchUserRequest = false
      state.patchUserFailed = true
    },
  },
})

export const {
  authChecked,
  sendRegistrationRequest,
  sendRegistrationSuccess,
  sendRegistrationError,
  sendAuthorizationRequest,
  sendAuthorizationSuccess,
  sendAuthorizationError,
  getLogoutRequest,
  getLogoutSuccess,
  getLogoutError,
  getUserRequest,
  getUserSuccess,
  getUserError,
  patchUserRequest,
  patchUserSuccess,
  patchUserError,
} = userSlice.actions

export const sendRegistration = (userData: TUser): AppThunk => (dispatch) => {
  dispatch(sendRegistrationRequest())
  sendRegistrationRequestApi(userData)
    .then((data: TUserResponse) => {
      dispatch(
        sendRegistrationSuccess({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
        })
      )
      dispatch(authChecked())
    })
    .catch(() => {
      dispatch(sendRegistrationError())
      dispatch(authChecked())
    })
}

export const sendAuthorization = (userData: TUser): AppThunk => (dispatch) => {
  dispatch(sendAuthorizationRequest())
  sendAuthorizationRequestApi(userData)
    .then((data: TUserResponse) => {
      dispatch(
        sendAuthorizationSuccess({
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
          user: data.user,
        })
      )
      dispatch(authChecked())
    })
    .catch(() => {
      dispatch(sendAuthorizationError())
      dispatch(authChecked())
    })
}

export const getLogout = (): AppThunk => (dispatch) => {
  dispatch(getLogoutRequest())
  getLogoutRequestApi()
    .then(() => dispatch(getLogoutSuccess()))
    .catch(() => dispatch(getLogoutError()))
}

export const getUser = (): AppThunk => (dispatch) => {
  dispatch(getUserRequest())
  getUserRequestApi()
    .then((data: TUserResponse) =>
      dispatch(getUserSuccess({ user: data.user }))
    )
    .catch(() => dispatch(getUserError()))
}

export const patchUser = (userData: TUser): AppThunk => (dispatch) => {
  dispatch(patchUserRequest())
  patchUserRequestApi(userData)
    .then((data: TUserResponse) =>
      dispatch(patchUserSuccess({ user: data.user }))
    )
    .catch(() => dispatch(patchUserError()))
}

export const checkAuth = (): AppThunk => (dispatch) => {
  if (getCookie('accessToken') || getCookie('refreshToken')) {
    dispatch(getUser())
    dispatch(authChecked())
  } else {
    dispatch(authChecked())
  }
}
