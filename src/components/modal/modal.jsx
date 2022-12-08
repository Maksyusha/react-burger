import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import modalStyles from './modal.module.css'
import { ModalOverlay } from './components/modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useHistory } from 'react-router-dom'

const modalsContainer = document.querySelector('#modals')

function Modal({ children, onClose }) {
  const history = useHistory()

  useEffect(() => {
    document.addEventListener('keydown', onEscKeyClose)

    return () => {
      document.removeEventListener('keydown', onEscKeyClose)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) //TODO линтер ругался на отсутствие зависимостей

  function handleClose() {
    history.replace('/')
  }

  function onEscKeyClose(evt) {
    evt.key === 'Escape' && handleClose()
  }

  return ReactDOM.createPortal(
    <div className={modalStyles['modal']}>
      <div className={modalStyles['modal__container']}>
        <button
          className={modalStyles['modal__button-close']}
          onClick={onClose ? onClose : handleClose}
        >
          <CloseIcon></CloseIcon>
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onClose ? onClose : handleClose} />
    </div>,
    modalsContainer
  )
}

Modal.propTypes = {
  children: PropTypes.element.isRequired,
}

export { Modal }
