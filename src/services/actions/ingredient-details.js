export const SET_INGREDIENT_MODAL = 'SET_INGREDIENT_MODAL'
export const SHOW_INGREDIENT_MODAL = 'SHOW_INGREDIENT_MODAL'
export const HIDE_INGREDIENT_MODAL = 'HIDE_INGREDIENT_MODAL'

export function setIngredientModal(ingredient) {
  return { type: SET_INGREDIENT_MODAL, ingredient: ingredient }
}

export function showIngredientModal() {
  return { type: SHOW_INGREDIENT_MODAL }
}

export function hideIngredientModal() {
  return { type: HIDE_INGREDIENT_MODAL }
}
