import authStyles from '../../styles/auth.module.css'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Redirect, Link, useLocation } from 'react-router-dom'
import { sendAuthorization } from '../../services/slices/user-slice'
import { useForm } from '../../hooks/useForm'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { ChangeEvent, FC } from 'react'
import { Location } from 'history'

const LoginPage: FC = () => {
  const { user } = useAppSelector((store) => store.user)
  const { values, handleChange } = useForm({
    email: '',
    password: '',
  })
  const dispatch = useAppDispatch()
  const location = useLocation<{ from: Location }>()

  const handleSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (!values.email || !values.password) {
      return
    }
    dispatch(sendAuthorization(values))
  }

  if (user) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Redirect to={from} />
  }

  return (
    <div className={authStyles['auth']}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form className={authStyles['auth__form']} onSubmit={handleSubmit}>
        <EmailInput name="email" value={values.email || ''} onChange={handleChange} />
        <PasswordInput
          name="password"
          value={values.password || ''}
          onChange={handleChange}
        />
        <Button htmlType="submit" type="primary" size="large">
          Войти
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вы — новый пользователь?
        <Link className={authStyles['auth__link']} to="/register">
          Зарегистрироваться
        </Link>
      </p>
      <p className="text text_type_main-default text_color_inactive mt-4">
        Забыли пароль?
        <Link className={authStyles['auth__link']} to="/forgot-password">
          Восстановить пароль
        </Link>
      </p>
    </div>
  )
}

export default LoginPage
