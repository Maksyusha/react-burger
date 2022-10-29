import constrStyles from './burger-constructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Total } from './components/total/total.jsx'
import { BurgerItem } from './components/burger-item/burger-item.jsx'
import { useDrop } from 'react-dnd'
import { INCREASE_INGREDIENT_VALUE } from '../../services/actions/burger-ingredients'
import { ADD_CHOSEN_INGREDIENT } from '../../services/actions/burger-constructor'
import { useSelector, useDispatch } from 'react-redux'

function BurgerConstructor() {
  const { chosenBun, chosenIngredients } = useSelector(
    (store) => store.burgerConstructor
  )

  const dispatch = useDispatch()

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item) {
      dispatch({ type: INCREASE_INGREDIENT_VALUE, ingredient: item })
      dispatch({ type: ADD_CHOSEN_INGREDIENT, ingredient: item })
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
        {chosenIngredients !== undefined &&
          chosenIngredients.length > 0 &&
          chosenIngredients.map((ingredient, index) => (
            <BurgerItem
              key={ingredient._id + index}
              index={index}
              item={ingredient}
            />
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
