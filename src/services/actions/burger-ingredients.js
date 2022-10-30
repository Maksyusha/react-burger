import { getBurgerIngredientsRequest } from '../api'

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST'
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS'
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR'

export const INCREASE_INGREDIENT_VALUE = 'INCREASE_INGREDIENT_VALUE'
export const DECREASE_INGREDIENT_VALUE = 'DECREASE_INGREDIENT_VALUE'

export function increaseIngredientValue(ingredient) {
  return { type: INCREASE_INGREDIENT_VALUE, ingredient: ingredient }
}

export function decreaseIngredientValue(ingredient) {
  return { type: DECREASE_INGREDIENT_VALUE, ingredient: ingredient }
}

export function getBurgerIngredients() {
  return function (dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST,
    })
    getBurgerIngredientsRequest()
      .then((res) => {
        dispatch({
          type: GET_INGREDIENTS_SUCCESS,
          ingredients: res.data.map((item) => {
            return { ...item, qty: 0 }
          }),
        })
      })
      .catch(() => {
        dispatch({
          type: GET_INGREDIENTS_ERROR,
        })
      })
  }
}
