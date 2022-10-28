import PropTypes from 'prop-types';
import { ingredientTypes } from '../../../../utils/types.js';
import totalStyles from './total.module.css';
import {CurrencyIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {useSelector, useDispatch} from 'react-redux';
import { postChosenIngredients, FILL_ORDER_LIST, SHOW_ORDER_MODAL } from '../../../../services/actions/burger-constructor.js';


function Total() {
  const {totalPrice, chosenBunIngredient, chosenOtherIngredients} = useSelector(store => store.burgerConstructor);

  const dispatch = useDispatch();

  const showOrderModal = () => {
    const dataToPost = {ingredients: [
      chosenBunIngredient[0]._id,
      ...chosenOtherIngredients.filter((ingredient) => ingredient.type !== 'bun').map((ingredient) => ingredient._id),
      chosenBunIngredient[0]._id
    ]}
    dispatch({type: FILL_ORDER_LIST, orderList: dataToPost});
    dispatch(postChosenIngredients(dataToPost));
    dispatch({type: SHOW_ORDER_MODAL});
  }

  return (
    <div className={`${totalStyles['total__container']} mt-10 mr-10`}>
      <div className={totalStyles['total__price-container']}>
        <p className='text text_type_digits-medium mr-2'>{totalPrice}</p>
        <div className={totalStyles['total__icon']}>
          <CurrencyIcon/>
        </div>
      </div>
      <Button htmlType='button' type='primary' size='large' onClick={showOrderModal}>Оформить заказ</Button>
    </div>
  )
}



Total.propTypes = {
  data: PropTypes.arrayOf(ingredientTypes)
}



export {Total};
