import {
  GET_INGREDIENTS_REQUEST,
  GET_INGREDIENTS_SUCCESS,
  GET_INGREDIENTS_ERROR,
  INCREASE_INGREDIENT_VALUE,
  DECREASE_INGREDIENT_VALUE,
  SET_INGREDIENT_MODAL,
  SHOW_INGREDIENT_MODAL,
  HIDE_INGREDIENT_MODAL
} from '../actions/burger-ingredients';



const inititalState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
  ingredientModal: {},
  ingredientModalIsOpened: false,
}

export const burgerIngredientsReducer = (state = inititalState, action) => {
  switch(action.type) {
    case GET_INGREDIENTS_REQUEST: {
      return {
        ...state,
        ingredientsRequest: true
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
        ingredientsRequest: false
      }
    }
    case INCREASE_INGREDIENT_VALUE: {
      if (action.ingredient.type === 'bun') {
        return {
          ...state,
          ingredients: [...state.ingredients].map((ingredient) => {
            return (ingredient.type === 'bun' && ingredient._id !== action.ingredient._id)
            ? {...ingredient, '__v': 0}
            : (ingredient._id === action.ingredient._id)
            ? {...ingredient, '__v': 1}
            : ingredient;
          })
        }
      } else {
        return {
          ...state,
          ingredients: [...state.ingredients].map((ingredient) => ingredient._id === action.ingredient._id ? {...ingredient, '__v': ++ingredient.__v} : ingredient)
        }
      }
    }
    case DECREASE_INGREDIENT_VALUE: {
      return {
        ...state,
        ingredients: [...state.ingredients].map((ingredient) =>
          ingredient._id === action.ingredient._id ? {...ingredient, '__v': --ingredient.__v} : ingredient
        )
      }
    }
    case SET_INGREDIENT_MODAL: {
      return {
        ...state,
        ingredientModal: action.ingredient
      }
    }
    case SHOW_INGREDIENT_MODAL: {
      return {
        ...state,
        ingredientModalIsOpened: true
      }
    }
    case HIDE_INGREDIENT_MODAL: {
      return {
        ...state,
        ingredientModalIsOpened: false
      }
    }
    default: {
      return state;
    }
  }
}
