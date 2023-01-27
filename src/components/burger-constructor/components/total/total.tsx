import { FC, useMemo } from 'react'
import totalStyles from './total.module.css'
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useLocation, useHistory } from 'react-router-dom'
import {
  sendOrder,
  showOrderModal,
} from '../../../../services/slices/order-details-slice'
import { TIngredient } from '../../../../services/types/data'
import { useAppSelector, useAppDispatch } from '../../../../hooks/hooks'

export const Total: FC = () => {
  const { chosenBun, chosenIngredients } = useAppSelector(
    (store) => store.burgerConstructor
  )
  const { orderFailed } = useAppSelector((store) => store.orderDetails)
  const { user } = useAppSelector((store) => store.user)

  const dispatch = useAppDispatch()
  const history = useHistory()
  const location = useLocation()

  const handleSubmit = () => {
    if (!user) {
      return history.push('/login', { from: location })
    }

    let dataToPost: { ingredients: string[] }

    if (chosenBun !== null) {
      dataToPost = {
        ingredients: [
          chosenBun._id,
          ...chosenIngredients
            .filter((ingredient: TIngredient) => ingredient.type !== 'bun')
            .map((ingredient: TIngredient) => ingredient._id),
          chosenBun._id,
        ],
      }
    } else {
      dataToPost = {
        ingredients: [
          ...chosenIngredients
            .filter((ingredient: TIngredient) => ingredient.type !== 'bun')
            .map((ingredient: TIngredient) => ingredient._id),
        ],
      }
    }

    dispatch(sendOrder(dataToPost))

    if (orderFailed) return

    dispatch(showOrderModal())
  }

  const changeTotal = useMemo(() => {
    return chosenBun && chosenIngredients.length !== 0
      ? chosenBun.price * 2 +
          chosenIngredients.reduce(
            (a: number, b: TIngredient) => a + b.price,
            0
          )
      : chosenIngredients.length !== 0
      ? chosenIngredients.reduce((a: number, b: TIngredient) => a + b.price, 0)
      : chosenBun
      ? chosenBun.price * 2
      : 0
  }, [chosenBun, chosenIngredients])

  return (
    <div className={`${totalStyles['total__container']} mt-10 mr-10`}>
      <div className={totalStyles['total__price-container']}>
        <p className="text text_type_digits-medium mr-2">{changeTotal}</p>
        <div className={totalStyles['total__icon']}>
          <CurrencyIcon type="primary" />
        </div>
      </div>
      <Button
        htmlType="button"
        type="primary"
        size="large"
        onClick={handleSubmit}
      >
        Оформить заказ
      </Button>
    </div>
  )
}
