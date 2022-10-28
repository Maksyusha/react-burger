import PropTypes from 'prop-types';
import overlayStyles from './modal-overlay.module.css';



const ModalOverlay = (props) => {

  return (
    <div className={overlayStyles['modal__overlay']} onClick={props.onClick}></div>
  );
};



ModalOverlay.propTypes = {
  onClick: PropTypes.func.isRequired
}



export {ModalOverlay};
