import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customAxios } from "../../api/customAxios";
import classes from "./FindPicker.module.css";
import { findUserActions } from "../../store/findUserSlice";
import PickLocation from "./PickLocation";

const FindPicker = () => {
  const dispatch = useDispatch();
  //주변 유져 정보
  const myPos = useSelector((state) => state.location.userPos);
  const findInfo = useSelector((state) => state.findUser.userInfomation);
  const emojiCall = useCallback(
    ({ myPos }) => {
      customAxios.post("/picker", myPos).then((response) => {
        console.log("Pick 니 위치야", myPos);
        console.log("넘어온 피커 : ", response);
        const userArrayOrigin = response.data.data;
        if (Array.isArray(userArrayOrigin)) {
          // 최대 n개의 이모지만 보여주기
          const maxEmojisToShow = 8;
          //정보 저장
          const limitedUserArray = userArrayOrigin.slice(0, maxEmojisToShow);
          // console.log("넘어온 limitedUserArray: ", limitedUserArray);
          dispatch(findUserActions.updateUserInfo(limitedUserArray));
        }
      });
    },
    [dispatch]
  );

  return (
    <>
      <div className={classes.ParentreloadBtn}>
        {/* 버튼 클릭 시 handleEmojiCall 함수를 호출 */}
        <button className={classes.reloadBtn} onClick={() => emojiCall(myPos)}>
          <img src="./img/reloadBlue.png" alt="새로고침" />
          새로고침
        </button>
      </div>
      <PickLocation findInfo={findInfo} />
    </>
  );
};

export default FindPicker;
