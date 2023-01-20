import authStyles from '../../styles/auth.module.css'
import {
  Input,
  EmailInput,
  PasswordInput,
  Button,
} from '@ya.praktikum/react-developer-burger-ui-components'
import { Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { sendRegistration } from '../../services/actions/user'
import { useForm } from '../../hooks/useForm'

function RegisterPage() {
  const { values, handleChange } = useForm({
    name: '',
    email: '',
    password: '',
  })

  const dispatch = useDispatch()

  const handleSubmit = (evt) => {
    evt.preventDefault()
    if (!values.name || !values.email || !values.password) {
      return
    }
    dispatch(sendRegistration(values))
  }

  return (
    <div className={authStyles['auth']}>
      <h1 className="text text_type_main-medium mb-6">Регистрация</h1>
      <form className={authStyles['auth__form']} onSubmit={handleSubmit}>
        <Input
          name="name"
          value={values.name}
          placeholder="Имя"
          onChange={handleChange}
        />
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
        Уже зарегистрированы?
        <Link className={authStyles['auth__link']} to="/login">
          Войти
        </Link>
      </p>
    </div>
  )
}

export default RegisterPage
