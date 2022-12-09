import ingrDetStyles from './ingredient-details.module.css'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Preloader } from '../preloader/preloader'

function IngredientDetails({titlePositionCenter}) {
  const { ingredients } = useSelector((store) => store.burgerIngredients)
  const { id } = useParams()

  if (ingredients.length === 0) {
    return <Preloader />
  }

  const { image_large, name, calories, proteins, fat, carbohydrates } =
    ingredients.find((ingredient) => ingredient._id === id)

  return (
    <div className={ingrDetStyles['ingr-det']}>
      <h2
        className={`${ingrDetStyles['ingr-det__title']} text text_type_main-large`}
        style={titlePositionCenter ? {alignSelf: 'center'} : null}
      >
        Детали ингредиента
      </h2>
      <img className="mb-4" src={image_large} alt={name} />
      <p className="text text_type_main-medium mb-8">{name}</p>
      <ul
        className={`${ingrDetStyles['ingr-det__list']} text text_type_main-default text_color_inactive`}
      >
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className="text">Калории,ккал</p>
          <p className="text text_type_digits-default">{calories}</p>
        </li>
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className="text">Белки, г</p>
          <p className="text text_type_digits-default">{proteins}</p>
        </li>
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className="text">Жиры, г</p>
          <p className="text text_type_digits-default">{fat}</p>
        </li>
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className="text">Углеводы, г</p>
          <p className="text text_type_digits-default">{carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}

export { IngredientDetails }
