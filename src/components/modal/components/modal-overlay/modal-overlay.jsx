import overlayStyles from './modal-overlay.module.css';



const ModalOverlay = (props) => {

  return (
    <div className={overlayStyles['modal__overlay']} onClick={props.onClick}></div>
  );
};



export {ModalOverlay};
