import { customAxios, authAxios } from "../../api/customAxios";

import Modal from "react-modal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import classes from "./Header.module.css";

import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLocation } from "react-router-dom";

import { authActions } from "../../store/authSlice";
import { locationActions } from "../../store/locationSlice";
import { changeMapSliceActions } from "../../store/changeMapSlice";
// import { Toast } from "react-hot-toast";

const Header = () => {
  // 상태관리
  const [isDistance, setIsDistance] = useState(false);
  const [isWorldMap, setIsWorldMap] = useState(false);
  const [worldMapList, setWorldMapList] = useState([]);
  const [checkMap, setCheckMap] = useState(null);
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
    customAxios
      .get("/member/info")
      .then((response) => {
        // 리덕스 변경
        dispatch(
          authActions.updateUserMap({
            worldId: response.data.data.world.worldId,
            openUrl: response.data.data.world.openUrl,
            closeUrl: response.data.data.world.closeUrl,
          })
        );

        // 상태갱신
        setCheckMap(response.data.data.world.worldId);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [dispatch]);

  // 페이지 렌딩 시 월드맵 선택 정보 받아옴
  useEffect(() => {
    authAxios
      .get("/member/world")
      .then((response) => {
        setWorldMapList(response.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // 캐러셀 세팅
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: checkMap - 1,

    beforeChange: (slide, newSlide) => setCheckMap(newSlide + 1),
  };

  // 로컬스토리지에서 사용자가 설정한 거리 가져오기
  useEffect(() => {
    const localDist = localStorage.getItem("distance");
    if (localDist === null) {
      localStorage.setItem("distance", 500);
    } else {
      setSelectedDistance(parseInt(localDist));
    }
  }, [selectedDistance]);

  // 거리조절 리덕스 변경
  const changeDistance = (dist) => {
    // toast.success("테스트 기간에는 거리제한이 없습니다 *^^*", {
    //   id: "changeDistance",
    // });
    localStorage.setItem("distance", dist);

    setSelectedDistance(dist);

    const sendToData = {
      distance: dist,
    };

    dispatch(locationActions.updateDist(sendToData));
  };
  // 뒤로가기 버튼
  const moveBackHandler = () => {
    setIsWorldMap(false);
  };

  // 선택완료 버튼
  const checkOutHandler = () => {
    const dataToSend = {
      worldId: checkMap,
    };
    // 보낼 데이터 선택
    const selectedItem = worldMapList.find((item) => item.worldId === checkMap);
    // console.log(selectedItem);
    if (selectedItem) {
      localStorage.setItem("worldMap", selectedItem.openUrl);
      localStorage.setItem("worldMapId", selectedItem.worldId);
      dispatch(changeMapSliceActions.updateIdOpenUrl(selectedItem.openUrl));
      dispatch(changeMapSliceActions.updateIdCloseUrl(selectedItem.closeUrl));
      dispatch(changeMapSliceActions.updateId(selectedItem.worldId));
    }
    // axios
    customAxios
      .post("/member/world", dataToSend)
      .then((response) => {
        if (response.data.code === "200") {
          if (location.pathname === "/peek") {
            // window.location.replace("/peek");
            // console.log(dataToSend);
          } else {
            // window.location.replace("/");
            // console.log(dataToSend);
          }
        } else {
          console.log("문제가 발생했습니다.");
        }
      })
      .catch((error) => {
        console.log(error);
      });

    setIsWorldMap(false);
  };

  return (
    <>
      <div className={classes.headerMain}>
        <button className={classes.button}>
          <img
            src="/img/distance.svg"
            alt="거리조절버튼"
            onClick={() => {
              setIsDistance(true);
              // setIsWorldMap(false);
            }}
          />
        </button>
        <button
          className={classes.button}
          onClick={() => {
            setIsWorldMap(true);
            // setIsDistance(false);
          }}
        >
          <img src="/img/worldmap.svg" alt="알림버튼" />
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
            <img
              src="img/cancel.png"
              alt="cancel"
              onClick={() => setIsDistance(false)}
              className={classes.distanceClose}
            />
          </div>
          <span className={classes.headerText}>{textToShow}</span>
          <div className={classes.divider}></div>
          <div className={classes.formWrapper}>
            <form className={classes.form}>
              <div className={classes.debtAmountSlider}>
                <input
                  type="radio"
                  id="peek_distance_1"
                  value="50"
                  name="debt-amount"
                  checked={selectedDistance === 500}
                  onChange={() => changeDistance(500)}
                />
                <label htmlFor="peek_distance_1" data-debt-amount="500m"></label>
                <input
                  type="radio"
                  id="peek_distance_2"
                  value="100"
                  name="debt-amount"
                  checked={selectedDistance === 1000}
                  onChange={() => changeDistance(1000)}
                />
                <label htmlFor="peek_distance_2" data-debt-amount="1000m"></label>
                <input
                  type="radio"
                  id="peek_distance_3"
                  value="150"
                  name="debt-amount"
                  checked={selectedDistance === 1500}
                  onChange={() => changeDistance(1500)}
                />
                <label htmlFor="peek_distance_3" data-debt-amount="1500m"></label>
                <input
                  type="radio"
                  id="peek_distance_4"
                  value="200"
                  name="debt-amount"
                  checked={selectedDistance === 2000}
                  onChange={() => changeDistance(2000)}
                />
                <label htmlFor="peek_distance_4" data-debt-amount="2000m"></label>
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
          className={classes.worldMapModal}
        >
          <div className={classes.worldMapContainer}>
            <h1>월드 선택</h1>
            <div className={classes.spanWrap}>
              <span>개성넘치는 자신만의 월드를 골라보세요.</span>
              {/* <span>숨겨진 업적을 달성하면 잠금이 풀립니다!</span> */}
            </div>
            {/* 월드맵 캐러샐 */}
            <>
              <div className={classes.sliderWrapper}>
                <Slider {...settings}>
                  {worldMapList.map((item) => (
                    <div className={classes.contentBox} key={item.worldId}>
                      {/* 버그 리포트 : 캐러셀을 안움직이면 기존의 값이 들어감.. 해결 방법 좀 */}
                      <img src={item.closeUrl} alt="" className={classes.carousel} />
                    </div>
                  ))}
                </Slider>
              </div>
              <div className={classes.buttonWrap}>
                <button className={classes.selected} onClick={checkOutHandler}>
                  선택 완료
                </button>
                <button className={classes.back} onClick={moveBackHandler}>
                  뒤로 가기
                </button>
              </div>
            </>
          </div>
        </Modal>
      )}
    </>
  );
};

export default Header;
