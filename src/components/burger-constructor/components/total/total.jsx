import PropTypes from 'prop-types'
import { useMemo } from 'react'
import { ingredientTypes } from '../../../../utils/types.js'
import totalStyles from './total.module.css'
import {
  CurrencyIcon,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useSelector, useDispatch } from 'react-redux'
import {
  postChosenIngredients,
  SHOW_ORDER_MODAL,
} from '../../../../services/actions/order-details'

function Total() {
  const { chosenBun, chosenIngredients } = useSelector(
    (store) => store.burgerConstructor
  )

  const dispatch = useDispatch()

  const showOrderModal = () => {
    const dataToPost = {
      ingredients: [
        chosenBun._id,
        ...chosenIngredients
          .filter((ingredient) => ingredient.type !== 'bun')
          .map((ingredient) => ingredient._id),
        chosenBun._id,
      ],
    }
    dispatch(postChosenIngredients(dataToPost))
    dispatch({ type: SHOW_ORDER_MODAL })
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
        onClick={showOrderModal}
      >
        Оформить заказ
      </Button>
    </div>
  )
}

Total.propTypes = {
  data: PropTypes.arrayOf(ingredientTypes),
}

export { Total }
