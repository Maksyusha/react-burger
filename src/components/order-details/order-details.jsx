import orderDetStyles from './order-details.module.css'
import doneImage from '../../images/done.svg'
import { useSelector } from 'react-redux'

function OrderDetails() {
  const { orderNumber } = useSelector((store) => store.orderDetails)

  return (
    <div className={`${orderDetStyles['order-det']} pt-30 pr-25 pb-30 pl-25`}>
      <h1 className="text text_type_digits-large">{orderNumber}</h1>
      <p className="text text_type_main-medium mt-8">идентификатор заказа</p>
      <img className="mt-15" src={doneImage} alt="Заказ готовится" />
      <p className="text text_type_main-default mt-15">
        Ваш заказ начали готовить
      </p>
      <p className="text text_type_main-default text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  )
}

export { OrderDetails }
