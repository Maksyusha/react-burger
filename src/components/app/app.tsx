import { AppHeader } from '../app-header/app-header'
import { FC, useEffect } from 'react'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom'
import { Location } from 'history'
import { checkAuth } from '../../services/slices/user-slice'
import { getIngredients } from '../../services/slices/burger-ingredients-slice'
import { hideOrderModal } from '../../services/slices/order-details-slice'
import HomePage from '../../pages/home-page/home-page'
import LoginPage from '../../pages/login-page/login-page'
import RegisterPage from '../../pages/register-page/register-page'
import ForgotPasswordPage from '../../pages/forgot-password-page/forgot-password-page'
import ResetPasswordPage from '../../pages/reset-password-page/reset-password-page'
import ProfilePage from '../../pages/profile-page/profile-page'
import ProtectedRoute from '../protected-route/protected-route'
import { Modal } from '../modal/modal'
import { IngredientDetails } from '../ingredient-details/ingredient-details'
import { OrderDetails } from '../order-details/order-details'
import { Order } from '../order/order'
import { NotFound } from '../not-found/not-found'
import { Preloader } from '../preloader/preloader'
import OrdersPage from '../../pages/orders-page/orders-page'
import { wsClose, wsConnect } from '../../services/slices/ws-slice'
import { wsUrl } from '../../services/api'
import { getCookie } from '../../services/utils'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { clearFeedState } from '../../services/slices/feed-slice'

const App: FC = () => {
  const { orderNumber, orderFailed, orderModalIsOpened } = useAppSelector(
    (store) => store.orderDetails
  )
  const dispatch = useAppDispatch()
  const location = useLocation<{ background: Location }>()
  const isProfileRoute = useRouteMatch('/profile/orders') ? true : false
  const isFeedRoute = useRouteMatch('/feed') ? true : false
  const background = location.state?.background
  const accessToken = getCookie('accessToken')?.slice(7)

  function closeOrderModal() {
    dispatch(hideOrderModal())
  }

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(getIngredients())
  }, [dispatch])

  useEffect(() => {
    if (isProfileRoute) {
      dispatch(wsConnect(`${wsUrl}?token=${accessToken}`))
    }
    if (isFeedRoute) {
      dispatch(wsConnect(`${wsUrl}/all`))
    }

    return () => {
      dispatch(wsClose())
      dispatch(clearFeedState())
    }
  }, [isProfileRoute, isFeedRoute, accessToken, dispatch])

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route exact path="/">
          <HomePage />
        </Route>
        <Route exact path="/ingredients/:id">
          <IngredientDetails titlePositionCenter={true} />
        </Route>
        <Route exact path="/feed">
          <OrdersPage />
        </Route>
        <Route exact path="/feed/:id">
          <Order titlePositionCenter={true} />
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
        <ProtectedRoute exact path="/profile">
          <ProfilePage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders">
          <OrdersPage />
        </ProtectedRoute>
        <ProtectedRoute exact path="/profile/orders/:id">
          <Order />
        </ProtectedRoute>
        <Route>
          <NotFound />
        </Route>
      </Switch>
      {background && (
        <>
          <Route path="/ingredients/:id">
            <Modal>
              <IngredientDetails />
            </Modal>
          </Route>
          <Route path="/feed/:id">
            <Modal>
              <Order />
            </Modal>
          </Route>
          <Route path="/profile/orders/:id">
            <Modal>
              <Order />
            </Modal>
          </Route>
        </>
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
