import { Tab } from '@ya.praktikum/react-developer-burger-ui-components'
import { FC } from 'react'

type TIngredientsMenuProps = {
  current: string
  onClick: (value: string) => void
}

const IngredientsMenu: FC<TIngredientsMenuProps> = ({ current, onClick }) => {
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

export { IngredientsMenu }
