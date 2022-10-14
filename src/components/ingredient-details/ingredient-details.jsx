import PropTypes from 'prop-types';
import ingrDetStyles from './ingredient-details.module.css';



function IngredientDetails(props) {
  const {image_large, name, calories, proteins, fat, carbohydrates} = props.data;

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
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    proteins: PropTypes.number.isRequired,
    fat: PropTypes.number.isRequired,
    carbohydrates: PropTypes.number.isRequired,
    calories: PropTypes.number.isRequired,
    image_large: PropTypes.string.isRequired,
  }).isRequired,
}



export {IngredientDetails};
