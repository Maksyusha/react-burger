// Сделать компонент формы, а потом его везде импортировать

import { AppHeader } from '../app-header/app-header.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation } from 'react-router-dom'
import { checkAuth } from '../../services/actions/user.js'
import { getBurgerIngredients } from '../../services/actions/burger-ingredients.js'
import { hideOrderModal } from '../../services/actions/order-details'
import HomePage from '../../pages/home-page/home-page.jsx'
import LoginPage from '../../pages/login-page/login-page.jsx'
import RegisterPage from '../../pages/register-page/register-page.jsx'
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page.jsx'
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page.jsx'
import ProfilePage from '../../pages/profile-page/profile-page.jsx'
import ProtectedRoute from '../protected-route/protected-route.jsx'
import { Modal } from '../modal/modal.jsx'
import { IngredientDetails } from '../ingredient-details/ingredient-details.jsx'
import { OrderDetails } from '../order-details/order-details.jsx'
import { NotFound } from '../not-found/not-found.jsx'
import { Preloader } from '../preloader/preloader.jsx'

function App() {
  const { orderNumber, orderFailed, orderModalIsOpened } = useSelector(
    (store) => store.orderDetails
  )
  const dispatch = useDispatch()
  const location = useLocation()
  const background = location.state?.background

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(getBurgerIngredients()) // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) //TODO линтер ругался на отсутствие зависимостей

  function closeOrderModal() {
    dispatch(hideOrderModal())
  }

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <Route exact path="/register">
          <RegisterPage />
        </Route>
        <Route exact path="/forgot-password">
          <ForgotPasswordPage />
        </Route>
        <Route exact path="/reset-password">
          <ResetPasswordPage />
        </Route>
        <ProtectedRoute path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <Route path="/ingredients/:id">
          <Modal>
            <IngredientDetails />
          </Modal>
        </Route>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background && (
        <Route path="/ingredients/:id">
          <Modal>
            <IngredientDetails />
          </Modal>
        </Route>
      )}
      {orderModalIsOpened ? (
        orderNumber === null ? (
          <Preloader />
        ) : (
          <Modal onClose={closeOrderModal}>
            {orderFailed ? (
              <p className="text_type_main-medium mt-25 mr-20 ml-20 mb-25">
                Произшла ошибка отправки данных заказа
              </p>
            ) : (
              <OrderDetails />
            )}
          </Modal>
        )
      ) : null}
    </>
  )
}

export default App
