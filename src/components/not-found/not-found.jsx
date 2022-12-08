import styles from './not-found.module.css'

function NotFound() {
  return (
    <div className={styles['not-found']}>
      <h1 className={styles['not-found__title']}>Ошибка 404</h1>
      <p className={styles['not-found__subtitle']}>
        Страницы по данному адресу не существует
      </p>
    </div>
  )
}

export { NotFound }
