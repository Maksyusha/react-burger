import { useState } from 'react'
import { Link, Redirect, useLocation } from 'react-router-dom'
import authStyles from '../../styles/auth.module.css'
import {
  Input,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { resetPasswordApi } from '../../services/api'

function ResetPasswordPage() {
  const [formValues, setFormValues] = useState({ password: '', token: '' })
  const location = useLocation()

  const handleChange = (evt) => {
    const { name, value } = evt.target
    setFormValues({
      ...formValues,
      [name]: value,
    })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!formValues.password || !formValues.token) {
      return
    }
    resetPasswordApi(formValues)
  }

  return location.state?.fromForgotPage ? (
    <div className={authStyles['auth']}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form
        className={authStyles['auth__form']}
        onSubmit={handleSubmit}
      >
        <PasswordInput
          name="password"
          value={formValues.password}
          placeholder="Введите новый пароль"
          onChange={handleChange}
        />
        <Input
          name="token"
          value={formValues.token}
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
