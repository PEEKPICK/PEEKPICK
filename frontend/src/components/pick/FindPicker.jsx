import React, { useCallback, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customAxios } from "../../api/customAxios";
import classes from "./FindPicker.module.css";
import { findUserActions } from "../../store/findUserSlice";
import PickLocation from "./PickLocation";
import { toast } from "react-hot-toast";

const FindPicker = () => {
  const dispatch = useDispatch();
  //주변 유져 정보
  const myPos = useSelector((state) => state.location.userPos);
  const findInfo = useSelector((state) => state.findUser.userInfomation);
  const emojiCall = useCallback(() => {
    customAxios.post("/picker", myPos).then((response) => {
      console.log("myPos", myPos);
      const userArrayOrigin = response.data.data;
      if (Array.isArray(userArrayOrigin)) {
        // 최대 n개의 이모지만 보여주기
        const maxEmojisToShow = 8;
        //정보 저장
        const limitedUserArray = userArrayOrigin.slice(0, maxEmojisToShow);
        // console.log("넘어온 limitedUserArray: ", limitedUserArray);
        // 길이 0이면 Toast 알림
        // eslint-disable-next-line
        if (limitedUserArray.length == 0) {
          toast("주변에 아무도 없어요 😭", {
            icon: "😭",
          });
        }
        dispatch(findUserActions.updateUserInfo(limitedUserArray));
      }
    });
    // eslint-disable-next-line
  }, [myPos]);

  const [emojiFlag, setEmojiFlag] = useState(false);

  const emojiCallWithDelay = useCallback(() => {
    if (emojiFlag) return;
    setEmojiFlag(true);

    emojiCall(myPos);

    setTimeout(() => {
      setEmojiFlag(false);
    }, 2000);
    // eslint-disable-next-line
  }, [emojiFlag, emojiCall]);

  useEffect(() => {
    // 2초 딜레이 후에 emojiCall 함수 호출
    const timeout = setTimeout(() => {
      emojiCall(myPos);
    }, 1000);

    // cleanup 함수에서 timeout 해제
    return () => {
      clearTimeout(timeout);
    };
  }, [myPos, emojiCall]);

  return (
    <>
      <div className={classes.ParentreloadBtn}>
        {/* 버튼 클릭 시 handleEmojiCall 함수를 호출 */}
        <button className={classes.reloadBtn} onClick={() => emojiCallWithDelay(myPos)}>
          <img src="./img/human.png" alt="새로고침" />
          피커 찾기
        </button>
      </div>
      <PickLocation findInfo={findInfo} />
    </>
  );
};

export default FindPicker;
