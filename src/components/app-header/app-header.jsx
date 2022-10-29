import headerStyles from './app-header.module.css'
import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from '@ya.praktikum/react-developer-burger-ui-components'

function AppHeader() {
  return (
    <header className={`${headerStyles['app-header']} p-4`}>
      <nav className={`${headerStyles['app-header__nav-bar']}`}>
        <ul className={headerStyles['app-header__menu']}>
          <li
            className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5 mr-2`}
          >
            <a
              className={`${headerStyles['app-header__link']} ${headerStyles['app-header__link_active']} text text_type_main-default`}
              href="constructor"
            >
              <div className={`${headerStyles['app-header__image']} mr-2`}>
                <BurgerIcon type="primary" />
              </div>
              Конструктор
            </a>
          </li>
          <li
            className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5`}
          >
            <a
              className={`${headerStyles['app-header__link']} text text_type_main-default`}
              href="orders-list"
            >
              <div className={`${headerStyles['app-header__image']} mr-2`}>
                <ListIcon type="secondary" />
              </div>
              Лента заказов
            </a>
          </li>
          <li className={headerStyles['app-header__logo']}>
            <Logo />
          </li>
          <li
            className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5`}
          >
            <a
              className={`${headerStyles['app-header__link']} text text_type_main-default`}
              href="account"
            >
              <div className={`${headerStyles['app-header__image']} mr-2`}>
                <ProfileIcon type="secondary" />
              </div>
              Личный кабинет
            </a>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export { AppHeader }
