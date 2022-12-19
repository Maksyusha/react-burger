import styles from './feed-page.module.css'
import { useSelector } from 'react-redux'
import { OrderListItem } from '../../components/order-list-item/order-list-item.jsx'
import { OrderFeed } from '../../components/order-feed/order-feed.jsx'
import { Preloader } from '../../components/preloader/preloader'

function FeedPage({orders}) {
  const { total, totalToday } = useSelector((store) => store.ws.messages)

  if (!orders) return <Preloader />

  return (
    <div className={styles['feed-page']}>
      <div className={`${styles['feed-page__list-container']} mt-10`}>
        <h1 className="text text_type_main-large mb-10">Лента заказов</h1>
        <ul className={styles['feed-page__list']}>
          {orders.map((order) => {
            return <OrderListItem key={order._id} order={order} />
          })}
        </ul>
      </div>
      <OrderFeed total={total} totalToday={totalToday}/>
    </div>
  )
}

export default FeedPage
