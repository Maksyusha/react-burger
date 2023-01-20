import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { store } from '../store'
import { TBurgerConstructorActions } from '../actions/burger-constructor'
import { TBurgerIngredientsActions } from '../actions/burger-ingredients'
import { TOrderDetailsActions } from '../actions/order-details'
import { TUserActions } from '../actions/user'
import { TWsActions } from '../actions/ws-actions'

export type RootState = ReturnType<typeof store.getState>

type TAppActions =
  | TBurgerConstructorActions
  | TBurgerIngredientsActions
  | TOrderDetailsActions
  | TUserActions
  | TWsActions

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  TAppActions
>

export type AppDispatch = ThunkDispatch<RootState, never, TAppActions>
