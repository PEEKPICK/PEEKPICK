import classes from './style/Modal.module.css'

const InfoModal = ({ onClose }) => {
  return (
    <div className={classes.container}>
      <img src="img/cancel.png" alt="cancel" onClick={onClose} className={classes.cancelImg} />
      <div className={classes.infoBox}>
        <img src="img/infoRed.png" alt="info" className={classes.infoImg} />
        <span className={classes.message}>정보를 입력해주세요!</span>
      </div>
    </div>
  );
};

export default InfoModal;