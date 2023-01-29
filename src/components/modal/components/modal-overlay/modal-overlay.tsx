import PropTypes from 'prop-types'
import { FC } from 'react'
import overlayStyles from './modal-overlay.module.css'

type TModalProps = {
  onClick: () => void
}

const ModalOverlay: FC<TModalProps> = ({ onClick }) => {
  return (
    <div className={overlayStyles['modal__overlay']} onClick={onClick}></div>
  )
}

export { ModalOverlay }
