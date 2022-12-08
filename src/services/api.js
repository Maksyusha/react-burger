const url = 'https://norma.nomoreparties.space/api/'

function onResponse(res) {
  return res.ok ? res.json() : Promise.reject(res.status)
}

export function getBurgerIngredientsRequest() {
  return fetch(url + 'ingredients', {
    method: 'GET',
    headers: {
      'Content-type': 'application/json',
    },
  }).then((res) => onResponse(res))
}

export function sendOrderRequest(data) {
  return fetch(url + 'orders', {
    method: 'POST',
    headers: {
      'Content-type': 'application/json',
    },
    body: JSON.stringify(data),
  }).then((res) => onResponse(res))
}
