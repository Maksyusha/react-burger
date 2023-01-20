import { combineReducers } from 'redux'
import { burgerIngredientsReducer } from './burger-ingredients'
import { burgerConstructorReducer } from './burger-constructor'
import { orderDetailsReducer } from './order-details'
import { userReducer } from './user'
import { wsReducer } from './ws-reducer'

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  orderDetails: orderDetailsReducer,
  user: userReducer,
  ws: wsReducer,
})
