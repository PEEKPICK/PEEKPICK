import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import GeoLocation from "./GeoLocation";
import { customAxios } from "../../api/customAxios";
import classes from "./Finder.module.css";
const Finder = () => {
  // Redux store에서 위치값 가져오기
  const getMemberId = useSelector((state) => state.geo.memberId);
  const getPoint = useSelector((state) => state.geo.point);
  const getDistance = useSelector((state) => state.geo.distance);

  //이모지를 새롭게 랜더링
  const [imageUrls, setImageUrls] = useState([]);

  // GeoLocation 호출하여 위치 가져와서 객체에 담기

  GeoLocation();

  useEffect(() => {
    if (getMemberId !== null && getPoint !== null && getDistance !== null) {
      const requestBody = {
        memberId: getMemberId,
        point: getPoint,
        distance: getDistance,
      };
      emojiCall(requestBody);
    }
  }, [getMemberId, getPoint, getDistance]);

  const emojiCall = (requestBody) => {
    customAxios.post("/picker", requestBody).then((response) => {
      console.log(response.data);
      const imageUrlArray = response.data.data.data.map((item) => item.emoji);
      setImageUrls(imageUrlArray);
      console.log("이모지 배열", imageUrlArray);
    });
  };
  return (
    <>
      <div className={classes.ParentreloadBtn}>
        <button className={classes.reloadBtn} onClick={() => emojiCall()}>
          <img src="./img/reloadBlue.png" alt="새로고침" />
          새로고침
        </button>
      </div>
      <div className={classes.emojiArea}>
        {imageUrls.map((current, index) => (
          <img key={index} src={current.animatedImageUrl} alt={current.emojiId} className={classes.EmojiBtn} />
        ))}
      </div>
    </>
  );
};

export default Finder;
