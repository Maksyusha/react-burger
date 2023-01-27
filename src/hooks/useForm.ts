import { useState, ChangeEvent } from 'react'

type TValues = {
  name?: string
  email?: string
  password?: string
  token?: string
}

export function useForm(inputValues: TValues) {
  const [values, setValues] = useState(inputValues)

  const handleChange = (evt: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = evt.target
    setValues({ ...values, [name]: value })
  }
  return { values, handleChange, setValues }
}
