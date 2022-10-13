import orderDetStyles from './order-details.module.css';
import doneImage from '../../images/done.svg';
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components';



function OrderDetails(props) {
  return (
    <div className={`${orderDetStyles['order-det']} pt-30 pr-25 pb-30 pl-25`}>
      <button className={orderDetStyles['order-det__button-close']} onClick={props.onButtonClick}>
        <CloseIcon></CloseIcon>
      </button>
      <h1 className='text text_type_digits-large'>034536</h1>
      <p className='text text_type_main-medium mt-8'>идентификатор заказа</p>
      <img className='mt-15' src={doneImage} alt='Заказ готовится'/>
      <p className='text text_type_main-default mt-15'>Ваш заказ начали готовить</p>
      <p className='text text_type_main-default text_color_inactive mt-2'>Дождитесь готовности на орбитальной станции</p>
    </div>
  )
}



export {OrderDetails};
