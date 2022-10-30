import constrStyles from './burger-constructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Total } from './components/total/total.jsx'
import { BurgerItem } from './components/burger-item/burger-item.jsx'
import { useDrop } from 'react-dnd'
import { increaseIngredientValue } from '../../services/actions/burger-ingredients'
import { addChosenIngredient } from '../../services/actions/burger-constructor'
import { useSelector, useDispatch } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'

function BurgerConstructor() {
  const { chosenBun, chosenIngredients } = useSelector(
    (store) => store.burgerConstructor
  )

  const dispatch = useDispatch()

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch(increaseIngredientValue(item))
      dispatch(addChosenIngredient({ ...item, key: uuidv4() })) // Из-за ничтожно малой вероятности генерирования одинакового ключа решил отказаться от его проверки на уникальность
    },
  })

  return (
    <div ref={dropTarget} className="mt-25">
      {chosenBun !== null && (
        <div className="mb-4 ml-6">
          <ConstructorElement
            type="top"
            isLocked={true}
            thumbnail={chosenBun.image}
            text={`${chosenBun.name} (верх)`}
            price={chosenBun.price}
          />
        </div>
      )}
      <ul className={constrStyles['burger-constr__list']}>
        {chosenIngredients.map((ingredient, index) => (
          <BurgerItem key={ingredient.key} index={index} item={ingredient} />
        ))}
      </ul>
      {chosenBun !== null && (
        <div className={chosenIngredients.length === 0 ? 'ml-6' : 'mt-4 ml-6'}>
          <ConstructorElement
            type="bottom"
            isLocked={true}
            thumbnail={chosenBun.image}
            text={`${chosenBun.name} (низ)`}
            price={chosenBun.price}
          />
        </div>
      )}
      <Total />
    </div>
  )
}

export { BurgerConstructor }
