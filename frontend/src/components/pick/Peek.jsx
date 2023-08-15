import classes from "./Peek.module.css";
// import Header from "./Header";
import FindPeek from "./FindPeek";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Peek() {
  const openUrl = useSelector((state) => state.changeMap.openUrl);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState();

  useEffect(() => {
    setBackgroundImageUrl(openUrl);
  }, [openUrl]);
  const inlineStyles = {
    // backgroundImage: `url("/img/maps/BigBenBack.png")`,
    // backgroundImage: `url("/img/maps/EiffelTowerBack.png")`,
    // backgroundImage: `url("/img/maps/KermlinBack.png")`,
    // backgroundImage: `url("/img/maps/PiramidsBack.png")`,
    // backgroundImage: `url("/img/maps/PisaTowerBack.png")`,
    // backgroundImage: `url("/img/maps/StatueLibertyBack.png")`,
    // backgroundImage: `url("/img/maps/TajimahalBack.png")`,
    // backgroundColor: `#3f504f`,
    // backgroundColor: `#c9bdb2`,
    // backgroundColor: `#a7a49a`,
    // backgroundColor: `#e9b36a`,
    // backgroundColor: `#81b249`,
    // backgroundColor: `#63b3ff`,
    // backgroundColor: `#af8e88`,
    // backgroundImage: `url("/img/free.png")`,
    backgroundImage: backgroundImageUrl
      ? `url(${backgroundImageUrl})`
      : `url("https://peekpick-app.s3.ap-northeast-2.amazonaws.com/StatueLibertyBack.png")`,
    // 다른 스타일 속성들
  };
  return (
    <div className={classes.pickerMain} id="peekMain" style={inlineStyles}>
      {/* <Header></Header> */}
      <FindPeek></FindPeek>
    </div>
  );
}
export default Peek;
