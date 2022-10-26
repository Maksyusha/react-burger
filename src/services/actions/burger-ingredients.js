import { getIngredientsRequest } from "../api";

export const GET_INGREDIENTS_REQUEST = 'GET_INGREDIENTS_REQUEST';
export const GET_INGREDIENTS_SUCCESS = 'GET_INGREDIENTS_SUCCESS';
export const GET_INGREDIENTS_FAILED = 'GET_INGREDIENTS_FAILED';

export const INCREASE_INGREDIENT_VALUE = 'INCREASE_INGREDIENT_VALUE';
export const DECREASE_INGREDIENT_VALUE = 'DECREASE_INGREDIENT_VALUE';

export const SET_INGREDIENT_MODAL = 'SET_INGREDIENT_MODAL';
export const SHOW_INGREDIENT_MODAL = 'SHOW_INGREDIENT_MODAL';
export const HIDE_INGREDIENT_MODAL = 'HIDE_INGREDIENT_MODAL';

export function getBurgerIngredients() {
  return function(dispatch) {
    dispatch({
      type: GET_INGREDIENTS_REQUEST
    });
    getIngredientsRequest()
    .then((res) => {
      dispatch({
        type: GET_INGREDIENTS_SUCCESS,
        ingredients: res.data
      });
    }).catch((err) => {
      console.log(err);
      dispatch({
        type: GET_INGREDIENTS_FAILED
      });
    });
  }
}
