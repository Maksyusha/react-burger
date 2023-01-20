import { TIngredient } from '../types/data'
import { v4 as uuidv4 } from 'uuid'
import {
  ADD_CHOSEN_INGREDIENT,
  DELETE_CHOSEN_INGREDIENT,
  SORT_CHOSEN_INGREDIENTS,
  CLEAR_CHOSEN_INGREDIENTS,
} from '../constants/burger-constructor'

export interface IAddChosenIngredientAction {
  readonly type: typeof ADD_CHOSEN_INGREDIENT
  readonly ingredient: TIngredient & {
    key: string
  }
}

export interface IDeleteChosenIngredientAction {
  readonly type: typeof DELETE_CHOSEN_INGREDIENT
  readonly index: number
}

export interface ISortChosenIngredientsAction {
  readonly type: typeof SORT_CHOSEN_INGREDIENTS
  readonly dragIndex: number
  readonly hoverIndex: number
}

export interface IClearChosenIngredientsAction {
  readonly type: typeof CLEAR_CHOSEN_INGREDIENTS
}

export type TBurgerConstructorActions =
  | IAddChosenIngredientAction
  | IDeleteChosenIngredientAction
  | ISortChosenIngredientsAction
  | IClearChosenIngredientsAction

export function addChosenIngredient(
  data: TIngredient
): IAddChosenIngredientAction {
  return { type: ADD_CHOSEN_INGREDIENT, ingredient: { ...data, key: uuidv4() } }
}

export function deleteChosenIngredient(
  index: number
): IDeleteChosenIngredientAction {
  return { type: DELETE_CHOSEN_INGREDIENT, index: index }
}

export function sortChosenIngredients(
  dragIndex: number,
  hoverIndex: number
): ISortChosenIngredientsAction {
  return {
    type: SORT_CHOSEN_INGREDIENTS,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  }
}

export function clearChosenIngredients(): IClearChosenIngredientsAction {
  return {
    type: CLEAR_CHOSEN_INGREDIENTS,
  }
}
