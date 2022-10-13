import ingrDetStyles from './ingredient-details.module.css';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';



function IngredientDetails(props) {
  const {image_large, name, calories, proteins, fat, carbohydrates} = props.data;

  return (
    <div className={`${ingrDetStyles['ingr-det']} pt-10 pl-10 pb-15 pr-10`}>
      <div className={ingrDetStyles['ingr-det__container']}>
        <h2 className='text text_type_main-large'>Детали ингредиента</h2>
        <button className={ingrDetStyles['ingr-det_button-close']} type='button' onClick={props.onButtonClick}>
          <CloseIcon/>
        </button>
      </div>
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



export {IngredientDetails};
