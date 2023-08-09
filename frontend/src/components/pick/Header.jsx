import { customAxios, authAxios } from '../../api/customAxios';

import Modal from "react-modal";

import classes from "./Header.module.css";

import { useState, useEffect } from "react";
import { useDispatch } from 'react-redux';
import { useLocation } from "react-router-dom";

import { authActions } from '../../store/authSlice';

const Header = () => {
  // 상태관리
  const [isDistance, setIsDistance] = useState(false);
  const [isWorldMap, setIsWorldMap] = useState(false);
  const [worldMapList, setWorldMapList] = useState([]);
  const [checkMap, setCheckMap] = useState(1);
  const [selectedDistance, setSelectedDistance] = useState(50);

  // 함수 선언
  const location = useLocation();
  const dispatch = useDispatch();

  // PICKER / PEEK에 따라 보는 내용 변경
  const textToShow =
    location.pathname === "/peek"
      ? "보고 싶은 PEEK의 거리를 설정할 수 있어요."
      : "보고 싶은 PICKER의 거리를 설정할 수 있어요.";

  // 사용자가 선택한 월드맵 받아와서 리덕스 저장
  useEffect(() => {
    customAxios.get('/member/info')
      .then(response => {
        // 리덕스 변경
        dispatch(authActions.updateUserMap({
          worldId: response.data.data.world.worldId,
          openUrl: response.data.data.world.openUrl,
          closeUrl: response.data.data.world.closeUrl,
        }))

        // 상태갱신
        setCheckMap(response.data.data.world.worldId)
      })
      .catch(error => {
        console.log(error)
      })
  }, [dispatch])

  // 페이지 렌딩 시 월드맵 선택 정보 받아옴
  useEffect(() => {
    authAxios.get('/member/world')
      .then(response => {
        setWorldMapList(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  return (
    <>
      <div className={classes.headerMain}>
        <button className={classes.button}>
          <img src="/img/distance.png" alt="거리조절버튼" onClick={() => setIsDistance(true)} />
        </button>
        <button className={classes.button} onClick={() => setIsWorldMap(true)}>
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
                />
                <label htmlFor="1" data-debt-amount="50m"></label>
                <input
                  type="radio"
                  id="2"
                  value="100"
                  name="debt-amount"
                  checked={selectedDistance === 100}
                  onChange={() => setSelectedDistance(100)}
                />
                <label htmlFor="2" data-debt-amount="100m"></label>
                <input
                  type="radio"
                  id="3"
                  value="150"
                  name="debt-amount"
                  checked={selectedDistance === 150}
                  onChange={() => setSelectedDistance(150)}
                />
                <label htmlFor="3" data-debt-amount="150m"></label>
                <input
                  type="radio"
                  id="4"
                  value="200"
                  name="debt-amount"
                  checked={selectedDistance === 200}
                  onChange={() => setSelectedDistance(200)}
                />
                <label htmlFor="4" data-debt-amount="200m"></label>
                <div className={classes.debtAmountPos}></div>
              </div>
            </form>
          </div>
        </Modal>
      )}
      {isWorldMap && (
        <Modal
        isOpen={isWorldMap}
        onRequestClose={() => setIsWorldMap(false)} // 모달 바깥을 클릭하거나 ESC 키를 누르면 모달을 닫음
        >
          <div className={classes.worldMapContainer}>
            <h1>월드 선택</h1>
            <div className={classes.spanWrap}>
              <span>개성넘치는 자신만의 월드를 골라보세요.</span>
              <span>숨겨진 업적을 달성하면 잠금이 풀립니다!</span>
            </div>
            <div className={classes.worldMap}>
              {worldMapList.map(item => (
                <div key={item.worldId} className={classes.carousel}>
                  <input type="radio" id={item.worldId} name="carousel[]" checked={checkMap === item.worldId} />
                </div>
              ))}
            </div>
            <div className={classes.buttonWrap}>
              <button
                className={classes.selected}
              >선택 완료
              </button>
              <button
                className={classes.back}
              >뒤로 가기
              </button>
            </div>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
