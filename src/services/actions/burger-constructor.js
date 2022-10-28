import { postChosenIngredientsRequest } from "../api";

export const ADD_CHOSEN_INGREDIENT = 'ADD_CHOSEN_INGREDIENT';
export const DELETE_CHOSEN_INGREDIENT = 'DELETE_CHOSEN_INGREDIENT';
export const SORT_CHOSEN_INGREDIENTS = 'SORT_CHOSEN_INGREDIENTS';

export const FILL_ORDER_LIST = 'FILL_ORDER_LIST';

export const POST_INGREDIENTS_REQUEST = 'POST_INGREDIENTS_REQUEST';
export const POST_INGREDIENTS_SUCCESS = 'POST_INGREDIENTS_SUCCESS';
export const POST_INGREDIENTS_ERROR = 'POST_INGREDIENTS_ERROR';

export const SHOW_ORDER_MODAL = 'SHOW_ORDER_MODAL';
export const HIDE_OREDER_MODAL = 'HIDE_ORDER_MODAL';

export function postChosenIngredients(data) {
  return function(dispatch) {
    dispatch({type: POST_INGREDIENTS_REQUEST});
    postChosenIngredientsRequest(data)
    .then((data) => {
      dispatch({
        type: POST_INGREDIENTS_SUCCESS,
        orderNumber: data.order.number,
        orderName: data.name
      });
    }).catch((err) => {
      console.log(err);
      dispatch({
        type: POST_INGREDIENTS_ERROR
      });
    });
  }
}
