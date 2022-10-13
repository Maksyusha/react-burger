import { useEffect, useState } from "react";
import { getIngredientsData } from "../../utils/utils.js";
import appStyles from "./app.module.css";
import { AppHeader } from "../app-header/app-header.jsx";
import { BurgerIngredients } from "../burger-ingredients/burger-ingredients.jsx";
import { BurgerConstructor } from "../burger-constructor/burger-constructor.jsx";
import { Modal } from "../modal/modal.jsx";
import { IngredientDetails } from "../ingredient-details/ingredient-details.jsx";
import { OrderDetails } from "../order-details/order-details.jsx";
import { data } from "../../utils/data.js";

function App() {
  const [ingredients, setIngredients] = useState(data);
  const [isOrderDetailsOpened, setIsOrderDetailsOpened] = useState(false);
  const [isIngredientDetailsOpened, setIngredientsDetailsOpened] = useState(false);
  const [ingredientDetails, setIngredientDetails] = useState({});

  const handleEscKeydown = (evt) => {
    evt.key === "Escape" && closeAllModals();
  };

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
    getIngredientsData().then((ingredients) =>
      setIngredients(ingredients.data)
    );
  }, []);

  return (
    <div className="App">
      <AppHeader />
      <div className={appStyles["burger-container"]}>
        <BurgerIngredients data={ingredients} onClick={openIngredientDetails} />
        <BurgerConstructor data={data} onClick={openOrderDetails}/> {/* Массив для обображения данных конструктора */}
      </div>
      {isIngredientDetailsOpened && (
        <Modal onOverlayClick={closeAllModals} onEscKeydown={handleEscKeydown}>
          <IngredientDetails
            data={ingredientDetails}
            onButtonClick={closeAllModals}
          />
        </Modal>
      )}
      {isOrderDetailsOpened && (
        <Modal onOverlayClick={closeAllModals} onEscKeydown={handleEscKeydown}>
          <OrderDetails
            onButtonClick={closeAllModals}
          />
        </Modal>
      )}
    </div>
  );
}

export default App;
