import { createRef, FC, RefObject, SyntheticEvent, useState } from 'react'
import ingredientsStyles from './burger-ingredients.module.css'
import { IngredientsMenu } from './components/ingredients-menu/ingredients-menu'
import { IngredientsType } from './components/ingredients-type/ingredients-type'
import { useAppSelector } from '../../hooks/hooks'

const BurgerIngredients: FC = () => {
  const { ingredients, ingredientsFailed } = useAppSelector(
    (store) => store.burgerIngredients
  )

  const dataBun = ingredients.filter((ingredient) => ingredient.type === 'bun')
  const dataSauce = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  )
  const dataMain = ingredients.filter(
    (ingredient) => ingredient.type === 'main'
  )

  const [current, setCurrent] = useState<string>('bun')

  const typeRef: RefObject<HTMLUListElement> = createRef()
  const bunRef: RefObject<HTMLLIElement> = createRef()
  const sauceRef: RefObject<HTMLLIElement> = createRef()
  const mainRef: RefObject<HTMLLIElement> = createRef()

  function changeTypeByScroll(evt: SyntheticEvent<HTMLUListElement, UIEvent>) {
    if (evt.currentTarget.scrollTop > 750) {
      setCurrent('main')
    } else if (evt.currentTarget.scrollTop > 250) {
      setCurrent('sauce')
    } else {
      setCurrent('bun')
    }
  }

  function scrollToChosenType(evt: string) {
    setCurrent(evt)

    if (evt === 'bun') {
      bunRef.current && bunRef.current.scrollIntoView({ behavior: 'smooth' })
    } else if (evt === 'sauce') {
      sauceRef.current &&
        sauceRef.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      mainRef.current && mainRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {ingredientsFailed ? (
        <p className="text_type_main-medium mt-25 mr-20 ml-20 mb-25">
          Произшла ошибка загрузки данных ингредиентов
        </p>
      ) : (
        <div>
          <h1 className="text text_type_main-large mt-10">Соберите бургер</h1>
          <IngredientsMenu current={current} onClick={scrollToChosenType} />
          <ul
            ref={typeRef}
            className={ingredientsStyles['burger-ingr__list']}
            onScroll={changeTypeByScroll}
          >
            <IngredientsType
              innerRef={bunRef}
              ingredients={dataBun}
              title="Булки"
            />
            <IngredientsType
              innerRef={sauceRef}
              ingredients={dataSauce}
              title="Соусы"
            />
            <IngredientsType
              innerRef={mainRef}
              ingredients={dataMain}
              title="Начинки"
            />
          </ul>
        </div>
      )}
    </>
  )
}

export { BurgerIngredients }
