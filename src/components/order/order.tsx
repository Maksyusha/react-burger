import styles from './order.module.css'
import { FC } from 'react'
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
import { Preloader } from '../preloader/preloader'
import { useAppSelector } from '../../hooks/hooks'

export const Order: FC<{
  titlePositionCenter: boolean
}> = ({ titlePositionCenter }) => {
  const { sortedOrders } = useAppSelector((store) => store.ws)
  const { id }: { id: string } = useParams()

  if (!sortedOrders) {
    return <Preloader />
  }

  const order = sortedOrders.find((order) => order._id === id)

  return (
    <div className={styles['order']}>
      <ul className={styles['order__list']}>
        <li className="mb-10">
          <p
            className="text text_type_digits-default"
            style={titlePositionCenter ? { textAlign: 'center' } : undefined}
          >{`#${order?.number}`}</p>
        </li>
        <li className={`${styles['order__list-item']} mb-3`}>
          <p className="text text_type_main-medium">{order?.name}</p>
        </li>
        <li className={`${styles['order__list-item']} mb-15`}>
          <p
            className="text text_type_main-default"
            style={order?.status.done ? { color: '#00CCCC' } : undefined}
          >
            {order?.status[Object.keys(order?.status)[0]]}
          </p>
        </li>
        <li className={`${styles['order__list-item']} mb-6`}>
          <p className="text text_type_main-medium">Состав:</p>
        </li>
        <li className={`${styles['order__list-item']} mb-10`}>
          <ul className={styles['order__ingredients-list']}>
            {order?.ingredients.map((ingredient) => (
              <li
                key={ingredient._id}
                className={styles['order__ingredients-list-item']}
              >
                <div className={styles['order__ingredient-container']}>
                  <div className={styles['order__image-container']}>
                    <img
                      className={styles['order__image']}
                      src={ingredient.image}
                      alt="Изображение ингредиента"
                    />
                  </div>
                  <p className="text text_type_main-default ml-4 mr-4">
                    {ingredient.name}
                  </p>
                </div>
                <div className={styles['order__price-container']}>
                  <p
                    className="text text_type_digits-default mr-2"
                    style={{ alignSelf: 'flexEnd' }}
                  >
                    {`${ingredient.qty} x ${ingredient.price}`}
                  </p>
                  <CurrencyIcon type="primary" />
                </div>
              </li>
            ))}
          </ul>
        </li>
        <li className={styles['order__list-item']}>
          <FormattedDate date={order?.createdAt ? new Date(order?.createdAt) : new Date(0)} />
          <div className={styles['order__price-container']}>
            <p className="text text_type_digits-default">{order?.price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </li>
      </ul>
    </div>
  )
}
