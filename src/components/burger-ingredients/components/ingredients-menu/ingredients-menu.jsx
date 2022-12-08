import PropTypes from 'prop-types'
import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'

function IngredientsMenu({ current, onClick }) {
  return (
    <div className="mt-5 mb-10" style={{ display: 'flex' }}>
      <Tab value="bun" active={current === 'bun'} onClick={onClick}>
        Булки
      </Tab>
      <Tab value="sauce" active={current === 'sauce'} onClick={onClick}>
        Соусы
      </Tab>
      <Tab value="main" active={current === 'main'} onClick={onClick}>
        Начинки
      </Tab>
    </div>
  )
}

IngredientsMenu.propTypes = {
  current: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export { IngredientsMenu }
