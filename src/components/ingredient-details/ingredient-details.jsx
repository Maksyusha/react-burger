import { ingredientTypes } from '../../utils/types.js';
import ingrDetStyles from './ingredient-details.module.css';
import {useSelector} from 'react-redux';


function IngredientDetails() {
  const {image_large, name, calories, proteins, fat, carbohydrates} = useSelector(store => store.burgerIngredients.ingredientModal);

  return (
    <div className={ingrDetStyles['ingr-det']}>
      <h2 className={`${ingrDetStyles['ingr-det__title']} text text_type_main-large`}>Детали ингредиента</h2>
      <img className='mb-4' src={image_large} alt={name}/>
      <p className='text text_type_main-medium mb-8'>{name}</p>
      <ul className={`${ingrDetStyles['ingr-det__list']} text text_type_main-default text_color_inactive`}>
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className='text'>Калории,ккал</p>
          <p className='text text_type_digits-default'>{calories}</p>
        </li>
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className='text'>Белки, г</p>
          <p className='text text_type_digits-default'>{proteins}</p>
        </li>
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className='text'>Жиры, г</p>
          <p className='text text_type_digits-default'>{fat}</p>
        </li>
        <li className={ingrDetStyles['ingr-det__list-item']}>
          <p className='text'>Углеводы, г</p>
          <p className='text text_type_digits-default'>{carbohydrates}</p>
        </li>
      </ul>
    </div>
  )
}



IngredientDetails.propTypes = {
  data: ingredientTypes
}



export {IngredientDetails};
