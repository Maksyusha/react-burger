import {
  sendAuthorizationRequest,
  sendRegistrationRequest,
  getUserApi,
  patchUserApi,
  getLogoutRequest,
} from '../api'
import { getCookie } from '../utils'

export const SEND_REGISTRATION_REQUEST = 'SEND_REGISTRATION_REQUEST'
export const SEND_REGISTRATION_SUCCESS = 'SEND_REGISTRATION_SUCCESS'
export const SEND_REGISTRATION_ERROR = 'SEND_REGISTRATION_ERROR'
export const SEND_AUTHORIZATION_REQUEST = 'SEND_AUTHORIZATION_REQUEST'
export const SEND_AUTHORIZATION_SUCCESS = 'SEND_AUTHORIZATION_SUCCESS'
export const SEND_AUTHORIZATION_ERROR = 'SEND_AUTHORIZATION_ERROR'
export const GET_LOGOUT_REQUEST = 'GET_LOGOUT_REQUEST'
export const GET_LOGOUT_SUCCESS = 'GET_LOGOUT_SUCCESS'
export const GET_LOGOUT_ERROR = 'GET_LOGOUT_ERROR'
export const GET_USER_REQUEST = 'GET_USER_REQUEST'
export const GET_USER_SUCCESS = 'GET_USER_SUCCESS'
export const GET_USER_ERROR = 'GET_USER_ERROR'
export const PATCH_USER_REQUEST = 'PATCH_USER_REQUEST'
export const PATCH_USER_SUCCESS = 'PATCH_USER_SUCCESS'
export const PATCH_USER_ERROR = 'PATCH_USER_ERROR'
export const AUTH_CHECKED = 'AUTH_CHECKED'

export function sendRegistration(userData) {
  return function (dispatch) {
    dispatch({ type: SEND_REGISTRATION_REQUEST })
    sendRegistrationRequest(userData)
      .then((data) => {
        dispatch({
          type: SEND_REGISTRATION_SUCCESS,
          data: data,
        })
        dispatch({
          type: AUTH_CHECKED,
        })
      })
      .catch(() => {
        dispatch({
          type: SEND_REGISTRATION_ERROR,
        })
        dispatch({
          type: AUTH_CHECKED,
        })
      })
  }
}

export function sendAuthorization(userData) {
  return function (dispatch) {
    dispatch({ type: SEND_AUTHORIZATION_REQUEST })
    sendAuthorizationRequest(userData)
      .then((data) => {
        dispatch({
          type: SEND_AUTHORIZATION_SUCCESS,
          data: data,
        })
        dispatch({
          type: AUTH_CHECKED,
        })
      })
      .catch(() => {
        dispatch({
          type: SEND_AUTHORIZATION_ERROR,
        })
        dispatch({
          type: AUTH_CHECKED,
        })
      })
  }
}

export function getLogout() {
  return function (dispatch) {
    dispatch({ type: GET_LOGOUT_REQUEST })
    getLogoutRequest()
      .then(() => {
        dispatch({
          type: GET_LOGOUT_SUCCESS,
        })
      })
      .catch(() => {
        dispatch({
          type: GET_LOGOUT_ERROR,
        })
      })
  }
}

export function getUser() {
  return function (dispatch) {
    dispatch({ type: GET_USER_REQUEST })
    return getUserApi()
      .then((data) => {
        dispatch({
          type: GET_USER_SUCCESS,
          user: data.user,
        })
      })
      .catch(() => {
        dispatch({
          type: GET_USER_ERROR,
        })
      })
  }
}

export function patchUser(userData) {
  return function (dispatch) {
    dispatch({ type: PATCH_USER_REQUEST })
    return patchUserApi(userData)
      .then((data) => {
        dispatch({
          type: PATCH_USER_SUCCESS,
          user: data.user,
        })
      })
      .catch(() =>
        dispatch({
          type: PATCH_USER_ERROR,
        })
      )
  }
}

export function checkAuth() {
  return function (dispatch) {
    if (getCookie('accessToken') || getCookie('refreshToken')) {
      dispatch(getUser()).finally(() => {
        dispatch({ type: AUTH_CHECKED })
      })
    } else {
      dispatch({ type: AUTH_CHECKED })
    }
  }
}
