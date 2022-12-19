import styles from './order-list-item.module.css'
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useLocation } from 'react-router-dom'

function OrderListItem({ order, status, isProtectedPath }) {
  const { _id, number, createdAt, name, price, ingredients } = order
  const location = useLocation()

  const statusText =
    status === 'done'
      ? 'Выполнен'
      : status === 'created'
      ? 'Создан'
      : 'Готовится'

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
          {status ? (
            <li className="mt-2">
              <p
                className="text text_type_main-default"
                style={status === 'done' ? { color: '#00CCCC' } : null}
              >
                {statusText}
              </p>
            </li>
          ) : null}
          <li className={`${styles['order-list__list-item']} mt-6`}>
            <div className={styles['order-list__images-list']}>
              {ingredients.slice(0, 5).map((ingredient, index) => (
                <div
                  key={index}
                  className={styles['order-list__image-container']}
                  style={{ zIndex: ingredients.length - index }}
                >
                  <img
                    className={styles['order-list__image']}
                    src={ingredient.image}
                    alt="Изображение ингредиента"
                  />
                </div>
              ))}
              {ingredients[5] && ingredients[6] ? (
                <div key="5" className={styles['order-list__image-container']}>
                  <img
                    className={styles['order-list__image']}
                    src={ingredients[5].image}
                    alt="Изображение ингредиента"
                  />
                  <div className={styles['order-list__image-overflow']}>
                    <p className="text text_type_main-medium">{`+${
                      ingredients.length - 6
                    }`}</p>
                  </div>
                </div>
              ) : ingredients[5] ? (
                <div key="5" className={styles['order-list__image-container']}>
                  <img
                    className={styles['order-list__image']}
                    src={ingredients[5].image}
                    alt="Изображение ингредиента"
                  />
                </div>
              ) : null}
            </div>
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

export { OrderListItem }
