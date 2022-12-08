import styles from './preloader.module.css'

function Preloader() {
  return (
    <svg className={styles['spinner']} viewBox="0 0 50 50">
      <circle
        className={styles['spinner__circle']}
        cx="25"
        cy="25"
        r="20"
        fill="none"
        strokeWidth="5"
      ></circle>
    </svg>
  )
}

export { Preloader }
