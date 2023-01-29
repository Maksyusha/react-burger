import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { TOrdersResponse, TSortedOrder, TSortedIngredient, TIngredient } from '../types/data'

const sortOrders = (parsedData: TOrdersResponse, ingredients: TIngredient[]) => {
  const sortedOrders: TSortedOrder[] = []
  const { orders, total, totalToday } = parsedData

  orders.forEach((order) => {
    const status =
      order.status === 'done'
        ? 'Выполнен'
        : order.status === 'created'
        ? 'Создан'
        : 'Готовится'
    const sortedIngredients: TSortedIngredient[] = []
    let totalPrice: number = 0

    order.ingredients.forEach((itemToFind) => {
      const foundItem = ingredients.find(
        (ingredient) => ingredient._id === itemToFind
      )

      if (foundItem) {
        const indexOfFoundItemInSortedIngredients = sortedIngredients.findIndex(
          (item) => {
            return item._id === foundItem._id
          }
        )

        if (indexOfFoundItemInSortedIngredients !== -1) {
          sortedIngredients[indexOfFoundItemInSortedIngredients].qty += 1
          if (
            sortedIngredients[indexOfFoundItemInSortedIngredients].type !==
            'bun'
          ) {
            totalPrice +=
              sortedIngredients[indexOfFoundItemInSortedIngredients].price
          }
          return
        }

        const itemToAdd = {
          _id: foundItem._id,
          image: foundItem.image,
          name: foundItem.name,
          price: foundItem.price,
          type: foundItem.type,
          qty: 1,
        }

        if (foundItem.type !== 'bun') {
          sortedIngredients.push(itemToAdd)
          totalPrice += itemToAdd.price
        } else {
          sortedIngredients.splice(0, 0, itemToAdd)
          totalPrice += itemToAdd.price * 2
        }
      }
    })
    sortedOrders.push({
      ...order,
      status,
      ingredients: sortedIngredients,
      price: totalPrice,
    })
  })

  return { sortedOrders, total, totalToday }
}

type TFeedState = {
  total: number | null
  totalToday: number | null
  sortedOrders: TSortedOrder[] | null
}

const initialState: TFeedState = {
  total: null,
  totalToday: null,
  sortedOrders: null,
}

export const feedSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setFeedState(
      state,
      action: PayloadAction<{parsedData: TOrdersResponse, ingredients: TIngredient[]}>
    ) {
      const sortedData = sortOrders(action.payload.parsedData, action.payload.ingredients)
      const { total, totalToday, sortedOrders } = sortedData

      state.total = total
      state.totalToday = totalToday
      state.sortedOrders = sortedOrders
    },
    clearFeedState(state) {
      state.total = null
      state.totalToday = null
      state.sortedOrders = null
    }
  },
})

export const { setFeedState, clearFeedState } = feedSlice.actions
