export type TIngredient = {
  _id: string
  name: string
  type: string
  proteins: number
  fat: number
  carbohydrates: number
  calories: number
  price: number
  image: string
  image_mobile: string
  image_large: string
  __v: number
  qty: number
}

export type TUserData = {
  email: string
  name: string
  password?: string | undefined
}

export type TUserResponse = {
  success: boolean
  user: TUserData
  accessToken: string
  refreshToken: string
}

export type TOrderData = {
  ingredients: string[]
  _id: string
  status: string
  number: number
  createdAt: string
  updatedAt: string
}

export type TOrdersResponse = {
  success: boolean
  orders: TOrderData[]
  total: number
  totalToday: number
}
