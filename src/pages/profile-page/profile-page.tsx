import { ChangeEvent, FC } from 'react'
import { Route } from 'react-router-dom'
import styles from './profile-page.module.css'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { patchUser } from '../../services/slices/user-slice'
import { useForm } from '../../hooks/useForm'
import { ProtectedLinks } from '../../components/protected-links/protected-links'
import { useAppSelector } from '../../hooks/hooks'

const ProfilePage: FC = () => {
  const { user } = useAppSelector((store) => store.user)
  const { values, handleChange, setValues } = useForm({
    ...user,
    password: '',
  })

  function handleCancel() {
    setValues({ ...user, password: '' })
  }

  function handleSubmit(evt: ChangeEvent<HTMLFormElement>) {
    evt.preventDefault()
    patchUser(values)
  }

  return (
    <div className={styles['profile-page']}>
      <ProtectedLinks />
      <Route exact path="/profile">
        <form className={styles['profile-page__form']} onSubmit={handleSubmit}>
          <Input
            name="name"
            value={values.name || ''}
            placeholder="Имя"
            icon="EditIcon"
            onChange={handleChange}
          />
          <EmailInput
            name="email"
            value={values.email || ''}
            placeholder="Логин"
            isIcon={true}
            onChange={handleChange}
          />
          <PasswordInput
            name="password"
            value={values.password || ''}
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
