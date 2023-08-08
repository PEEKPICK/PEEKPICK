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
      : "보고 싶은 PICK의 거리를 설정할 수 있어요.";

  const [selectedDistance, setSelectedDistance] = useState(0);

  const handleDistanceChange = (distance) => {
    setSelectedDistance(distance);
  };
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
            <button onClick={() => setIsDistance(false)} className={classes.distanceClose}>
              X
            </button>
          </div>
          <span className={classes.headerText}>{textToShow}</span>
          <div className={classes.divider}></div>
          <div className={classes.distanceSlider}>
            <div className={classes.gauge} style={{ width: `${selectedDistance}%` }}></div>
            <div className={classes.selectBox}>
              <div className={classes.meterSelector1} onClick={() => handleDistanceChange(0)}>
                0m
              </div>
              <div className={classes.meterSelector} onClick={() => handleDistanceChange(33)}>
                50m
              </div>
              <div className={classes.meterSelector3} onClick={() => handleDistanceChange(66)}>
                150m
              </div>
              <div className={classes.meterSelector4} onClick={() => handleDistanceChange(100)}>
                250m
              </div>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
