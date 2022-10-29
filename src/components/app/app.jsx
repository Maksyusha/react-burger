import { useEffect } from 'react'
import appStyles from './app.module.css'
import { AppHeader } from '../app-header/app-header.jsx'
import { BurgerIngredients } from '../burger-ingredients/burger-ingredients.jsx'
import { BurgerConstructor } from '../burger-constructor/burger-constructor.jsx'
import { Modal } from '../modal/modal.jsx'
import { IngredientDetails } from '../ingredient-details/ingredient-details.jsx'
import { OrderDetails } from '../order-details/order-details.jsx'
import { useSelector, useDispatch } from 'react-redux'
import { getBurgerIngredients } from '../../services/actions/burger-ingredients'
import { HIDE_INGREDIENT_MODAL } from '../../services/actions/ingredient-details'
import { HIDE_ORDER_MODAL } from '../../services/actions/order-details'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function App() {
  const { ingredients } = useSelector((store) => store.burgerIngredients)
  const { ingredientModalIsOpened } = useSelector(
    (store) => store.ingredientDetails
  )
  const { orderFailed, orderModalIsOpened } = useSelector(
    (store) => store.orderDetails
  )

  const dispatch = useDispatch()

  const closeIngredientModal = () => {
    dispatch({ type: HIDE_INGREDIENT_MODAL })
  }

  const closeOrderModal = () => {
    dispatch({ type: HIDE_ORDER_MODAL })
  }

  useEffect(() => {
    dispatch(getBurgerIngredients()) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) //TODO линтер ругался на отсутствие зависимостей

  return (
    <div className="App">
      <AppHeader />
      <div className={appStyles['burger-container']}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients data={ingredients} />
          <BurgerConstructor />
        </DndProvider>
      </div>
      {ingredientModalIsOpened && (
        <Modal onClose={closeIngredientModal}>
          <IngredientDetails />
        </Modal>
      )}
      {orderModalIsOpened && (
        <Modal onClose={closeOrderModal}>
          {orderFailed ? (
            <p className="text_type_main-medium mt-25 mr-20 ml-20 mb-25">
              Произшла ошибка отправки данных заказа
            </p>
          ) : (
            <OrderDetails />
          )}
        </Modal>
      )}
    </div>
  )
}

export default App
