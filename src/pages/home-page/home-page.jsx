import styles from './home-page.module.css'
import { BurgerIngredients } from '../../components/burger-ingredients/burger-ingredients.jsx'
import { BurgerConstructor } from '../../components/burger-constructor/burger-constructor.jsx'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

function HomePage() {
  return (
      <div className={styles['burger-container']}>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </div>
  )
}

export default HomePage
