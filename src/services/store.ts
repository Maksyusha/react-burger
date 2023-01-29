// import { configureStore } from '@reduxjs/toolkit'
// import { applyMiddleware, createStore, compose } from 'redux'
// import { rootReducer } from './reducers'
// import { socketMiddleware } from './middleware/socket-middleware.js'
// import thunk from 'redux-thunk'
// import {
//   WS_CONNECTION_CLOSE,
//   WS_CONNECTION_CLOSED,
//   WS_CONNECTION_ERROR,
//   WS_CONNECTION_START,
//   WS_CONNECTION_SUCCESS,
//   WS_GET_MESSAGE,
// } from './constants/ws-constants'

// const wsActions = {
//   wsConnect: WS_CONNECTION_START,
//   wsClose: WS_CONNECTION_CLOSE,
//   onOpen: WS_CONNECTION_SUCCESS,
//   onClose: WS_CONNECTION_CLOSED,
//   onError: WS_CONNECTION_ERROR,
//   onMessage: WS_GET_MESSAGE,
// }

// declare global {
//   interface Window {
//     __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
//   }
// }

// const composeEnhancers =
//   (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
//   compose

// const enhancer = composeEnhancers(
//   applyMiddleware(thunk, socketMiddleware(wsActions))
// )

// export const store = createStore(rootReducer, enhancer)

// export const store = configureStore({
//   reducer: {}
// })

// export type RootState = ReturnType<typeof store.getState>

// export type AppDispatch = typeof store.dispatch

import { combineReducers, configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import { socketMiddleware } from './middleware/socket-middleware'
import { burgerConstructorSlice } from './slices/burger-constructor-slice'
import { burgerIngredientsSlice } from './slices/burger-ingredients-slice'
import { feedSlice } from './slices/feed-slice'
import { orderDetailsSlice } from './slices/order-details-slice'
import { userSlice } from './slices/user-slice'
import { wsSlice } from './slices/ws-slice'

export const rootReducer = combineReducers({
  burgerIngredients: burgerIngredientsSlice.reducer,
  burgerConstructor: burgerConstructorSlice.reducer,
  orderDetails: orderDetailsSlice.reducer,
  user: userSlice.reducer,
  feed: feedSlice.reducer,
  ws: wsSlice.reducer,
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, socketMiddleware()),
  devTools: process.env.NODE_ENV === 'development',
})
