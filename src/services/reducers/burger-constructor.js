import {
  ADD_CHOSEN_INGREDIENT,
  DELETE_CHOSEN_INGREDIENT,
  SORT_CHOSEN_INGREDIENTS,
  CLEAR_CHOSEN_INGREDIENTS,
} from '../actions/burger-constructor'

const initialState = {
  chosenBun: null,
  chosenIngredients: [],
}

export const burgerConstructorReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_CHOSEN_INGREDIENT: {
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          chosenBun: action.ingredient,
        }
      } else {
        return {
          ...state,
          chosenIngredients: [...state.chosenIngredients, action.ingredient],
        }
      }
    }
    case DELETE_CHOSEN_INGREDIENT: {
      const copyChosenIngredients = [...state.chosenIngredients]
      copyChosenIngredients.splice(action.index, 1)

      return {
        ...state,
        chosenIngredients: copyChosenIngredients,
      }
    }
    case SORT_CHOSEN_INGREDIENTS: {
      const copyChosenIngredients = [...state.chosenIngredients]
      const changedIngredient = copyChosenIngredients.splice(
        action.hoverIndex,
        1,
        state.chosenIngredients[action.dragIndex]
      )
      copyChosenIngredients.splice(action.dragIndex, 1, changedIngredient[0])

      return {
        ...state,
        chosenIngredients: copyChosenIngredients,
      }
    }
    case CLEAR_CHOSEN_INGREDIENTS: {
      return {
        chosenBun: null,
        chosenIngredients: [],
      }
    }
    default: {
      return state
    }
  }
}
