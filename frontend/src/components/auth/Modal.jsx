import classes from './style/Modal.module.css';

// 5개 초과 모달
const Modal = ({ onClose, check }) => {
  if (check === 1) {
    return (
      <div className={classes.container}>
        <img src="img/cancel.png" alt="cancel" onClick={onClose} className={classes.cancelImg} />
        <div className={classes.infoBox}>
          <img src="img/infoRed.png" alt="info" className={classes.infoImg} />
          <span className={classes.message}>최대 5개 선택이 가능합니다.</span>
        </div>
      </div>
    );
  } else {
    return (
      <div className={classes.container}>
        <img src="img/cancel.png" alt="cancel" onClick={onClose} className={classes.cancelImg} />
        <div className={classes.infoBox}>
          <img src="img/infoRed.png" alt="info" className={classes.infoImg} />
          <span className={classes.message}>정보를 입력해주세요!</span>
        </div>
      </div>
    );
  }
};

export default Modal;