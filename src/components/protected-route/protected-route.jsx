import { Redirect, Route } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Preloader } from '../preloader/preloader.jsx'

function ProtectedRoute({ children, ...rest }) {
  const { isAuthChecked, userData } = useSelector((store) => store.user)

  if (!isAuthChecked) {
    return <Preloader />
  }

  return (
    <Route
      {...rest}
      render={({ location }) =>
        userData ? (
          children
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: location } }} />
        )
      }
    />
  )
}

export default ProtectedRoute
