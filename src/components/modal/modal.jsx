import {useEffect} from 'react';
import ReactDOM from 'react-dom';
import modalStyles from './modal.module.css';
import { ModalOverlay } from './components/modal-overlay/modal-overlay';

const modalsContainer = document.querySelector('#modals');

  function Modal(props) {
    const {onOverlayClick, onEscKeydown, children} = props;

    useEffect(() => {
      document.addEventListener('keydown', onEscKeydown);

      return () => {
        document.removeEventListener('keydown', onEscKeydown);
      };
    }, []);

  return ReactDOM.createPortal(
    <>
      <div className={modalStyles['modal']}>
        {children}
      </div>
      <ModalOverlay onClick={onOverlayClick} />
    </>,
    modalsContainer
  );
};



export {Modal};
