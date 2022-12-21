import styles from './order-images.module.css'

function OrderImages({ ingredients }) {
  return (
    <div className={styles['order-images']}>
      {ingredients.slice(0, 5).map((ingredient, index) => (
        <div
          key={index}
          className={styles['order-images__image-container']}
          style={{ zIndex: ingredients.length - index }}
        >
          <img
            className={styles['order-images__image']}
            src={ingredient.image}
            alt="Изображение ингредиента"
          />
        </div>
      ))}
      {ingredients[5] && ingredients[6] ? (
        <div key="5" className={styles['order-images__image-container']}>
          <img
            className={styles['order-images__image']}
            src={ingredients[5].image}
            alt="Изображение ингредиента"
          />
          <div className={styles['order-images__image-overflow']}>
            <p className="text text_type_main-medium">{`+${
              ingredients.length - 6
            }`}</p>
          </div>
        </div>
      ) : ingredients[5] ? (
        <div key="5" className={styles['order-images__image-container']}>
          <img
            className={styles['order-images__image']}
            src={ingredients[5].image}
            alt="Изображение ингредиента"
          />
        </div>
      ) : null}
    </div>
  )
}

export { OrderImages }
