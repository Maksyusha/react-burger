import { ingredientTypes } from '../../../../../../utils/types.js';
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './ingredients-item.module.css';
import {useDispatch} from 'react-redux';
import { SET_INGREDIENT_MODAL, SHOW_INGREDIENT_MODAL } from '../../../../../../services/actions/burger-ingredients.js';
import { useDrag } from 'react-dnd';

function IngredientsItem({data}) {
  const {image, name, price, __v} = data;

  const dispatch = useDispatch();

  const openModal = () => {
    dispatch({type: SET_INGREDIENT_MODAL, ingredient: data})
    dispatch({type: SHOW_INGREDIENT_MODAL})
  }

  const [, dragRef] = useDrag({
    type: 'ingredient',
    item: {...data}
  })

  return (
    <li className={itemStyles['ingredient-item']} onClick={openModal}>
      {__v !== 0 && <Counter count={__v} size='default'/>}
      <img ref={dragRef} className={`${itemStyles['ingredient-item__image']} mr-4 ml-4 mb-1`} src={image} alt={name}/>
      <div className={`${itemStyles['ingredient-item__price-container']} mb-1`}>
        <p className='text text_type_digits-default mr-2'>{price}</p>
        <CurrencyIcon type='primary'/>
      </div>
      <p className={`${itemStyles['ingredient-item__text']} text text_type_main-default`}>{name}</p>
    </li>
  )
}



IngredientsItem.propTypes = {
  data: ingredientTypes
}



export {IngredientsItem};
