import classes from './style/Modal.module.css';

// 5개 초과 모달
const Modal = ({ onClose }) => {
  return (
    <div className={classes.container}>
      <img src="img/cancel.png" alt="cancel" onClick={onClose} />
      <div>
        <span>최대 5개 선택이 가능합니다.</span>
      </div>
    </div>
  );
};

export default Modal;