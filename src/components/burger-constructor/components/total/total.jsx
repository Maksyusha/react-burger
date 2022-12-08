import { useMemo } from 'react'
import totalStyles from './total.module.css'
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useHistory } from 'react-router-dom'
import {
  sendOrder,
  showOrderModal,
} from '../../../../services/actions/order-details'

function Total() {
  const { chosenBun, chosenIngredients } = useSelector(
    (store) => store.burgerConstructor
  )
  const { orderFailed } = useSelector((store) => store.orderDetails)
  const { userData } = useSelector((store) => store.user)

  const dispatch = useDispatch()
  const history = useHistory()
  const location = useLocation()

  const handleSubmit = () => {
    if (!userData) {
      return history.push('/login', { from: location })
    }

    const dataToPost = {
      ingredients: [
        chosenBun._id,
        ...chosenIngredients
          .filter((ingredient) => ingredient.type !== 'bun')
          .map((ingredient) => ingredient._id),
        chosenBun._id,
      ],
    }

    dispatch(sendOrder(dataToPost))

    if (orderFailed) return

    dispatch(showOrderModal())
  }

  const changeTotal = useMemo(() => {
    return chosenBun && chosenIngredients.length !== 0
      ? chosenBun.price * 2 + chosenIngredients.reduce((a, b) => a + b.price, 0)
      : chosenIngredients.length !== 0
      ? chosenIngredients.reduce((a, b) => a + b.price, 0)
      : chosenBun
      ? chosenBun.price * 2
      : 0
  }, [chosenBun, chosenIngredients])

  return (
    <div className={`${totalStyles['total__container']} mt-10 mr-10`}>
      <div className={totalStyles['total__price-container']}>
        <p className="text text_type_digits-medium mr-2">{changeTotal}</p>
        <div className={totalStyles['total__icon']}>
          <CurrencyIcon />
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

export { Total }
