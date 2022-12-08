import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import modalStyles from './modal.module.css'
import { ModalOverlay } from './components/modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'

const modalsContainer = document.querySelector('#modals')

function Modal(props) {
  const { onClose, children } = props

  const onEscKeyClose = (evt) => {
    evt.key === 'Escape' && props.onClose()
  }

  useEffect(() => {
    document.addEventListener('keydown', onEscKeyClose)

    return () => {
      document.removeEventListener('keydown', onEscKeyClose)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) //TODO линтер ругался на отсутствие зависимостей

  return ReactDOM.createPortal(
    <div className={modalStyles['modal']}>
      <div className={modalStyles['modal__container']}>
        <button
          className={modalStyles['modal__button-close']}
          onClick={onClose}
        >
          <CloseIcon></CloseIcon>
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onClose} />
    </div>,
    modalsContainer
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
  onClose: PropTypes.func.isRequired,
}

export { Modal }
