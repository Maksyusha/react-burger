import authStyles from '../../styles/auth.module.css'
import {
  EmailInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link, useHistory } from 'react-router-dom'
import { forgotPasswordApi } from '../../services/api.js'
import { useForm } from '../../hooks/useForm.js'

function ForgotPasswordPage() {
  const { values, handleChange } = useForm({ email: '' })
  const history = useHistory()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    forgotPasswordApi(values)
      .then(() => {
        history.replace('/reset-password', { fromForgotPage: true })
      })
      .catch((err) => console.log(err))
  }

  return (
    <div className={authStyles['auth']}>
      <h1 className="text text_type_main-medium mb-6">Восстановление пароля</h1>
      <form className={authStyles['auth__form']} onSubmit={handleSubmit}>
        <EmailInput name='email' value={values.email} onChange={handleChange} />
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
