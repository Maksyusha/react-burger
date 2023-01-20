import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  INCREASE_INGREDIENT_VALUE,
  DECREASE_INGREDIENT_VALUE,
} from '../constants/burger-ingredients'
import { TIngredient } from '../types/data'
import { TBurgerIngredientsActions } from '../actions/burger-ingredients'

type TInitialState = {
  ingredients: (TIngredient & { qty: number })[]
  ingredientsRequest: boolean
  ingredientsFailed: boolean
}

const initialState: TInitialState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
}

export const burgerIngredientsReducer = (
  state = initialState,
  action: TBurgerIngredientsActions
): TInitialState => {
  switch (action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true,
      }
    }
    case GET_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        ingredients: action.ingredients,
        ingredientsRequest: false,
      }
    }
    case GET_INGREDIENTS_ERROR: {
      return {
        ...state,
        ingredientsFailed: true,
        ingredientsRequest: false,
      }
    }
    case INCREASE_INGREDIENT_VALUE: {
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          ingredients: [...state.ingredients].map((ingredient) => {
            return ingredient.type === 'bun' &&
              ingredient._id !== action.ingredient._id
              ? { ...ingredient, qty: 0 }
              : ingredient._id === action.ingredient._id
              ? { ...ingredient, qty: 1 }
              : ingredient
          }),
        }
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients].map((ingredient) =>
            ingredient._id === action.ingredient._id
              ? { ...ingredient, qty: ++ingredient.qty }
              : ingredient
          ),
        }
      }
    }
    case DECREASE_INGREDIENT_VALUE: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) =>
          ingredient._id === action.ingredient._id
            ? { ...ingredient, qty: --ingredient.qty }
            : ingredient
        ),
      }
    }
    default: {
      return state
    }
  }
}
