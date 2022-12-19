import { useSelector, useDispatch } from 'react-redux'
import { Route } from 'react-router-dom'
import styles from './profile-page.module.css'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { patchUser } from '../../services/actions/user.js'
import { useForm } from '../../hooks/useForm.js'
import { ProtectedLinks } from '../../components/protected-links/protected-links'

function ProfilePage() {
  const { userData } = useSelector((store) => store.user)
  const { values, handleChange, setValues } = useForm({
    ...userData,
    password: '',
  })
  const dispatch = useDispatch()

  function handleCancel() {
    setValues({ ...userData, password: '' })
  }

  function handleSubmit(evt) {
    evt.preventDefault()
    dispatch(patchUser(values))
  }

  return (
    <div className={styles['profile-page']}>
      <ProtectedLinks />
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
