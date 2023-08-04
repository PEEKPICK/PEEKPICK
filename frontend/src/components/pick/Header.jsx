import Modal from "react-modal";
import classes from "./Header.module.css";
import { useState } from "react";
const Header = () => {
  const [isDistance, setIsDistance] = useState(false);

  return (
    <>
      <div className={classes.headerMain}>
        <button className={classes.button}>
          <img src="/img/distance.png" alt="거리조절버튼" onClick={() => setIsDistance(true)} />
        </button>
        <button className={classes.button}>
          <img src="/img/aram.png" alt="거리조절버튼" />
        </button>
      </div>
      {isDistance && (
        <Modal
          isOpen={isDistance}
          onRequestClose={() => setIsDistance(false)} // 모달 바깥을 클릭하거나 ESC 키를 누르면 모달을 닫음
          className={classes.distanceMain}
        >
          <div className={classes.closeHeader}>
            <p>거리 설정</p>
            <button onClick={() => setIsDistance(false)} className={classes.distanceClose}>
              X
            </button>
          </div>
          <span className={classes.headerText}>메세지를 보고 싶은 거리를 설정하세요</span>
          <div className={classes.divider}></div>
          <div className={classes.radioBtnBox}>
            <div className={classes.radioBtnLine}></div>
            <input type="radio" name="option" value="option1" className={classes.radioBtn1} />
            <input type="radio" name="option" value="option1" className={classes.radioBtn2} />
            <input type="radio" name="option" value="option1" className={classes.radioBtn3} />
            <input type="radio" name="option" value="option1" className={classes.radioBtn4} />
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
