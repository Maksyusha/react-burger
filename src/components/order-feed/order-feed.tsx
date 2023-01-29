import { FC } from 'react'
import styles from './order-feed.module.css'

type TOrderFeedProps = {
  total: number | null
  totalToday: number | null
}

const OrderFeed: FC<TOrderFeedProps> = ({ total, totalToday }) => {
  const ready = ['034533', '034532', '034530', '034527', '034525']
  const inWork = ['034538', '034541', '034542']

  return (
    <ul className={styles['order-feed']}>
      <li className={styles['order-feed__list-item']}>
        <div className={styles['order-feed__numbers-container']}>
          <h3 className="text text_type_main-medium mb-6">Готовы:</h3>
          <ul className={styles['order-feed__numbers-list']}>
            {ready.map((item) => (
              <li key={item} className={styles['order-feed__numbers-item']}>
                <p
                  className={`${styles['order-feed__numbers']} text text_type_digits-default`}
                >
                  {item}
                </p>
              </li>
            ))}
          </ul>
        </div>
        <div className={styles['order-feed__numbers-container']}>
          <h3 className="text text_type_main-medium mb-6">В работе:</h3>
          <ul className={styles['order-feed__numbers-list']}>
            {inWork.map((item) => (
              <li key={item} className={styles['order-feed__numbers-item']}>
                <p className="text text_type_digits-default">{item}</p>
              </li>
            ))}
          </ul>
        </div>
      </li>
      <li className={styles['order-feed__list-item']}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p
          className={`${styles['order-feed__executed-number']} text text_type_digits-large`}
        >
          {total}
        </p>
      </li>
      <li className={styles['order-feed__list-item']}>
        <h3 className="text text_type_main-medium">Выполнено за все время:</h3>
        <p
          className={`${styles['order-feed__executed-number']} text text_type_digits-large`}
        >
          {totalToday}
        </p>
      </li>
    </ul>
  )
}

export { OrderFeed }
