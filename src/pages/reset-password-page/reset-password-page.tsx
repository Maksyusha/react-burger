import { Link, Redirect, useLocation } from 'react-router-dom'
import authStyles from '../../styles/auth.module.css'
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Location } from 'history'
import { resetPasswordApi } from '../../services/api'
import { useForm } from '../../hooks/useForm'
import { ChangeEvent, FC } from 'react'

const ResetPasswordPage: FC = () => {
  const { values, handleChange } = useForm({ password: '', token: '' })
  const location = useLocation<{ fromForgotPage: Location }>()

  const handleSubmit = (evt: ChangeEvent<HTMLFormElement>) => {
    evt.preventDefault()
    if (!values.password || !values.token) {
      return
    }
    resetPasswordApi(values)
  }

  return location.state?.fromForgotPage ? (
    <div className={authStyles['auth']}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form className={authStyles['auth__form']} onSubmit={handleSubmit}>
        <PasswordInput
          name="password"
          value={values.password || ''}
          placeholder="Введите новый пароль"
          onChange={handleChange}
        />
        <Input
          name="token"
          value={values.token || ''}
          placeholder="Введите код из письма"
          onChange={handleChange}
        />
        <Button htmlType="submit" type="primary" size="large">
          Сохранить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Link className={authStyles['auth__link']} to="/login">
          Войти
        </Link>
      </p>
    </div>
  ) : (
    <Redirect to="/forgot-password" />
  )
}

export default ResetPasswordPage
