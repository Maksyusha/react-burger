import { createRef, useState } from 'react'
import ingredientsStyles from './burger-ingredients.module.css'
import { IngredientsMenu } from './components/ingredients-menu/ingredients-menu.jsx'
import { IngredientsType } from './components/ingredients-type/ingredients-type.jsx'
import { useSelector } from 'react-redux'

function BurgerIngredients() {
  const { ingredients, ingredientFailed } = useSelector(
    (store) => store.burgerIngredients
  )

  const dataBun = ingredients.filter((ingredient) => ingredient.type === 'bun')
  const dataSauce = ingredients.filter(
    (ingredient) => ingredient.type === 'sauce'
  )
  const dataMain = ingredients.filter(
    (ingredient) => ingredient.type === 'main'
  )

  const [current, setCurrent] = useState('bun')

  const typeRef = createRef()
  const bunRef = createRef()
  const sauceRef = createRef()
  const mainRef = createRef()

  function changeTypeByScroll(evt) {
    if (evt.target.scrollTop > 750) {
      setCurrent('main')
    } else if (evt.target.scrollTop > 250) {
      setCurrent('sauce')
    } else {
      setCurrent('bun')
    }
  }

  function scrollToChosenType(evt) {
    setCurrent(evt)

    if (evt === 'bun') {
      bunRef.current.scrollIntoView({ behavior: 'smooth' })
    } else if (evt === 'sauce') {
      sauceRef.current.scrollIntoView({ behavior: 'smooth' })
    } else {
      mainRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      {ingredientFailed ? (
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
            <IngredientsType innerRef={bunRef} data={dataBun} title="Булки" />
            <IngredientsType
              innerRef={sauceRef}
              data={dataSauce}
              title="Соусы"
            />
            <IngredientsType
              innerRef={mainRef}
              data={dataMain}
              title="Начинки"
            />
          </ul>
        </div>
      )}
    </>
  )
}

export { BurgerIngredients }
