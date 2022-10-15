import PropTypes from 'prop-types';
import { ingredientTypes } from '../../utils/types.js';
import constrStyles from './burger-constructor.module.css'
import {ConstructorElement, DragIcon, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import {Total} from './components/total/total.jsx'



function BurgerConstructor(props) {

  const actualIngredients = props.data.filter((item) => item.__v !== 0);
  const bun = actualIngredients.filter((item) => item.type === 'bun')[0];

  function renderElement(item) {
    return (
      <li className={`${constrStyles['burger-constr__list-item']}`} key={item._id}>
        <DragIcon type="primary" />
        <ConstructorElement
        isLocked={false}
        thumbnail={item.image}
        text={item.name}
        price={item.price}
        />
      </li>
    )
  }

  return (
    <div className='mt-25'>
      {(bun !== undefined && bun.length !== 0) &&
      <div className='mb-4 ml-6'>
        <ConstructorElement
          type='top'
          isLocked={true}
          thumbnail={bun.image}
          text={`${bun.name} (верх)`}
          price={bun.price}
        />
      </div>}
      <ul className={constrStyles['burger-constr__list']}>
        {actualIngredients.filter((item) => item.type === 'sauce')
        .map((item) => renderElement(item))}
        {actualIngredients.filter((item) => item.type === 'main')
        .map((item) => renderElement(item))}
      </ul>
      {(bun !== undefined && bun.length !== 0) &&
      <div className='mt-4 ml-6'>
        <ConstructorElement
          type='bottom'
          isLocked={true}
          thumbnail={bun.image}
          text={`${bun.name} (низ)`}
          price={bun.price}
        />
      </div>}
      <div className={`${constrStyles['burger-constr__order']} mt-10`}>
          <Total data={actualIngredients}/>
          <Button htmlType='button' type='primary' size='large' onClick={() => props.onClick()}>Оформить заказ</Button>
      </div>
    </div>
  )
}



BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientTypes).isRequired
}



export {BurgerConstructor};
