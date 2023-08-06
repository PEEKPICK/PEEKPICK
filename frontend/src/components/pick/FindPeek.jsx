import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customAxios } from "../../api/customAxios";
import classes from "./FindPicker.module.css";
import { findPeekActions } from "../../store/findPeekSlice";
import PeekLocation from "./PeekLocation";

const FindPeek = () => {
  const dispatch = useDispatch();
  //주변 유져 정보
  const myPos = useSelector((state) => state.location.userPos);
  const findInfo = useSelector((state) => state.findPeek.peekInfomation);

  console.log("Peek 니 위치야", myPos);
  const emojiCall = useCallback(({ myPos }) => {
    customAxios.post("/peek", myPos).then((response) => {
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
