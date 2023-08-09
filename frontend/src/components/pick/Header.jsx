import Modal from "react-modal";
import classes from "./Header.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [isDistance, setIsDistance] = useState(false);
  const location = useLocation();
  const textToShow =
    location.pathname === "/peek"
      ? "보고 싶은 PEEK의 거리를 설정할 수 있어요."
      : "보고 싶은 PICKER의 거리를 설정할 수 있어요.";

  const [selectedDistance, setSelectedDistance] = useState(50);

  const toggle = () => {
    toast.isActive(false);
  };
  return (
    <>
      <div className={classes.headerMain}>
        <button className={classes.button}>
          <img src="/img/distance.png" alt="거리조절버튼" onClick={() => setIsDistance(true)} />
        </button>
        <button className={classes.button} onClick={() => toggle()}>
          <img src="/img/aram.png" alt="알림버튼" />
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
            <img src="img/cancel.png" alt="cancel" onClick={() => setIsDistance(false)} className={classes.distanceClose} />
          </div>
          <span className={classes.headerText}>{textToShow}</span>
          <div className={classes.divider}></div>
          <div className={classes.formWrapper}>
            <form className={classes.form}>
              <div className={classes.debtAmountSlider}>
                <input
                  type="radio"
                  id="1"
                  value="50"
                  name="debt-amount"
                  checked={selectedDistance === 50}
                  onChange={() => setSelectedDistance(50)}
                  required
                />
                <label htmlFor="1" data-debt-amount="50m"></label>
                <input
                  type="radio"
                  id="2"
                  value="100"
                  name="debt-amount"
                  checked={selectedDistance === 100}
                  onChange={() => setSelectedDistance(100)}
                  required
                />
                <label htmlFor="2" data-debt-amount="100m"></label>
                <input
                  type="radio"
                  id="3"
                  value="150"
                  name="debt-amount"
                  checked={selectedDistance === 150}
                  onChange={() => setSelectedDistance(150)}
                  required
                />
                <label htmlFor="3" data-debt-amount="150m"></label>
                <input
                  type="radio"
                  id="4"
                  value="200"
                  name="debt-amount"
                  checked={selectedDistance === 200}
                  onChange={() => setSelectedDistance(200)}
                  required
                />
                <label htmlFor="4" data-debt-amount="200m"></label>
                <div className={classes.debtAmountPos}></div>
              </div>
            </form>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
