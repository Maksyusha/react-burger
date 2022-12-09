import { useSelector, useDispatch } from 'react-redux'
import { Link, Route, useRouteMatch } from 'react-router-dom'
import styles from './profile-page.module.css'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { getLogout, patchUser } from '../../services/actions/user.js'
import { useForm } from '../../hooks/useForm.js'

function ProfilePage() {
  const { userData } = useSelector((store) => store.user)
  const { values, handleChange, setValues } = useForm({ ...userData, password: '' })
  const dispatch = useDispatch()

  const match = useRouteMatch('/profile/orders') ? 'orders' : 'profile'

  function handleLogout() {
    dispatch(getLogout())
  }

  function handleCancel() {
    setValues({ ...userData, password: '' })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    dispatch(patchUser(values))
  }

  return (
    <div className={styles['profile-page']}>
      <ul className={styles['profile-page__list']}>
        <li className={styles['profile-page__list-item']}>
          <Link
            className={`${styles['profile-page__link']} ${
              match === 'profile' ? styles['profile-page__link__active'] : null
            } text text_type_main-medium text_color_inactive`}
            to="/profile"
          >
            Профиль
          </Link>
        </li>
        <li className={styles['profile-page__list-item']}>
          <Link
            className={`${styles['profile-page__link']} ${
              match === 'orders' ? styles['profile-page__link__active'] : null
            } text text_type_main-medium text_color_inactive`}
            to="/profile/orders"
          >
            История заказов
          </Link>
        </li>
        <li className={styles['profile-page__list-item']}>
          <Link
            className={`${styles['profile-page__link']} text text_type_main-medium text_color_inactive`}
            to="/login"
            onClick={handleLogout}
          >
            Выход
          </Link>
        </li>
        <li
          className={`${styles['profile-page__list-item']} text text_type_main-default text_color_inactive mt-20`}
        >
          В этом разделе вы можете изменить свои персональные данные
        </li>
      </ul>
      <Route exact path="/profile">
        <form className={styles['profile-page__form']} onSubmit={handleSubmit}>
          <Input
            name="name"
            value={values.name}
            placeholder="Имя"
            icon="EditIcon"
            onChange={handleChange}
          />
          <EmailInput
            name="email"
            value={values.email}
            placeholder="Логин"
            icon="EditIcon"
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            value={values.password}
            icon="EditIcon"
            onChange={handleChange}
          />
          <div className={styles['profile-page__buttons-container']}>
            <Button
              htmlType="button"
              type="secondary"
              size="medium"
              onClick={handleCancel}
            >
              Отмена
            </Button>
            <Button htmlType="submit" type="primary" size="medium">
              Сохранить
            </Button>
          </div>
        </form>
      </Route>
      <Route exact path="/profile/orders"></Route>
    </div>
  )
}

export default ProfilePage
