import {
  sendAuthorizationRequestApi,
  sendRegistrationRequestApi,
  getUserApi,
  patchUserApi,
  getLogoutRequestApi,
} from '../api'
import { getCookie } from '../utils'
import {
  SEND_REGISTRATION_REQUEST,
  SEND_REGISTRATION_SUCCESS,
  SEND_REGISTRATION_ERROR,
  SEND_AUTHORIZATION_REQUEST,
  SEND_AUTHORIZATION_SUCCESS,
  SEND_AUTHORIZATION_ERROR,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_ERROR,
  AUTH_CHECKED,
} from '../constants/user'
import { TUserData, TUserResponse } from '../types/data'
import { AppDispatch, AppThunk } from '../types'

export interface IAuthCheckedAction {
  readonly type: typeof AUTH_CHECKED
}

export interface ISendRegistrationRequestAction {
  readonly type: typeof SEND_REGISTRATION_REQUEST
}

export interface ISendRegistrationSuccessAction {
  readonly type: typeof SEND_REGISTRATION_SUCCESS
  readonly data: TUserResponse
}

export interface ISendRegistrationErrorAction {
  readonly type: typeof SEND_REGISTRATION_ERROR
}

export interface ISendAuthorizationRequestAction {
  readonly type: typeof SEND_AUTHORIZATION_REQUEST
}

export interface ISendAuthorizationSuccessAction {
  readonly type: typeof SEND_AUTHORIZATION_SUCCESS
  readonly data: TUserResponse
}

export interface ISendAuthorizationErrorAction {
  readonly type: typeof SEND_AUTHORIZATION_ERROR
}

export interface IGetLogoutRequestAction {
  readonly type: typeof GET_LOGOUT_REQUEST
}

export interface IGetLogoutSuccessAction {
  readonly type: typeof GET_LOGOUT_SUCCESS
}

export interface IGetLogoutErrorAction {
  readonly type: typeof GET_LOGOUT_ERROR
}

export interface IGetUserRequestAction {
  readonly type: typeof GET_USER_REQUEST
}

export interface IGetUserSuccessAction {
  readonly type: typeof GET_USER_SUCCESS
  readonly userData: TUserData
}

export interface IGetUserErrorAction {
  readonly type: typeof GET_USER_ERROR
}

export interface IPatchUserRequestAction {
  readonly type: typeof PATCH_USER_REQUEST
}

export interface IPatchUserSuccessAction {
  readonly type: typeof PATCH_USER_SUCCESS
  readonly userData: TUserData
}

export interface IPatchUserErrorAction {
  readonly type: typeof PATCH_USER_ERROR
}

export type TUserActions =
  | IAuthCheckedAction
  | ISendRegistrationRequestAction
  | ISendRegistrationSuccessAction
  | ISendRegistrationErrorAction
  | ISendAuthorizationRequestAction
  | ISendAuthorizationSuccessAction
  | ISendAuthorizationErrorAction
  | IGetLogoutRequestAction
  | IGetLogoutSuccessAction
  | IGetLogoutErrorAction
  | IGetUserRequestAction
  | IGetUserSuccessAction
  | IGetUserErrorAction
  | IPatchUserRequestAction
  | IPatchUserSuccessAction
  | IPatchUserErrorAction

export function authChecked(): IAuthCheckedAction {
  return {
    type: AUTH_CHECKED,
  }
}

export function sendRegistrationRequest(): ISendRegistrationRequestAction {
  return {
    type: SEND_REGISTRATION_REQUEST,
  }
}

export function sendRegistrationSuccess(
  data: TUserResponse
): ISendRegistrationSuccessAction {
  return {
    type: SEND_REGISTRATION_SUCCESS,
    data: data,
  }
}

export function sendRegistrationError(): ISendRegistrationErrorAction {
  return {
    type: SEND_REGISTRATION_ERROR,
  }
}

export function sendAuthorizationRequest(): ISendAuthorizationRequestAction {
  return {
    type: SEND_AUTHORIZATION_REQUEST,
  }
}

export function sendAuthorizationSuccess(
  data: TUserResponse
): ISendAuthorizationSuccessAction {
  return {
    type: SEND_AUTHORIZATION_SUCCESS,
    data: data,
  }
}

export function sendAuthorizationError(): ISendAuthorizationErrorAction {
  return {
    type: SEND_AUTHORIZATION_ERROR,
  }
}

export function getLogoutRequest(): IGetLogoutRequestAction {
  return {
    type: GET_LOGOUT_REQUEST,
  }
}

export function getLogoutSuccess(): IGetLogoutSuccessAction {
  return {
    type: GET_LOGOUT_SUCCESS,
  }
}

export function getLogoutError(): IGetLogoutErrorAction {
  return {
    type: GET_LOGOUT_ERROR,
  }
}

export function getUserRequest(): IGetUserRequestAction {
  return {
    type: GET_USER_REQUEST,
  }
}

export function getUserSuccess(data: TUserData): IGetUserSuccessAction {
  return {
    type: GET_USER_SUCCESS,
    userData: data,
  }
}

export function getUserError(): IGetUserErrorAction {
  return {
    type: GET_USER_ERROR,
  }
}

export function patchUserRequest(): IPatchUserRequestAction {
  return {
    type: PATCH_USER_REQUEST,
  }
}

export function patchUserSuccess(data: TUserData): IPatchUserSuccessAction {
  return {
    type: PATCH_USER_SUCCESS,
    userData: data,
  }
}

export function patchUserError(): IPatchUserErrorAction {
  return {
    type: PATCH_USER_ERROR,
  }
}

export const sendRegistration: AppThunk =
  (userData: TUserData) => (dispatch: AppDispatch) => {
    dispatch(sendRegistrationRequest())
    sendRegistrationRequestApi(userData)
      .then((data: TUserResponse) => {
        dispatch(sendRegistrationSuccess(data))
        dispatch(authChecked())
      })
      .catch(() => {
        dispatch(sendRegistrationError())
        dispatch(authChecked())
      })
  }

export const sendAuthorization: AppThunk =
  (userData: TUserData) => (dispatch: AppDispatch) => {
    dispatch(sendAuthorizationRequest())
    sendAuthorizationRequestApi(userData)
      .then((data: TUserResponse) => {
        dispatch(sendAuthorizationSuccess(data))
        dispatch(authChecked())
      })
      .catch(() => {
        dispatch(sendAuthorizationError())
        dispatch(authChecked())
      })
  }

export const getLogout: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getLogoutRequest())
  getLogoutRequestApi()
    .then(() => dispatch(getLogoutSuccess()))
    .catch(() => dispatch(getLogoutError()))
}

export const getUser: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getUserRequest())
  getUserApi()
    .then((data: TUserResponse) => dispatch(getUserSuccess(data.user)))
    .catch(() => dispatch(getUserError()))
}

export const patchUser: AppThunk =
  (userData: TUserData) => (dispatch: AppDispatch) => {
    dispatch(patchUserRequest())
    patchUserApi(userData)
      .then((data: TUserResponse) => dispatch(patchUserSuccess(data.user)))
      .catch(() => dispatch(patchUserError()))
  }

export const checkAuth: AppThunk = () => (dispatch: AppDispatch) => {
  if (getCookie('accessToken') || getCookie('refreshToken')) {
    dispatch(getUser())
    dispatch(authChecked())
  } else {
    dispatch(authChecked())
  }
}
