import { postChosenIngredientsRequest } from '../api'

export const POST_INGREDIENTS_REQUEST = 'POST_INGREDIENTS_REQUEST'
export const POST_INGREDIENTS_SUCCESS = 'POST_INGREDIENTS_SUCCESS'
export const POST_INGREDIENTS_ERROR = 'POST_INGREDIENTS_ERROR'

export const SHOW_ORDER_MODAL = 'SHOW_ORDER_MODAL'
export const HIDE_ORDER_MODAL = 'HIDE_ORDER_MODAL'

export function postChosenIngredients(data) {
  return function (dispatch) {
    dispatch({ type: POST_INGREDIENTS_REQUEST })
    postChosenIngredientsRequest(data)
      .then((data) => {
        dispatch({
          type: POST_INGREDIENTS_SUCCESS,
          orderNumber: data.order.number,
          orderName: data.name,
        })
      })
      .catch(() => {
        dispatch({
          type: POST_INGREDIENTS_ERROR,
        })
      })
  }
}
