import { getCookie, setCookie } from './utils'

export const wsUrl = 'wss://norma.nomoreparties.space/orders'

const url = 'https://norma.nomoreparties.space/api/'

function unauthPostOptions(data) {
  return {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }
}

function onResponse(res) {
  return res.ok ? res.json() : Promise.reject(res.status)
}

function request(url, options) {
  return fetch(url, options).then(onResponse)
}

export function refreshToken() {
  return request(
    url + 'auth/token',
    unauthPostOptions({
      token: getCookie('refreshToken'),
    })
  ).then((data) => {
    setCookie('accessToken', data.accessToken)
    setCookie('refreshToken', data.refreshToken)
  })
}

export function fetchWithRefresh(url, options) {
  return request(url, options).catch((err) => {
    if (err === 401) {
      refreshToken().then(() => {
        options.headers.authorization = getCookie('accessToken')
        return fetch(url, options).then((res) => onResponse(res))
      })
    }
  })
}

export function sendRegistrationRequestApi(userData) {
  return request(url + 'auth/register', unauthPostOptions(userData))
}

export function sendAuthorizationRequestApi(userData) {
  return request(url + 'auth/login', unauthPostOptions(userData))
}

export function forgotPasswordApi(email) {
  return request(url + 'password-reset', unauthPostOptions(email))
}

export function resetPasswordApi(data) {
  return request(url + 'password-reset/reset', unauthPostOptions(data))
}

export function getLogoutRequestApi() {
  return request(
    url + 'auth/logout',
    unauthPostOptions({
      token: getCookie('refreshToken'),
    })
  )
}

export function getIngredientsRequestApi() {
  return request(url + 'ingredients', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  })
}

export function getUserApi() {
  return fetchWithRefresh(url + 'auth/user', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
      authorization: getCookie('accessToken'),
    },
  })
}

export function patchUserApi(userData) {
  return fetchWithRefresh(url + 'auth/user', {
    method: 'PATCH',
    headers: {
      'Content-type': 'application/json',
      authorization: getCookie('accessToken'),
    },
    body: JSON.stringify(userData),
  })
}

export function sendOrderRequestApi(data) {
  return fetchWithRefresh(url + 'orders', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      authorization: getCookie('accessToken'),
    },
    body: JSON.stringify(data),
  })
}
