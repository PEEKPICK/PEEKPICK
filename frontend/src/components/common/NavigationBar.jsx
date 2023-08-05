import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import classes from "./NavigationBar.module.css";

const NavigationBar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const myPage = location.pathname === "/mypage";
  const peek = location.pathname === "/peek";
  const picker = location.pathname === "/";

  return (
    <div className={classes.container}>
      {/* 개별적으로 클릭시 그쪽 색상 들어오게 div css 설정 잘하기 */}
      <nav className={classes.navibar}>
        <div
          className={peek ? classes.on : ""}
          onClick={() => {
            navigate("/peek");
          }} // Use navigate function
        >
          <img src={peek ? "img/heartWhite.png" : "img/heartBlack.png"} alt="" />
          <p>이슈</p>
        </div>
        <div
          className={picker ? classes.on : ""}
          onClick={() => {
            navigate("/");
          }}
        >
          <img src={picker ? "img/finderWhite.png" : "img/finderBlack.png"} alt="" />
          <p>사람</p>
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
  );
};

export default NavigationBar;
