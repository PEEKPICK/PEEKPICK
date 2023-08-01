import React, { useState, useEffect, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { customAxios } from "../../api/customAxios";
import classes from "./Finder.module.css";
import GeoLocation from "./GeoLocation";
import { modalActions } from "../../store/modalSlice";
import { findUserActions } from "../../store/findUserSlice";

const Finder = () => {
  const dispatch = useDispatch();

  // Redux store에서 위치값 가져오기
  const getMemberId = useSelector((state) => state.geo.memberId);
  const getPoint = useSelector((state) => state.geo.point);
  const getDistance = useSelector((state) => state.geo.distance);
  //모달 값 가져오기
  const isOpen = useSelector((state) => state.modal.isOpen);
  // const selectedEmoji = useSelector((state) => state.modal.selectedEmoji);
  // 이모지를 새롭게 랜더링
  const [imageUrls, setImageUrls] = useState([]);
  //주변 유져 정보
  const nearByUser = useSelector((state) => state.findUser.userInfomation);
  const [userArray, setUserArray] = useState([]);

  GeoLocation();

  const handleEmojiCall = useCallback(() => {
    if (getMemberId && getPoint && getDistance) {
      const requestBody = {
        memberId: getMemberId,
        point: getPoint,
        distance: getDistance,
      };
      emojiCall(requestBody); // emojiCall 함수에 requestBody 전달
    }
  }, [getMemberId, getPoint, getDistance]);

  useEffect(() => {
    // 최초 렌더링 시 handleEmojiCall 함수를 호출
    handleEmojiCall();
  }, [handleEmojiCall]);

  const emojiCall = (requestBody) => {
    customAxios.post("/picker", requestBody).then((response) => {
      console.log(response.data);
      const imageUrlArray = response.data.data.data.map((item) => item.emoji);
      const userArrayOrigin = response.data.data.data;
      // 최대 n개의 이모지만 보여주기
      const maxEmojisToShow = 8;
      //정보 저장
      const limitedImageUrls = imageUrlArray.slice(0, maxEmojisToShow);
      const limitedUserArray = userArrayOrigin.slice(0, maxEmojisToShow);
      setImageUrls(limitedImageUrls);
      setUserArray(limitedUserArray);
      console.log("이모지 배열", limitedImageUrls);
      console.log("유져배열", limitedUserArray);

      dispatch(findUserActions.updateUserInfo(limitedUserArray));
      console.log({ userArray });
    });
  };

  const randomPosition = (min, max) => Math.random() * (max - min) + min;

  return (
    <>
      <div className={classes.ParentreloadBtn}>
        {/* 버튼 클릭 시 handleEmojiCall 함수를 호출 */}
        <button className={classes.reloadBtn} onClick={handleEmojiCall}>
          <img src="./img/reloadBlue.png" alt="새로고침" />
          새로고침
        </button>
      </div>
      <div className={classes.emojiArea}>
        {imageUrls.map((current, index) => (
          <button
            key={index}
            className={classes.EmojiBtn}
            style={{
              left: `${randomPosition(0, 20)}rem`,
              top: `${randomPosition(0, 13)}rem`,
            }}
          >
            <img
              key={index}
              src={current.animatedImageUrl}
              alt={current.emojiId}
              className={classes.EmojiImg}
              style={{ width: `${randomPosition(2.5, 4)}rem` }}
            />
          </button>
        ))}
      </div>
    </>
  );
};

export default Finder;
