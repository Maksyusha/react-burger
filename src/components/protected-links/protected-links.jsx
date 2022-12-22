import { useDispatch } from 'react-redux'
import { Link, useRouteMatch } from 'react-router-dom'
import { getLogout } from '../../services/actions/user'
import styles from './protected-links.module.css'

function ProtectedLinks() {
  const dispatch = useDispatch()

  const match = useRouteMatch('/profile/orders') ? 'orders' : 'profile'

  function handleLogout() {
    dispatch(getLogout())
  }

  return (
    <ul className={styles['protected-links']}>
      <li className={styles['protected-links__list-item']}>
        <Link
          className={`${styles['protected-links__link']} ${
            match === 'profile' ? styles['protected-links__link_active'] : null
          } text text_type_main-medium text_color_inactive`}
          to="/profile"
        >
          Профиль
        </Link>
      </li>
      <li className={styles['protected-links__list-item']}>
        <Link
          className={`${styles['protected-links__link']} ${
            match === 'orders' ? styles['protected-links__link_active'] : null
          } text text_type_main-medium text_color_inactive`}
          to="/profile/orders"
        >
          История заказов
        </Link>
      </li>
      <li className={styles['protected-links__list-item']}>
        <Link
          className={`${styles['protected-links__link']} text text_type_main-medium text_color_inactive`}
          to="/login"
          onClick={handleLogout}
        >
          Выход
        </Link>
      </li>
      <li
        className={`${styles['protected-links__list-item']} text text_type_main-default text_color_inactive mt-20`}
      >
        В этом разделе вы можете изменить свои персональные данные
      </li>
    </ul>
  )
}

export { ProtectedLinks }
