import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { TIngredient } from '../types/data'
import { getIngredientsRequestApi } from '../api'
import { AppThunk } from '../types'

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
      action: PayloadAction<{ ingredients: TIngredient[] }>
    ) => {
      state.ingredientsRequest = false
      state.ingredients = action.payload.ingredients.map((ingredient) => {
        return { ...ingredient, qty: 0 }
      })
    },
    getIngredientsError: (state) => {
      state.ingredientsRequest = false
      state.ingredientsFailed = true
    },
    increaseIngredientValue: (
      state,
      action: PayloadAction<{ ingredient: TIngredient }>
    ) => {
      const ingredient = action.payload.ingredient
      if (action.payload.ingredient.type === 'bun') {
        for (let i: number = 0; i < state.ingredients.length; i++) {
          if (state.ingredients[i].type === 'bun') {
            state.ingredients[i]._id !== ingredient._id
              ? (state.ingredients[i].qty = 0)
              : (state.ingredients[i].qty = 1)
          }
        }
      } else {
        for (let i: number = 0; i < state.ingredients.length; i++) {
          if (state.ingredients[i]._id === ingredient._id) {
            state.ingredients[i].qty += 1
            break
          }
        }
      }
    },
    decreaseIngredientValue: (
      state,
      action: PayloadAction<{ ingredient: TIngredient }>
    ) => {
      for (let i: number = 0; i < state.ingredients.length; i++) {
        if (state.ingredients[i]._id === action.payload.ingredient._id) {
          state.ingredients[i].qty -= 1
          break
        }
      }
    },
  },
})

export const {
  getIngredientsRequest,
  getIngredientsSuccess,
  getIngredientsError,
  increaseIngredientValue,
  decreaseIngredientValue,
} = burgerIngredientsSlice.actions

export const getIngredients = (): AppThunk => (dispatch) => {
  dispatch(getIngredientsRequest())
  getIngredientsRequestApi()
    .then((res) => dispatch(getIngredientsSuccess({ ingredients: res.data })))
    .catch(() => dispatch(getIngredientsError()))
}
