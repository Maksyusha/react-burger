import constrStyles from './burger-constructor.module.css'
import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components'
import { Total } from './components/total/total'
import { BurgerItem } from './components/burger-item/burger-item'
import { useDrop } from 'react-dnd'
import { increaseIngredientValue } from '../../services/slices/burger-ingredients-slice'
import { addChosenIngredient } from '../../services/slices/burger-constructor-slice'
import { FC } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/hooks'
import { TIngredient } from '../../services/types/data'

const BurgerConstructor: FC = () => {
  const { chosenBun, chosenIngredients } = useAppSelector(
    (store) => store.burgerConstructor
  )

  const dispatch = useAppDispatch()

  const [, dropTarget] = useDrop({
    accept: 'ingredient',
    drop(item: TIngredient) {
      dispatch(increaseIngredientValue({ ingredient: item }))
      dispatch(addChosenIngredient({ ingredient: item }))
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
