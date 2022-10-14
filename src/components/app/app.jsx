import { useEffect, useState } from "react";
import { request, apiUrl, apiGetOptions } from "../../utils/utils.js";
import { data } from "../../utils/data.js";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header.jsx";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.jsx";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.jsx";
import { Modal } from "../modal/modal.jsx";
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";
import { OrderDetails } from "../order-details/order-details.jsx";

function App() {
  const [ingredients, setIngredients] = useState(data);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIngredientsDetailsOpened] = useState(false);
  const [ingredientDetails, setIngredientDetails] = useState({});

  const closeAllModals = () => {
    setIsOrderDetailsOpened(false);
    setIngredientsDetailsOpened(false);
  };

  function openIngredientDetails(evt, details) {
    evt.stopPropagation();
    setIngredientDetails(details);
    setIngredientsDetailsOpened(true);
  }

  function openOrderDetails() {
    setIsOrderDetailsOpened(true);
  }

  useEffect(() => {
    request(apiUrl, apiGetOptions)
    .then((ingredients) => setIngredients(ingredients.data))
    .catch((err) => console.log(err));
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className={appStyles["burger-container"]}>
        <BurgerIngredients data={ingredients} onClick={openIngredientDetails} />
        <BurgerConstructor data={data} onClick={openOrderDetails}/> {/* Массив для отображения данных конструктора */}
      </div>
      {isIngredientDetailsOpened && (
        <Modal onClose={closeAllModals}>
          <IngredientDetails data={ingredientDetails}/>
        </Modal>
      )}
      {isOrderDetailsOpened && (
        <Modal onClose={closeAllModals}>
          <OrderDetails/>
        </Modal>
      )}
    </div>
  );
}

export default App;
