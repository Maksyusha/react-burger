import { getCookie, setCookie } from './utils'

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

export function refreshToken() {
  return fetch(
    url + 'auth/token',
    unauthPostOptions({
      token: getCookie('refreshToken'),
    })
  )
    .then((res) => onResponse(res))
    .then((data) => {
      setCookie('accessToken', data.accessToken)
      setCookie('refreshToken', data.refreshToken)
    })
}

export function fetchWithRefresh(url, options) {
  return fetch(url, options)
    .then((res) => onResponse(res))
    .catch((err) => {
      if (err === 403) {
        refreshToken().then((tokens) => {
          options.headers.authorization = tokens.accessToken

          return fetch(url, options)
        })
      }
    })
}

export function sendRegistrationRequest(userData) {
  return fetch(url + 'auth/register', unauthPostOptions(userData)).then((res) =>
    onResponse(res)
  )
}

export function sendAuthorizationRequest(userData) {
  return fetch(url + 'auth/login', unauthPostOptions(userData)).then((res) =>
    onResponse(res)
  )
}

export function forgotPasswordApi(email) {
  return fetch(url + 'password-reset', unauthPostOptions(email)).then((res) =>
    onResponse(res)
  )
}

export function resetPasswordApi(data) {
  return fetch(url + 'password-reset/reset', unauthPostOptions(data)).then(
    (res) => onResponse(res)
  )
}

export function getLogoutRequest() {
  return fetch(
    url + 'auth/logout',
    unauthPostOptions({
      token: getCookie('refreshToken'),
    })
  ).then((res) => onResponse(res))
}

export function getBurgerIngredientsRequest() {
  return fetch(url + 'ingredients', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => onResponse(res))
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

export function sendOrderRequest(data) {
  return fetchWithRefresh(url + 'orders', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
      authorization: getCookie('accessToken'),
    },
    body: JSON.stringify(data),
  })
}
