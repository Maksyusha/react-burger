import { FC } from 'react'
import styles from './preloader.module.css'

export const Preloader: FC = () => {
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
