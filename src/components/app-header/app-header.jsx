import headerStyles from './app-header.module.css'
import {BurgerIcon, ListIcon, ProfileIcon, Logo} from '@ya.praktikum/react-developer-burger-ui-components';



function AppHeader() {
  return (
    <header className={`${headerStyles['app-header']} p-4`}>
      <nav className={`${headerStyles['app-header__nav-bar']}`}>
        <ul className={headerStyles['app-header__menu']}>
          <li className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5 mr-2`}>
            <BurgerIcon type='primary'/>
            <a className='text text_type_main-default ml-2'>Конструктор</a>
          </li>
          <li className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5`}>
            <ListIcon type='primary'/>
            <a className='text text_type_main-default ml-2'>Лента заказов</a>
          </li>
          <li className={headerStyles['app-header__logo']}>
            <Logo/>
          </li>
          <li className={`${headerStyles['app-header__menu-item']} pt-4 pb-4 pr-5 pl-5`}>
            <ProfileIcon type='primary'/>
            <a className='text text_type_main-default ml-2'>Личный кабинет</a>
          </li>
        </ul>
      </nav>
    </header>
  )
}



export {AppHeader};
