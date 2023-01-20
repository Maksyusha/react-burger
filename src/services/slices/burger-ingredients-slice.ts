import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TIngredient } from '../types/data'
import { ingredients } from '../../utils/data'

export type TBurgerIngredientsState = {
  ingredients: TIngredient[]
  ingredientsRequest: boolean
  ingredientsFailed: boolean
}

const initialState: TBurgerIngredientsState = {
  ingredients: [],
  ingredientsRequest: false,
  ingredientsFailed: false,
}

export const burgerIngredientsSlice = createSlice({
  name: 'burgerIngredients',
  initialState,
  reducers: {
    getIngredientsRequest: (state) => {
      state.ingredientsRequest = true
    },
    getIngredientsSuccess: (
      state,
      action: PayloadAction<TIngredient[]>
    ) => {
      state.ingredientsRequest = false
      state.ingredients = action.payload
    },
    getIngredientsError: (state) => {
      state.ingredientsRequest = false
      state.ingredientsFailed = true
    },
    increaseIngredientValue: (
      state,
      action: PayloadAction<TIngredient>
    ) => {
      if (action.payload.type === 'bun') {
        for (let i: number = 0; i <= state.ingredients.length; i++) {
          if ((state.ingredients[i]._id = action.payload._id)) {
            state.ingredients[i].qty = 1
            break
          }
        }
      } else {
        for (let i: number = 0; i <= state.ingredients.length; i++) {
          if ((state.ingredients[i]._id = action.payload._id)) {
            state.ingredients[i].qty += 1
            break
          }
        }
      }
    },
    decreaseIngredientValue: (
      state,
      action: PayloadAction<TIngredient & { qty: 0 }>
    ) => {
      if (action.payload.type === 'bun') {
        for (let i: number = 0; i <= state.ingredients.length; i++) {
          if ((state.ingredients[i]._id = action.payload._id)) {
            state.ingredients[i].qty = 0
            break
          }
        }
      } else {
        for (let i: number = 0; i <= state.ingredients.length; i++) {
          if ((state.ingredients[i]._id = action.payload._id)) {
            state.ingredients[i].qty -= 1
            break
          }
        }
      }
    },
  },
})
