import { Link, useLocation } from 'react-router-dom'
import headerStyles from './app-header.module.css'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  const location = useLocation()
  const routes = ['/', '/feed', '/profile']

  let match

  function matchRoute(routes, path) {
    let currentRoute = '/' + path.split('/')[1]
    match = routes.find((route) => route === currentRoute)
  }

  matchRoute(routes, location.pathname)

  return (
    <header className={`${headerStyles['app-header']} p-4`}>
      <nav className={`${headerStyles['app-header__nav-bar']}`}>
        <ul className={headerStyles['app-header__menu']}>
          <li
            className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5 mr-2`}
          >
            <Link
              className={`${headerStyles['app-header__link']} ${
                match === '/' ? headerStyles['app-header__link_active'] : null
              } text text_type_main-default`}
              to="/"
            >
              <div className={`${headerStyles['app-header__image']} mr-2`}>
                <BurgerIcon type={match === '/' ? 'primary' : 'secondary'} />
              </div>
              Конструктор
            </Link>
          </li>
          <li
            className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5`}
          >
            <Link
              className={`${headerStyles['app-header__link']} ${
                match === '/feed'
                  ? headerStyles['app-header__link_active']
                  : null
              } text text_type_main-default`}
              to="/feed"
            >
              <div className={`${headerStyles['app-header__image']} mr-2`}>
                <ListIcon type={match === '/feed' ? 'primary' : 'secondary'} />
              </div>
              Лента заказов
            </Link>
          </li>
          <li className={headerStyles['app-header__logo']}>
            <Logo />
          </li>
          <li
            className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5`}
          >
            <Link
              className={`${headerStyles['app-header__link']} ${
                match === '/profile'
                  ? headerStyles['app-header__link_active']
                  : null
              } text text_type_main-default`}
              to="/profile"
            >
              <div className={`${headerStyles['app-header__image']} mr-2`}>
                <ProfileIcon type={match === '/profile' ? 'primary' : 'secondary'} />
              </div>
              Личный кабинет
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export { AppHeader }
