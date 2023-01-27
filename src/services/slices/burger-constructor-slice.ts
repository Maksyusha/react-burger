import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { v4 as uuidv4 } from 'uuid'
import { TIngredient } from '../types/data'

export type TBurgerConstructor = {
  chosenBun: TIngredient | null
  chosenIngredients: TIngredient[]
}

const initialState: TBurgerConstructor = {
  chosenBun: null,
  chosenIngredients: [],
}

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addChosenIngredient(
      state,
      action: PayloadAction<{ ingredient: TIngredient }>
    ) {
      if (action.payload.ingredient.type === 'bun') {
        state.chosenBun = action.payload.ingredient
      }
      state.chosenIngredients.push({
        ...action.payload.ingredient,
        key: uuidv4(),
      })
    },
    deleteChosenIngredient(state, action: PayloadAction<{ index: number }>) {
      state.chosenIngredients.splice(action.payload.index, 1)
    },
    sortChosenIngredients(
      state,
      action: PayloadAction<{ dragIndex: number; hoverIndex: number }>
    ) {
      const changedIngredient: TIngredient[] = state.chosenIngredients.splice(
        action.payload.hoverIndex,
        1,
        state.chosenIngredients[action.payload.dragIndex]
      )
      state.chosenIngredients.splice(
        action.payload.dragIndex,
        1,
        changedIngredient[0]
      )
    },
    clearChosenIngredients(state) {
      state.chosenBun = null
      state.chosenIngredients = []
    },
  },
})

export const {
  addChosenIngredient,
  deleteChosenIngredient,
  sortChosenIngredients,
  clearChosenIngredients,
} = burgerConstructorSlice.actions
