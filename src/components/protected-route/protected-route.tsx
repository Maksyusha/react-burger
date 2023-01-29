import { Redirect, Route } from 'react-router-dom'
import { Preloader } from '../preloader/preloader'
import { FC } from 'react'
import { useAppSelector } from '../../hooks/hooks'

type TProtectedRouteProps = {
  exact: boolean
  path: string
  children: JSX.Element
}

const ProtectedRoute: FC<TProtectedRouteProps> = ({ children, ...rest }) => {
  const { isAuthChecked, user } = useAppSelector((store) => store.user)

  if (!isAuthChecked) {
    return <Preloader />
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  )
}

export default ProtectedRoute
