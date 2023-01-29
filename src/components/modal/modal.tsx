import { FC, useEffect } from 'react'
import ReactDOM from 'react-dom'
import modalStyles from './modal.module.css'
import { ModalOverlay } from './components/modal-overlay/modal-overlay'
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import { useHistory, useLocation } from 'react-router-dom'
import { Location } from 'history'
import { NotFound } from '../not-found/not-found'

const modalsContainer = document.querySelector('#modals')

type TModalProps = {
  onClose?: undefined | (() => void)
  children: JSX.Element
}

const Modal: FC<TModalProps> = ({ children, onClose }) => {
  const history = useHistory()
  const location = useLocation<{ background: Location }>()

  useEffect(() => {
    document.addEventListener('keydown', onEscKeyClose)

    return () => {
      document.removeEventListener('keydown', onEscKeyClose)
    } // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []) //TODO линтер ругался на отсутствие зависимостей

  function handleClose() {
    const pathname = location.state?.background.pathname

    if (pathname) {
      history.replace(pathname)
    } else {
      history.replace('/')
    }
  }

  function onEscKeyClose(evt: KeyboardEvent) {
    evt.key === 'Escape' && handleClose()
  }

  if (modalsContainer === null) {
    return <NotFound />
  }

  return ReactDOM.createPortal(
    <div className={modalStyles['modal']}>
      <div className={modalStyles['modal__container']}>
        <button
          className={modalStyles['modal__button-close']}
          onClick={onClose ? onClose : handleClose}
        >
          <CloseIcon type="primary" />
        </button>
        {children}
      </div>
      <ModalOverlay onClick={onClose ? onClose : handleClose} />
    </div>,
    modalsContainer
  )
}

export { Modal }
