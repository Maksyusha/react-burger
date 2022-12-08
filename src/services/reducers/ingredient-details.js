import {
  SET_INGREDIENT_MODAL,
  SHOW_INGREDIENT_MODAL,
  HIDE_INGREDIENT_MODAL,
} from '../actions/ingredient-details'

const inititalState = {
  ingredientModal: null,
  ingredientModalIsOpened: false,
}

export const ingredientDetailsReducer = (state = inititalState, action) => {
  switch (action.type) {
    case SET_INGREDIENT_MODAL: {
      return {
        ...state,
        ingredientModal: action.ingredient,
      }
    }
    case SHOW_INGREDIENT_MODAL: {
      return {
        ...state,
        ingredientModalIsOpened: true,
      }
    }
    case HIDE_INGREDIENT_MODAL: {
      return {
        ...state,
        ingredientModalIsOpened: false,
      }
    }
    default: {
      return state
    }
  }
}
