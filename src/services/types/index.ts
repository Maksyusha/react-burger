import { AnyAction, ThunkAction } from '@reduxjs/toolkit'
import { store } from '../store'
import { TUser } from './data'

export type RootState = ReturnType<typeof store.getState>


export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>
