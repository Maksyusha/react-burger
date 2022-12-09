import {
  SEND_REGISTRATION_REQUEST,
  SEND_REGISTRATION_SUCCESS,
  SEND_REGISTRATION_ERROR,
  SEND_AUTHORIZATION_REQUEST,
  SEND_AUTHORIZATION_SUCCESS,
  SEND_AUTHORIZATION_ERROR,
  GET_USER_REQUEST,
  GET_USER_SUCCESS,
  GET_USER_ERROR,
  GET_LOGOUT_REQUEST,
  GET_LOGOUT_SUCCESS,
  GET_LOGOUT_ERROR,
  PATCH_USER_REQUEST,
  PATCH_USER_SUCCESS,
  PATCH_USER_ERROR,
  AUTH_CHECKED,
} from '../actions/user.js'

import { setCookie, deleteCookie } from '../utils.js'

const initialState = {
  isAuthChecked: false,
  registrationRequest: false,
  registrationError: false,
  authorizationRequest: false,
  authorizationError: false,
  getLogoutRequest: false,
  getLogoutError: false,
  getUserDataRequest: false,
  getUserDataError: false,
  patchUserDataRequest: false,
  patchUserDataError: false,
  userData: null,
}

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHECKED: {
      return {
        ...state,
        isAuthChecked: true,
      }
    }
    case SEND_REGISTRATION_REQUEST: {
      return {
        ...state,
        registrationRequest: true,
      }
    }
    case SEND_REGISTRATION_SUCCESS: {
      setCookie('accessToken', action.data.accessToken)
      setCookie('refreshToken', action.data.refreshToken)
      return {
        ...state,
        registrationRequest: false,
        userData: action.data.user,
      }
    }
    case SEND_REGISTRATION_ERROR: {
      return {
        ...state,
        registrationRequest: false,
        registrationError: true,
      }
    }
    case SEND_AUTHORIZATION_REQUEST: {
      return {
        ...state,
        authorizationRequest: true,
      }
    }
    case SEND_AUTHORIZATION_SUCCESS: {
      setCookie('accessToken', action.data.accessToken)
      setCookie('refreshToken', action.data.refreshToken)
      return {
        ...state,
        userData: action.data.user,
        authorizationRequest: false,
      }
    }
    case SEND_AUTHORIZATION_ERROR: {
      return {
        ...state,
        authorizationError: true,
        authorizationRequest: false,
      }
    }
    case GET_LOGOUT_REQUEST: {
      return {
        ...state,
        getLogoutRequest: true,
      }
    }
    case GET_LOGOUT_SUCCESS: {
      deleteCookie('accessToken')
      deleteCookie('refreshToken')
      return {
        ...state,
        userData: null,
        getLogoutRequest: false,
      }
    }
    case GET_LOGOUT_ERROR: {
      return {
        ...state,
        getLogoutError: true,
        getLogoutRequest: false,
      }
    }
    case GET_USER_REQUEST: {
      return {
        ...state,
        getUserDataRequest: true,
      }
    }
    case GET_USER_SUCCESS: {
      return {
        ...state,
        userData: action.user,
        getUserDataRequest: false,
      }
    }
    case GET_USER_ERROR: {
      return {
        ...state,
        getUserDataError: true,
        getUserDataRequest: false,
      }
    }
    case PATCH_USER_REQUEST: {
      return {
        ...state,
        patchUserDataRequest: true,
      }
    }
    case PATCH_USER_SUCCESS: {
      return {
        ...state,
        userData: action.user,
        patchUserDataRequest: false,
      }
    }
    case PATCH_USER_ERROR: {
      return {
        ...state,
        patchUserDataError: true,
        PATCH_USER_REQUEST: false,
      }
    }
    default: {
      return state
    }
  }
}
