import authStyles from '../../styles/auth.module.css'
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory } from 'react-router-dom'
import { useState } from 'react'
import { forgotPasswordApi } from '../../services/api.js'

function ForgotPasswordPage() {
  const [emailValue, setEmailValue] = useState({ email: '' })
  const history = useHistory()

  const handleChange = (evt) => {
    setEmailValue({ email: evt.target.value })
  }

  const handleSubmit = (evt) => {
    evt.preventDefault()
    forgotPasswordApi(emailValue)
      .then(() => {
        history.replace('/reset-password', {fromForgotPage: true})
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={authStyles['auth']}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form
        className={authStyles['auth__form']}
        onSubmit={handleSubmit}
      >
        <EmailInput value={emailValue.email} onChange={handleChange} />
        <Button htmlType="submit" type="primary" size="large">
          Восстановить
        </Button>
      </form>
      <p className="text text_type_main-default text_color_inactive mt-20">
        Вспомнили пароль?
        <Link className={authStyles['auth__link']} to="/login">
          Войти
        </Link>
      </p>
    </div>
  )
}

export default ForgotPasswordPage
