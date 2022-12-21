import styles from './order.module.css'
import {
  FormattedDate,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Preloader } from '../preloader/preloader'

function Order({ titlePositionCenter }) {
  const { sortedOrders } = useSelector((store) => store.ws)
  const { id } = useParams()

  if (!sortedOrders) {
    return <Preloader />
  }

  const { number, name, status, ingredients, createdAt, price } =
    sortedOrders.find((order) => order._id === id)

  return (
    <div className={styles['order']}>
      <ul className={styles['order__list']}>
        <li className="mb-10">
          <p
            className="text text_type_digits-default"
            style={titlePositionCenter ? { textAlign: 'center' } : null}
          >{`#${number}`}</p>
        </li>
        <li className={`${styles['order__list-item']} mb-3`}>
          <p className="text text_type_main-medium">{name}</p>
        </li>
        <li className={`${styles['order__list-item']} mb-15`}>
          <p
            className="text text_type_main-default"
            style={status.done ? { color: '#00CCCC' } : null}
          >
            {status[Object.keys(status)]}
          </p>
        </li>
        <li className={`${styles['order__list-item']} mb-6`}>
          <p className="text text_type_main-medium">Состав:</p>
        </li>
        <li className={`${styles['order__list-item']} mb-10`}>
          <ul className={styles['order__ingredients-list']}>
            {ingredients.map((ingredient) => (
              <li
                key={ingredient.id}
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
          <FormattedDate date={new Date(createdAt)} />
          <div className={styles['order__price-container']}>
            <p className="text text_type_digits-default">{price}</p>
            <CurrencyIcon type="primary" />
          </div>
        </li>
      </ul>
    </div>
  )
}

export { Order }
