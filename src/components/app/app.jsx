import { useEffect } from "react";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header.jsx";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.jsx";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.jsx";
import { Modal } from "../modal/modal.jsx";
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";
import { OrderDetails } from "../order-details/order-details.jsx";
import { useSelector, useDispatch } from 'react-redux';
import { HIDE_INGREDIENT_MODAL, getBurgerIngredients } from '../../services/actions/burger-ingredients';
import { HIDE_OREDER_MODAL } from "../../services/actions/burger-constructor.js";
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

function App() {
  const {ingredients, ingredientsFailed, ingredientModalIsOpened} = useSelector(store => store.burgerIngredients);
  const {orderFailed, orderModalIsOpened} = useSelector(store => store.burgerConstructor);

  const dispatch = useDispatch();

  const closeAllModals = () => {
    dispatch({type: HIDE_INGREDIENT_MODAL});
    dispatch({type: HIDE_OREDER_MODAL});
  };

  useEffect(() => {
    dispatch(getBurgerIngredients());
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className={appStyles["burger-container"]}>
        {ingredientsFailed
        ? <p className={`${appStyles["burger-container__error"]} text_type_main-medium`}>Произшла ошибка загрузки ингредиентов</p>
        : <DndProvider backend={HTML5Backend}>
            <BurgerIngredients data={ingredients}/>
            <BurgerConstructor/>
          </DndProvider>}
      </div>
      {ingredientModalIsOpened && (
        <Modal onClose={closeAllModals}>
          <IngredientDetails/>
        </Modal>
      )}
      {orderModalIsOpened && (
        <Modal onClose={closeAllModals}>
          {orderFailed
          ? <p className='text_type_main-medium mt-25 mr-20 ml-20 mb-25'>Произшла ошибка отправки данных заказа</p>
          : <OrderDetails/>}
        </Modal>
      )}
    </div>
  );
}

export default App;
