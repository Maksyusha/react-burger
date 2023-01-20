import { Link, useRouteMatch } from 'react-router-dom'
import headerStyles from './app-header.module.css'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  const isHome = !!useRouteMatch({ path: '/', exact: true })
  const isFeed = !!useRouteMatch({ path: '/feed' })
  const isProfile = !!useRouteMatch({ path: '/profile' })

  return (
    <header className={`${headerStyles['app-header']} p-4`}>
      <nav className={`${headerStyles['app-header__nav-bar']}`}>
        <ul className={headerStyles['app-header__menu']}>
          <li
            className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5 mr-2`}
          >
            <Link
              className={`${headerStyles['app-header__link']} ${
                isHome ? headerStyles['app-header__link_active'] : null
              } text text_type_main-default`}
              to="/"
            >
              <div className={`${headerStyles['app-header__image']} mr-2`}>
                <BurgerIcon type={isHome ? 'primary' : 'secondary'} />
              </div>
              Конструктор
            </Link>
          </li>
          <li
            className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5`}
          >
            <Link
              className={`${headerStyles['app-header__link']} ${
                isFeed ? headerStyles['app-header__link_active'] : null
              } text text_type_main-default`}
              to="/feed"
            >
              <div className={`${headerStyles['app-header__image']} mr-2`}>
                <ListIcon type={isFeed ? 'primary' : 'secondary'} />
              </div>
              Лента заказов
            </Link>
          </li>
          <li className={headerStyles['app-header__logo']}>
            <Link to="/">
              <Logo />
            </Link>
          </li>
          <li
            className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5`}
          >
            <Link
              className={`${headerStyles['app-header__link']} ${
                isProfile ? headerStyles['app-header__link_active'] : null
              } text text_type_main-default`}
              to="/profile"
            >
              <div className={`${headerStyles['app-header__image']} mr-2`}>
                <ProfileIcon type={isProfile ? 'primary' : 'secondary'} />
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
