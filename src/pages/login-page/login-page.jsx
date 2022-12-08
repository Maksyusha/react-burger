import authStyles from '../../styles/auth.module.css'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Redirect, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { sendAuthorization } from '../../services/actions/user.js'

function LoginPage() {
  const { userData } = useSelector((store) => store.user)
  const [formValues, setFormValues] = useState({
    email: '',
    password: '',
  })

  const dispatch = useDispatch()
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
    if (!formValues.email || !formValues.password) {
      return
    }
    dispatch(sendAuthorization(formValues))
  }

  if (userData) {
    const { from } = location.state || { from: { pathname: '/' } }
    return <Redirect to={from} />
  }

  return (
    <div className={authStyles['auth']}>
      <h1 className="text text_type_main-medium mb-6">Вход</h1>
      <form className={authStyles['auth__form']} onSubmit={handleSubmit}>
        <EmailInput
          name="email"
          value={formValues.email}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          value={formValues.password}
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
