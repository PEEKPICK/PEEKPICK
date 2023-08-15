import React from "react";
import classes from "./Picker.module.css";
// import Header from "./Header";
import FindPicker from "./FindPicker";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Picker() {
  const openUrl = useSelector((state) => state.changeMap.openUrl);
  const [backgroundImageUrl, setBackgroundImageUrl] = useState();

  useEffect(() => {
    setBackgroundImageUrl(openUrl);
  }, [openUrl]);

  const inlineStyles = {
    backgroundImage: backgroundImageUrl
      ? `url(${backgroundImageUrl})`
      : `url("https://peekpick-app.s3.ap-northeast-2.amazonaws.com/StatueLibertyBack.png")`,
    // 다른 스타일 속성들
  };

  return (
    <div className={classes.pickerMain} id="pickerMain" style={inlineStyles}>
      {/* <Header></Header> */}
      <FindPicker></FindPicker>
    </div>
  );
}
export default Picker;
