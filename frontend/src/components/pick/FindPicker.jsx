import React, { useCallback, useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customAxios } from "../../api/customAxios";
import classes from "./FindPicker.module.css";
import { findUserActions } from "../../store/findUserSlice";
import PickLocation from "./PickLocation";
import { toast } from "react-hot-toast";
import { locationActions } from "../../store/locationSlice"; 

const FindPicker = () => {
  
  const isPickerToastActive = useRef(false);
  const dispatch = useDispatch();
  //주변 유져 정보
  const myPos = useSelector((state) => state.location.userPos);
  const findInfo = useSelector((state) => state.findUser.userInfomation);
  const distanceValue = useSelector((state) => state.location.userPos.distance);

  const handlePosChange = async () => {
    if (navigator.geolocation) {
      // console.log("isAuthenticated 인증되었습니다. 위치를 찍습니다.");
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const updatedPos = {
          point: {
            x: position.coords.longitude,
            y: position.coords.latitude,
          },
          distance: distanceValue,
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
      } catch (error) {
        console.error("위치 못가져왔는디:", error);
      }
    }
  };
 
  const emojiCall = useCallback(() => {
    handlePosChange();
    customAxios.post("/picker", myPos).then((response) => {
      // console.log("picker", myPos);
      const userArrayOrigin = response.data.data;
      if (Array.isArray(userArrayOrigin)) {
        // 최대 n개의 이모지만 보여주기
        const maxEmojisToShow = 8;
        //정보 저장
        const limitedUserArray = userArrayOrigin.slice(0, maxEmojisToShow);
        // console.log("넘어온 limitedUserArray: ", limitedUserArray);
        // 길이 0이면 Toast 알림
        // eslint-disable-next-line
        if (limitedUserArray.length == 0 && !isPickerToastActive.current) {
          isPickerToastActive.current = true; // 토스트가 떠있다고 표시
          toast("주변에 아무도 없어요 😭", {
            icon: "😭",
            onClose: () => {
              isPickerToastActive.current = false;  // 토스트가 닫혔다고 표시
            }
          });
        }
        dispatch(findUserActions.updateUserInfo(limitedUserArray));
      }
    });
    // eslint-disable-next-line
  }, [distanceValue]);

  const [emojiFlag, setEmojiFlag] = useState(false);

  const emojiCallWithDelay = useCallback(() => {
    if (emojiFlag) return;
    setEmojiFlag(true);

    emojiCall();

    setTimeout(() => {
      setEmojiFlag(false);
    }, 2000);
  }, [emojiFlag, emojiCall]);

  useEffect(() => {
    // 2초 딜레이 후에 emojiCall 함수 호출
    // const timeout = setTimeout(() => {
    emojiCall();
    // }, 1000);

    // cleanup 함수에서 timeout 해제
    //   return () => {
    //   clearTimeout(timeout);
    // };
    // eslint-disable-next-line
  }, [emojiCall]);

  return (
    <>
      <div className={classes.ParentreloadBtn}>
        {/* 버튼 클릭 시 handleEmojiCall 함수를 호출 */}
        <button className={classes.reloadBtn} onClick={() => emojiCallWithDelay()}>
          <img src="./img/human.png" alt="새로고침" />
          피커 찾기
        </button>
      </div>
      <PickLocation findInfo={findInfo} />
    </>
  );
};

export default FindPicker;
