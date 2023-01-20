import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
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
    addChosenIngredient(state, action: PayloadAction<TIngredient>) {
      if (action.payload.type === 'bun') {
        state.chosenBun = action.payload
      }
      state.chosenIngredients.push(action.payload)
    },
    deleteChosenIngredient(state, action: PayloadAction<number>) {
      state.chosenIngredients.splice(action.payload, 1)
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
      ;(state.chosenBun = null), (state.chosenIngredients = [])
    },
  },
})
