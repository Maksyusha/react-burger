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
  const {ingredients, modalIngredientIsOpened} = useSelector(store => store.burgerIngredients);
  const {modalOrderIsOpened} = useSelector(store => store.burgerConstructor);

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
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients data={ingredients}/>
          <BurgerConstructor/>
        </DndProvider>
      </div>
      {modalIngredientIsOpened && (
        <Modal onClose={closeAllModals}>
          <IngredientDetails/>
        </Modal>
      )}
      {modalOrderIsOpened && (
        <Modal onClose={closeAllModals}>
          <OrderDetails/>
        </Modal>
      )}
    </div>
  );
}

export default App;
