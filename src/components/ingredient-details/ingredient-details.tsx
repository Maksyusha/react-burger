import ingrDetStyles from './ingredient-details.module.css'
import { FC } from 'react'
import { useParams } from 'react-router-dom'
import { Preloader } from '../preloader/preloader'
import { useAppSelector } from '../../hooks/hooks'

type TIngredientDetailsProps = {
  titlePositionCenter?: boolean
}

export const IngredientDetails: FC<TIngredientDetailsProps> = ({ titlePositionCenter }) => {
  const { ingredients } = useAppSelector((store) => store.burgerIngredients)
  const { id }: { id: string } = useParams()

  if (ingredients.length === 0) {
    return <Preloader />
  }

  const ingredient = ingredients.find((ingredient) => ingredient._id === id)

  return (
    <div className={ingrDetStyles['ingr-det']}>
      <h2
        className={`${ingrDetStyles['ingr-det__title']} text text_type_main-large`}
        style={titlePositionCenter ? { alignSelf: 'center' } : undefined}
      >
        Детали ингредиента
      </h2>
      <img
        className="mb-4"
        src={ingredient?.image_large}
        alt={ingredient?.name}
      />
      <p className="text text_type_main-medium mb-8">{ingredient?.name}</p>
      <ul
        className={`${ingrDetStyles['ingr-det__list']} text text_type_main-default text_color_inactive`}
      >
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className="text">Калории,ккал</p>
          <p className="text text_type_digits-default">
            {ingredient?.calories}
          </p>
        </li>
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className="text">Белки, г</p>
          <p className="text text_type_digits-default">
            {ingredient?.proteins}
          </p>
        </li>
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className="text">Жиры, г</p>
          <p className="text text_type_digits-default">{ingredient?.fat}</p>
        </li>
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className="text">Углеводы, г</p>
          <p className="text text_type_digits-default">
            {ingredient?.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  )
}
