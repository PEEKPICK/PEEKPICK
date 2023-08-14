import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import classes from "./NavigationBar.module.css";
//채팅
import { useSelector } from "react-redux";
import CreateReadChat from "../pick/CreateReadChat";
import ChatPop from "./ChatPop";
const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const myPage = location.pathname === "/mypage";
  const peek = location.pathname === "/peek";
  const picker = location.pathname === "/";
  //채팅
  const isModalState = useSelector((state) => state.roomId.chatModalState);

  const containerStyle = {
    backgroundColor: myPage ? "#ffffff" : "#98c7fc",
  };
  useEffect(() => {});
  return (
    <>
      <div className={classes.containerStyle} style={containerStyle}>
        {/* 개별적으로 클릭시 그쪽 색상 들어오게 div css 설정 잘하기 */}
        <nav className={classes.navibar}>
          <div
            className={peek ? classes.on : ""}
            onClick={() => {
              navigate("/peek");
            }} // Use navigate function
          >
            <img src={peek ? "img/heartWhite.png" : "img/heartBlack.png"} alt="" />
            <p>피크</p>
          </div>
          <div
            className={picker ? classes.on : ""}
            onClick={() => {
              navigate("/");
            }}
          >
            <img src={picker ? "img/finderWhite.png" : "img/finderBlack.png"} alt="" />
            <p>피커</p>
          </div>
          <div
            className={myPage ? classes.on : ""}
            onClick={() => {
              navigate("/mypage");
            }}
          >
            <img src={myPage ? "img/mypageWhite.png" : "img/mypageBlack.png"} alt="" />
            <p>프로필</p>
          </div>
        </nav>
      </div>
      {/* 채팅 모달 */}
      <ChatPop />
      <CreateReadChat isModalState={isModalState} />
    </>
  );
};

export default NavigationBar;
