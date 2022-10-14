import PropTypes from 'prop-types'
import totalStyles from './total.module.css';
import {CurrencyIcon} from '@ya.praktikum/react-developer-burger-ui-components';


function Total(props) {

  function sumTotal(arr) {
    return arr.reduce(
      (acc, curr) => acc + curr.price, 0
    );
  }

  return (
    <li className={totalStyles['total__container']}>
      <p className='text text_type_digits-medium mr-2'>{sumTotal(props.data)}</p>
      <div className={totalStyles['total__icon']}>
        <CurrencyIcon/>
      </div>
    </li>
  )
}



Total.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    price: PropTypes.number.isRequired
  }))
}



export {Total};
