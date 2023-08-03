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
          className={classes.distance}
        >
          <button onClick={() => setIsDistance(false)}>X</button>
          ㅁㄴㅇㅁㄴㅇㅁㄴㅇㅁㄴㅇ
        </Modal>
      )}
    </>
  );
};

export default Header;
