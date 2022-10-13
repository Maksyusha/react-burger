const url = 'https://norma.nomoreparties.space/api/ingredients';

function onResponse(res) {
  return res.ok ? res.json() : Promise.reject(res.status);
}

function getIngredientsData() {
  return fetch(url, {
    method: 'GET',
    headers: {
      'Content-type': 'application/json'
    }
  })
  .then((res) => onResponse(res))
}



export {getIngredientsData};
