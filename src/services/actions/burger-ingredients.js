import { getIngredientsRequest } from "../api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_ERROR = 'GET_INGREDIENTS_ERROR';

export const INCREASE_INGREDIENT_VALUE = 'INCREASE_INGREDIENT_VALUE';
export const DECREASE_INGREDIENT_VALUE = 'DECREASE_INGREDIENT_VALUE';

export function getBurgerIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest()
    .then((res) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data.map((item) => {
          return {...item, 'qty': 0};
        })
      });
    }).catch((err) => {
      console.log(err);
      dispatch({
        type: GET_INGREDIENTS_ERROR
      });
    });
  }
}
