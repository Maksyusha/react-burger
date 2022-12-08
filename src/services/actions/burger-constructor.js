import { v4 as uuidv4 } from 'uuid'

export const ADD_CHOSEN_INGREDIENT = 'ADD_CHOSEN_INGREDIENT'
export const DELETE_CHOSEN_INGREDIENT = 'DELETE_CHOSEN_INGREDIENT'
export const SORT_CHOSEN_INGREDIENTS = 'SORT_CHOSEN_INGREDIENTS'

export function addChosenIngredient(data) {
  return { type: ADD_CHOSEN_INGREDIENT, ingredient: { ...data, key: uuidv4() } }
}

export function deleteChosenIngredient(index) {
  return { type: DELETE_CHOSEN_INGREDIENT, index: index }
}

export function sortChosenIngredient(dragIndex, hoverIndex) {
  return {
    type: SORT_CHOSEN_INGREDIENTS,
    dragIndex: dragIndex,
    hoverIndex: hoverIndex,
  }
}
