import {
  ADD_CHOSEN_INGREDIENT,
  DELETE_CHOSEN_INGREDIENT,
  SORT_CHOSEN_INGREDIENTS,
  POST_INGREDIENTS_REQUEST,
  POST_INGREDIENTS_SUCCESS,
  POST_INGREDIENTS_FAILED,
  SHOW_ORDER_MODAL,
  HIDE_OREDER_MODAL
} from '../actions/burger-constructor';



const inititalState = {
  chosenBunIngredient: [],
  chosenOtherIngredients: [],
  totalPrice: 0,
  orderNumber: null,
  orderName: '',
  orderRequest: false,
  orderFailed: false,
  modalOrderIsOpened: false,
}

export const burgerConstructorReducer = (state = inititalState, action) => {
  switch(action.type) {
    case ADD_CHOSEN_INGREDIENT: {
      if (action.ingredient.type === 'bun') {
        return state.chosenBunIngredient[0] !== undefined
        ? {
          ...state,
          totalPrice: state.totalPrice - state.chosenBunIngredient[0].price * 2 + action.ingredient.price * 2,
          chosenBunIngredient: [action.ingredient]
        }
        : {
          ...state,
          totalPrice: state.totalPrice + action.ingredient.price * 2,
          chosenBunIngredient: [action.ingredient]
        }
      } else {
        return {
          ...state,
          totalPrice: state.totalPrice + action.ingredient.price,
          chosenOtherIngredients: [...state.chosenOtherIngredients, action.ingredient]
        }
      }
    }
    case DELETE_CHOSEN_INGREDIENT: {
      const copyChosenIngredients = [...state.chosenOtherIngredients]
      copyChosenIngredients.splice(action.index, 1)

      return {
        ...state,
        chosenOtherIngredients: copyChosenIngredients,
        totalPrice: state.totalPrice - action.ingredient.price
      }
    }
    case SORT_CHOSEN_INGREDIENTS: {
      const copyChosenIngredients = [...state.chosenOtherIngredients]
      const changedIngredient = copyChosenIngredients.splice(action.hoverIndex, 1, state.chosenOtherIngredients[action.dragIndex])
      copyChosenIngredients.splice(action.dragIndex, 1, changedIngredient[0]);

      return {
        ...state,
        chosenOtherIngredients: copyChosenIngredients
      }
    }
    case POST_INGREDIENTS_REQUEST: {
      return {
        ...state,
        orderRequest: true
      }
    }
    case POST_INGREDIENTS_SUCCESS: {
      return {
        ...state,
        orderNumber: action.orderNumber,
        orderName: action.orderName,
        orderRequest: false
      }
    }
    case POST_INGREDIENTS_FAILED: {
      return {
        ...state,
        orderRequest: false,
        orderFailed: true
      }
    }
    case SHOW_ORDER_MODAL: {
      return {
        ...state,
        modalOrderIsOpened: true
      }
    }
    case HIDE_OREDER_MODAL: {
      return {
        ...state,
        modalOrderIsOpened: false
      }
    }
    default: {
      return state;
    }
  }
}
