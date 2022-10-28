const apiUrl = 'https://norma.nomoreparties.space/api/ingredients';
const apiGetOptions = {
  method: 'GET',
  headers: {
    'Content-type': 'application/json'
  }
}

function onResponse(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

function request(url, options) {
  return fetch(url, options)
  .then((res) => onResponse(res))
}


export {apiUrl, apiGetOptions, request};
