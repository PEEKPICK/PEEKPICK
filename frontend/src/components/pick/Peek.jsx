import classes from "./Peek.module.css";
// import Header from "./Header";
import FindPeek from "./FindPeek";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";

function Peek() {
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
 },[distanceMap]);

  const inlineStyles = {
    backgroundImage: backgroundImageUrl
      ? `url(${backgroundImageUrl})`
      : `url("https://peekpick-app.s3.ap-northeast-2.amazonaws.com/StatueLibertyBack.png")`,
    // 다른 스타일 속성들
  };
  return (
    <div  className={mapType} id="peekMain" style={inlineStyles}>
      {/* <Header></Header> */}
      <FindPeek></FindPeek>
    </div>
  );
}
export default Peek;
