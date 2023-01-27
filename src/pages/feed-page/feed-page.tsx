import styles from './feed-page.module.css'
import { OrderListItem } from '../../components/order-list-item/order-list-item.js'
import { OrderFeed } from '../../components/order-feed/order-feed.js'
import { Preloader } from '../../components/preloader/preloader'
import { FC } from 'react'
import { useAppSelector } from '../../hooks/hooks'
import { TSortedOrder } from '../../services/types/data'

type TFeedPageProps = {
  orders: TSortedOrder[]
}

const FeedPage: FC<TFeedPageProps> = ({ orders }) => {
  const { total, totalToday } = useAppSelector((store) => store.ws)

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
      <OrderFeed total={total} totalToday={totalToday} />
    </div>
  )
}

export default FeedPage
