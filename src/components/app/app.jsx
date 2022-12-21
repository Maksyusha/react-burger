import { AppHeader } from '../app-header/app-header.jsx'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, useLocation, useRouteMatch } from 'react-router-dom'
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
import { Order } from '../order/order.jsx'
import { NotFound } from '../not-found/not-found.jsx'
import { Preloader } from '../preloader/preloader.jsx'
import OrdersPage from '../../pages/orders-page/orders-page.jsx'
import {
  saveSortedOrders,
  wsClose,
  wsConnect,
} from '../../services/actions/ws-actions'
import { wsUrl } from '../../services/api'
import { getCookie } from '../../services/utils'

function App() {
  const { orderNumber, orderFailed, orderModalIsOpened } = useSelector(
    (store) => store.orderDetails
  )
  const { ingredients } = useSelector((store) => store.burgerIngredients)
  const { orders } = useSelector((store) => store.ws)
  const dispatch = useDispatch()
  const location = useLocation()
  const isProfileRoute = useRouteMatch('/profile/orders') ? true : false
  const isFeedRoute = useRouteMatch('/feed') ? true : false
  const background = location.state?.background
  const accessToken = getCookie('accessToken')?.slice(7)

  const findIngredientsData = (data, dataToFind) => {
    const result = []
    let totalPrice = null

    dataToFind.ingredients.forEach((itemToFind) => {
      const itemFound = data.find((item) => item._id === itemToFind)
      const indexOfExistingItem = result?.findIndex(
        (item) => item.id === itemFound._id
      )

      if (indexOfExistingItem !== -1) {
        result[indexOfExistingItem].qty += 1
        return
      }

      const itemToAdd = {
        id: itemFound._id,
        image: itemFound.image,
        name: itemFound.name,
        price: itemFound.price,
        type: itemFound.type,
        qty: 1,
      }

      if (itemFound.type !== 'bun') {
        result.push(itemToAdd)
        totalPrice += itemToAdd.price
      } else {
        result.splice(0, 0, itemToAdd)
        totalPrice += itemToAdd.price * 2
      }
    })

    return { ...dataToFind, price: totalPrice, ingredients: result }
  }

  function closeOrderModal() {
    dispatch(hideOrderModal())
  }

  useEffect(() => {
    dispatch(checkAuth())
    dispatch(getBurgerIngredients())
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
    }
  }, [isProfileRoute, isFeedRoute, accessToken, dispatch])

  useEffect(() => {
    if (orders) {
      dispatch(
        saveSortedOrders(
          orders.map((order) => findIngredientsData(ingredients, order))
        )
      )
    }
  }, [orders, ingredients, dispatch])

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
