import React, { useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customAxios } from "../../api/customAxios";
import classes from "./Finder.module.css";
import GeoLocation from "./GeoLocation";
import { findUserActions } from "../../store/findUserSlice";
import EmojiLocation from "./EmojiLocation";
const Finder = () => {
  const dispatch = useDispatch();

  // Redux store에서 위치값 가져오기
  const getMemberId = useSelector((state) => state.geo.memberId);
  const getPoint = useSelector((state) => state.geo.point);
  const getDistance = useSelector((state) => state.geo.distance);

  //주변 유져 정보
  const nearByUser = useSelector((state) => state.findUser.userInfomation);

  GeoLocation();

  const handleEmojiCall = useCallback(() => {
    const requestBody = {
      memberId: getMemberId,
      point: getPoint,
      distance: getDistance,
    };
    emojiCall(requestBody);
  }, [getMemberId, getDistance, getPoint]);

  useEffect(() => {
    handleEmojiCall();
  }, []);

  const emojiCall = (requestBody) => {
    customAxios.post("/picker", requestBody).then((response) => {
      console.log("넘어온 데이터: ", response.data);
      const userArrayOrigin = response.data.data.data;
      // 최대 n개의 이모지만 보여주기
      const maxEmojisToShow = 8;
      //정보 저장
      const limitedUserArray = userArrayOrigin.slice(0, maxEmojisToShow);
      dispatch(findUserActions.updateUserInfo(limitedUserArray));
    });
  };

  return (
    <>
      <div className={classes.ParentreloadBtn}>
        {/* 버튼 클릭 시 handleEmojiCall 함수를 호출 */}
        <button className={classes.reloadBtn} onClick={handleEmojiCall}>
          <img src="./img/reloadBlue.png" alt="새로고침" />
          새로고침
        </button>
      </div>
      <EmojiLocation nearByUser={nearByUser} />
    </>
  );
};

export default Finder;
