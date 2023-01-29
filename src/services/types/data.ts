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
  key?: string
}

export type TUser = {
  email?: string
  name?: string
  password?: string | undefined
}

export type TUserResponse = {
  success: boolean
  user: TUser
  accessToken: string
  refreshToken: string
}

export type TSortedIngredient = {
  _id: string
  image: string
  name: string
  price: number
  type: string
  qty: number
}

export type TSortedOrder = {
  _id: string
  name: string
  status: string
  number: number
  createdAt: string
  updatedAt: string
  ingredients: TSortedIngredient[]
  price: number
}

export type TOrder = {
  createdAt: string,
  ingredients: string[]
  name: string
  number: number
  status: string
  updatedAt: string
  _id: string
}

export type TOrdersResponse = {
  success: boolean
  orders: TOrder[]
  total: number
  totalToday: number
}
