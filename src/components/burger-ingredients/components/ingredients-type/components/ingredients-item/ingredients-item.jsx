import PropTypes from 'prop-types'
import {Counter, CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import itemStyles from './ingredients-item.module.css';

function IngredientsItem(props) {
  const {image, name, price, __v} = props.data;

  return (
    <li className={itemStyles['ingredient-item']} onClick={(evt) => props.onClick(evt, props.data)}>
      {__v !== 0 && <Counter count={__v} size='default'/>}
      <img className='mr-4 ml-4 mb-1' src={image} alt={name}/>
      <div className={`${itemStyles['ingredient-item__price-container']} mb-1`}>
        <p className='text text_type_digits-default mr-2'>{price}</p>
        <CurrencyIcon type='primary'/>
      </div>
      <p className={`${itemStyles['ingredient-item__text']} text text_type_main-default`}>{name}</p>
    </li>
  )
}



IngredientsItem.propTypes = {
  data: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    image: PropTypes.string.isRequired,
    __v: PropTypes.number.isRequired
  }).isRequired,
  onClick: PropTypes.func.isRequired
}



export {IngredientsItem};
