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

export type TOrder = {
  name: string
  price: number
  ingredients: string[]
  _id: string
  status: {[key: string]: string}
  number: number
  createdAt: string
  updatedAt: string
}

// export type TSortedOrder = Omit<TOrder, 'ingredients'>[] & {ingredients: TIngredient[]}

export type TSortedOrder = {
  name: string
  price: number
  ingredients: TIngredient[]
  _id: string
  status: {[key: string]: string}
  number: number
  createdAt: string
  updatedAt: string
}

export type TOrdersResponse = {
  success: boolean
  orders: TOrder[]
  total: number
  totalToday: number
}
