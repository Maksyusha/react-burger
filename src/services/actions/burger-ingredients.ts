import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  INCREASE_INGREDIENT_VALUE,
  DECREASE_INGREDIENT_VALUE,
} from '../constants/burger-ingredients'
import { getIngredientsRequestApi } from '../api'
import { AppDispatch, AppThunk } from '../types'
import { TIngredient } from '../types/data'

export interface IGetIngredientsRequestAction {
  readonly type: typeof GET_INGREDIENTS_REQUEST
}

export interface IGetIngredientsSuccessAction {
  readonly type: typeof GET_INGREDIENTS_SUCCESS
  readonly ingredients: (TIngredient & { qty: number })[]
}

export interface IGetIngredientsErrorAction {
  readonly type: typeof GET_INGREDIENTS_ERROR
}

export interface IIncreaseIngredientValueAction {
  readonly type: typeof INCREASE_INGREDIENT_VALUE
  readonly ingredient: TIngredient
}

export interface IDecreaseIngredientValueAction {
  readonly type: typeof DECREASE_INGREDIENT_VALUE
  readonly ingredient: TIngredient
}

export type TBurgerIngredientsActions =
  | IGetIngredientsRequestAction
  | IGetIngredientsSuccessAction
  | IGetIngredientsErrorAction
  | IIncreaseIngredientValueAction
  | IDecreaseIngredientValueAction

export function getIngredientsRequest(): IGetIngredientsRequestAction {
  return { type: GET_INGREDIENTS_REQUEST }
}

export function getIngredientsSuccess(
  data: TIngredient[]
): IGetIngredientsSuccessAction {
  return {
    type: GET_INGREDIENTS_SUCCESS,
    ingredients: data.map((item) => {
      return { ...item, qty: 0 }
    }),
  }
}

export function getIngredientsError(): IGetIngredientsErrorAction {
  return { type: GET_INGREDIENTS_ERROR }
}

export function increaseIngredientValue(
  ingredient: TIngredient
): IIncreaseIngredientValueAction {
  return { type: INCREASE_INGREDIENT_VALUE, ingredient: ingredient }
}

export function decreaseIngredientValue(
  ingredient: TIngredient
): IDecreaseIngredientValueAction {
  return { type: DECREASE_INGREDIENT_VALUE, ingredient: ingredient }
}

export const getBurgerIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  dispatch(getIngredientsRequest())
  getIngredientsRequestApi()
    .then((res) => dispatch(getIngredientsSuccess(res.data)))
    .catch(() => dispatch(getIngredientsError()))
}
