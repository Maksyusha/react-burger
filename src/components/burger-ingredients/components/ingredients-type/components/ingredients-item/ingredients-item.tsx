import {
  Counter,
  CurrencyIcon,
} from '@ya.praktikum/react-developer-burger-ui-components'
import itemStyles from './ingredients-item.module.css'
import { FC } from 'react'
import { useDrag } from 'react-dnd'
import { Link, useLocation } from 'react-router-dom'
import { TIngredient } from '../../../../../../services/types/data.js'

type TIngredientsItemProps = {
  ingredient: TIngredient
}

const IngredientsItem: FC<TIngredientsItemProps> = ({ ingredient }) => {
  const { image, name, price, qty } = ingredient
  const location = useLocation()

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: { ...ingredient },
  })

  return (
    <li className={itemStyles['ingredient-item']}>
      <Link
        className={itemStyles['ingredient-item__link']}
        to={{
          pathname: `/ingredients/${ingredient._id}`,
          state: { background: location },
        }}
      >
        {qty !== 0 && <Counter count={qty} size="default" />}
        <img
          ref={dragRef}
          className={`${itemStyles['ingredient-item__image']} mr-4 ml-4 mb-1`}
          src={image}
          alt={name}
        />
        <div
          className={`${itemStyles['ingredient-item__price-container']} mb-1`}
        >
          <p className="text text_type_digits-default mr-2">{price}</p>
          <CurrencyIcon type="primary" />
        </div>
        <p
          className={`${itemStyles['ingredient-item__text']} text text_type_main-default`}
        >
          {name}
        </p>
      </Link>
    </li>
  )
}

export { IngredientsItem }
