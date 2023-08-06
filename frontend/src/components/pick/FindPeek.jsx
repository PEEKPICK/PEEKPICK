import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customAxios } from "../../api/customAxios";
import classes from "./FindPicker.module.css";
import { findPeekActions } from "../../store/findPeekSlice";
import PeekLocation from "./PeekLocation";
import { locationActions } from "../../store/locationSlice";
// import { GeoLocation } from "./GeoLocation";

const FindPeek = () => {
  const dispatch = useDispatch();
  //주변 유져 정보
  const myPos = useSelector((state) => state.location.userPos);
  const findInfo = useSelector((state) => state.findPeek.peekInfomation);

  const emojiCall = useCallback((requestBody) => {
    console.log("진짜", myPos);
    customAxios.post("/peek", requestBody).then((response) => {
      console.log("넘어온 피크 : ", response);
      const peekArrayOrigin = response.data.data;
      if (Array.isArray(peekArrayOrigin)) {
        // 최대 n개의 이모지만 보여주기
        const maxEmojisToShow = 8;
        //정보 저장
        const limitedUserArray = peekArrayOrigin.slice(0, maxEmojisToShow);
        // console.log("넘어온 limitedUserArray: ", limitedUserArray);
        dispatch(findPeekActions.updatePeekInfo(limitedUserArray));
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const GeoLocation = useCallback(() => {
    console.log("위치찍기");
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const updatedPos = {
            point: {
              x: position.coords.longitude,
              y: position.coords.latitude,
            },
            distance: 1000000000,
          };
          // 위치 정보를 스토어에 저장
          dispatch(
            locationActions.updateLoc({
              point: {
                x: updatedPos.point.x,
                y: updatedPos.point.y,
              },
              distance: updatedPos.distance,
            })
          );
          console.log(updatedPos.point.x);
          // emojiCall에 위치 정보 전달
          emojiCall(myPos);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("위치 못가져왔는디");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    GeoLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={classes.ParentreloadBtn}>
        {/* 버튼 클릭 시 handleEmojiCall 함수를 호출 */}
        <button className={classes.reloadBtn} onClick={() => emojiCall(myPos)}>
          <img src="./img/reloadBlue.png" alt="새로고침" />
          새로고침
        </button>
      </div>
      <PeekLocation findInfo={findInfo} />
    </>
  );
};

export default FindPeek;
