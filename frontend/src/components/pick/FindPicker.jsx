import React, { useEffect, useCallback, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customAxios } from "../../api/customAxios";
import classes from "./FindPicker.module.css";
import { findUserActions } from "../../store/findUserSlice";
import PickLocation from "./PickLocation";
import { locationActions } from "../../store/locationSlice";
// import { GeoLocation } from "./GeoLocation";
import { useLocation } from "react-router-dom";

const FindPicker = () => {
  const dispatch = useDispatch();
  // Redux store에서 위치값 가져오기
  const getMemberId = useSelector((state) => state.geo.memberId);
  const getPointX = useSelector((state) => state.geo.point.x);
  const getPointY = useSelector((state) => state.geo.point.y);
  const getDistance = useSelector((state) => state.geo.distance);
  //주변 유져 정보
  const findInfo = useSelector((state) => state.findUser.userInfomation);
  //위치 가져왔니?
  const [isLocationFetched, setIsLocationFetched] = useState(false);
  //현재 링크 가져와
  const location = useLocation();
  const currentPathname = location.pathname;

  const emojiCall = useCallback(
    (requestBody) => {
      customAxios.post("/picker", requestBody).then((response) => {
        console.log("넘어온 피커 : ", response);
        const userArrayOrigin = response.data.data;
        // 최대 n개의 이모지만 보여주기
        const maxEmojisToShow = 10;
        //정보 저장
        const limitedUserArray = userArrayOrigin.slice(0, maxEmojisToShow);
        // console.log("넘어온 limitedUserArray: ", limitedUserArray);
        dispatch(findUserActions.updateUserInfo(limitedUserArray));
      });
    },
    [dispatch]
  );

  const GeoLocation = useCallback(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // 위치값을 Redux store에 저장합니다.
          dispatch(
            locationActions.updateLoc({
              point: {
                x: position.coords.longitude,
                y: position.coords.latitude,
              },
              distance: 10000,
            })
          );
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("위치 못가져왔는디");
    }
  }, [dispatch]);

  useEffect(() => {
    const fetchLocation = async () => {
      await GeoLocation();
      setIsLocationFetched(true);
    };
    fetchLocation();
  }, [GeoLocation]);

  const handleEmojiCall = useCallback(() => {
    if (!isLocationFetched) {
      return; // 위치 정보가 아직 준비되지 않았으면 작업 중지
    }
    const requestBody = {
      memberId: getMemberId,
      point: {
        x: getPointX,
        y: getPointY,
      },
      distance: getDistance,
    };
    emojiCall(requestBody);
  }, [emojiCall, getMemberId, getPointX, getPointY, getDistance, isLocationFetched]);

  useEffect(() => {
    if (currentPathname === "/") {
      console.log("pick");

      handleEmojiCall();
    }
  }, [currentPathname, handleEmojiCall]);

  return (
    <>
      <div className={classes.ParentreloadBtn}>
        {/* 버튼 클릭 시 handleEmojiCall 함수를 호출 */}
        <button className={classes.reloadBtn} onClick={handleEmojiCall}>
          <img src="./img/reloadBlue.png" alt="새로고침" />
          새로고침
        </button>
      </div>
      <PickLocation findInfo={findInfo} />
    </>
  );
};

export default FindPicker;
