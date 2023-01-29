import styles from './order-list-item.module.css'
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { OrderImages } from './components/order-images/order-images'
import { TSortedOrder } from '../../services/types/data'

type TOrderListItemProps = {
  order: TSortedOrder
  showStatus?: boolean
  isProtectedPath?: boolean
}

export const OrderListItem: FC<TOrderListItemProps> = ({ order, showStatus, isProtectedPath }) => {
  const { _id, number, createdAt, name, price, status, ingredients } = order
  const location = useLocation()

  const path = isProtectedPath ? '/profile/orders/' : '/feed/'

  return (
    <li className={styles['order-list']}>
      <Link
        className={styles['order-list__link']}
        to={{
          pathname: path + _id,
          state: { background: location },
        }}
      >
        <ul className={styles['order-list__list']}>
          <li className={`${styles['order-list__list-item']} mb-6`}>
            <p
              className="text text_type_digits-default"
              style={{ fontSize: 24 }}
            >
              {'#' + number}
            </p>
            <FormattedDate date={new Date(createdAt)} />
          </li>
          <li>
            <p className="text text_type_main-medium">{name}</p>
          </li>
          {showStatus ? (
            <li className="mt-2">
              <p
                className="text text_type_main-default"
                style={status === 'Выполнен' ? { color: '#00CCCC' } : undefined}
              >
                {status}
              </p>
            </li>
          ) : null}
          <li className={`${styles['order-list__list-item']} mt-6`}>
            <OrderImages ingredients={ingredients} />
            <div className={styles['order-list__price-container']}>
              <p
                className={`${styles['order-list__price']} text text_type_digits-default mr-2`}
              >
                {price}
              </p>
              <CurrencyIcon type="primary" />
            </div>
          </li>
        </ul>
      </Link>
    </li>
  )
}
