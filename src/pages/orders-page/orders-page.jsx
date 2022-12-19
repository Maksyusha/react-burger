import { useSelector } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import styles from './orders-page.module.css'
import { Preloader } from '../../components/preloader/preloader'
import { OrderListItem } from '../../components/order-list-item/order-list-item'
import { OrderFeed } from '../../components/order-feed/order-feed'
import { ProtectedLinks } from '../../components/protected-links/protected-links'

function OrdersPage() {
  const { sortedOrders, total, totalToday } = useSelector(
    (store) => store.ws
  )
  const match = useRouteMatch('/profile/orders')?.isExact

  if (!sortedOrders) {
    return <Preloader />
  }

  if (match) {
    return (
      <div className={styles['orders-page']}>
        <div className="pt-30">
          <ProtectedLinks />
        </div>
        {sortedOrders ? (
          <ul className={`${styles['orders-page__list']} mt-10`}>
            {[...sortedOrders].reverse().map((order) => {
              return (
                <OrderListItem
                  key={order._id}
                  order={order}
                  status={order.status}
                  isProtectedPath={true}
                />
              )
            })}
          </ul>
        ) : (
          <div className={styles['orders-page__preloader-container']}>
            <Preloader />
          </div>
        )}
      </div>
    )
  }

  return (
    <div className={styles['orders-page']}>
      <div className="mt-10">
        <h1 className="text text_type_main-large mb-10">Лента заказов</h1>
        <ul className={styles['orders-page__list']}>
          {sortedOrders.map((order) => {
            return <OrderListItem key={order._id} order={order} />
          })}
        </ul>
      </div>
      <OrderFeed total={total} totalToday={totalToday} />
    </div>
  )
}

export default OrdersPage
