import React from "react";
import classes from "./Picker.module.css";
// import Header from "./Header";
import FindPicker from "./FindPicker";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Picker() {
  const mapInfo = useSelector((state) => state.changeMap);
  const distanceMap =useSelector((state) => state.location.userPos.distance);

  const [backgroundImageUrl, setBackgroundImageUrl] = useState('');
  const [mapType, setMapType] = useState(classes.pickerMain);
  useEffect(() => {
    const worldMapUrl = localStorage.getItem('worldMap')
    if (mapInfo.openUrl === null) {
      setBackgroundImageUrl(worldMapUrl);
    } else {
      setBackgroundImageUrl(mapInfo.openUrl);
    }
  }, [mapInfo]);

  const inlineStyles = {
    backgroundImage: backgroundImageUrl
      ? `url(${backgroundImageUrl})`
      : `url("https://peekpick-app.s3.ap-northeast-2.amazonaws.com/StatueLibertyBack.png")`,
    // 다른 스타일 속성들
  };


  useEffect (()=>{

     if(distanceMap=== 500){
      setMapType(classes.pickerMainOne);
     } else if (distanceMap === 1000){
      setMapType(classes.pickerMainTwo);
     } else if ( distanceMap===1500){
      setMapType(classes.pickerMainThree);
     } else{
      setMapType(classes.pickerMain);
     }
     // eslint-disable-next-line
  },[distanceMap])

  return (
    <div className={mapType} id="pickerMain" style={inlineStyles}>
      {/* <Header></Header> */}
      <FindPicker></FindPicker>
    </div>
  );
}
export default Picker;
