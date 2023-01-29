import typeStyles from './ingredients-type.module.css'
import { IngredientsItem } from './components/ingredients-item/ingredients-item'
import { FC, RefObject } from 'react'
import { TIngredient } from '../../../../services/types/data'

type TIngredientsTypeProps = {
  innerRef: RefObject<HTMLLIElement>
  ingredients: TIngredient[]
  title: string
}

const IngredientsType: FC<TIngredientsTypeProps> = ({
  innerRef,
  ingredients,
  title,
}) => {
  return (
    <li ref={innerRef} className="mb-10">
      <h2
        className={`${typeStyles['ingredients-type__title']} text text_type_main-medium`}
      >
        {title}
      </h2>
      <ul className={`${typeStyles['ingredients-type__list']} pt-6 pr-4 pl-4`}>
        {ingredients.map((ingredient) => (
          <IngredientsItem ingredient={ingredient} key={ingredient._id} />
        ))}
      </ul>
    </li>
  )
}

export { IngredientsType }
