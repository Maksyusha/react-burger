import {
  ADD_CHOSEN_INGREDIENT,
  DELETE_CHOSEN_INGREDIENT,
  SORT_CHOSEN_INGREDIENTS,
} from '../actions/burger-constructor';



const inititalState = {
  chosenBun: null,
  chosenIngredients: [],
  totalPrice: 0,
}

export const burgerConstructorReducer = (state = inititalState, action) => {
  switch(action.type) {
    case ADD_CHOSEN_INGREDIENT: {
      if (action.ingredient.type === 'bun') {
        return state.chosenBun !== null
        ? {
          ...state,
          totalPrice: state.totalPrice - state.chosenBun.price * 2 + action.ingredient.price * 2,
          chosenBun: action.ingredient
        }
        : {
          ...state,
          totalPrice: state.totalPrice + action.ingredient.price * 2,
          chosenBun: action.ingredient
        }
      } else {
        return {
          ...state,
          totalPrice: state.totalPrice + action.ingredient.price,
          chosenIngredients: [...state.chosenIngredients, action.ingredient]
        }
      }
    }
    case DELETE_CHOSEN_INGREDIENT: {
      const copyChosenIngredients = [...state.chosenIngredients];
      copyChosenIngredients.splice(action.index, 1);

      return {
        ...state,
        chosenIngredients: copyChosenIngredients,
        totalPrice: state.totalPrice - action.ingredient.price
      }
    }
    case SORT_CHOSEN_INGREDIENTS: {
      const copyChosenIngredients = [...state.chosenIngredients]
      const changedIngredient = copyChosenIngredients.splice(action.hoverIndex, 1, state.chosenIngredients[action.dragIndex])
      copyChosenIngredients.splice(action.dragIndex, 1, changedIngredient[0]);

      return {
        ...state,
        chosenIngredients: copyChosenIngredients
      }
    }
    default: {
      return state;
    }
  }
}
