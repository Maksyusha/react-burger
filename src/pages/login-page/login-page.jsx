import authStyles from '../../styles/auth.module.css'
import {
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Redirect, Link, useLocation } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { sendAuthorization } from '../../services/actions/user.js'
import { useForm } from '../../hooks/useForm.js'

function LoginPage() {
  const { userData } = useSelector((store) => store.user)
  const {values, handleChange} = useForm({
    email: '',
    password: '',
  })

  const dispatch = useDispatch()
  const location = useLocation()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!values.email || !values.password) {
      return
    }
    dispatch(sendAuthorization(values))
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
          value={values.email}
          onChange={handleChange}
        />
        <PasswordInput
          name="password"
          value={values.password}
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
