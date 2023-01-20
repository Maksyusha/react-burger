import {
  ADD_CHOSEN_INGREDIENT,
  DELETE_CHOSEN_INGREDIENT,
  SORT_CHOSEN_INGREDIENTS,
  CLEAR_CHOSEN_INGREDIENTS,
} from '../constants/burger-constructor'
import { TBurgerConstructorActions } from '../actions/burger-constructor'
import { TIngredient } from '../types/data'

type TInitialState = {
  chosenBun: TIngredient | null
  chosenIngredients: TIngredient[]
}

const initialState: TInitialState = {
  chosenBun: null,
  chosenIngredients: [],
}

export const burgerConstructorReducer = (
  state = initialState,
  action: TBurgerConstructorActions
): TInitialState => {
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
