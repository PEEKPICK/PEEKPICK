import React from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Import useNavigate
import classes from "./NavigationBar.module.css";
//채팅
import { useSelector, useDispatch } from "react-redux";
import { chatActions } from "../../store/chatSlice";
import CreateReadChat from "../pick/CreateReadChat";

const NavigationBar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const myPage = location.pathname === "/mypage";
  const peek = location.pathname === "/peek";
  const picker = location.pathname === "/";

  //채팅
  const isModalState = useSelector((state) => state.roomId.chatModalState);
  const getRoomId = useSelector((state) => state.roomId.roomId);
  const test = () => {
    console.log("isModalState", isModalState);
    console.log("getRoomId", getRoomId);
    dispatch(chatActions.updateChatModalState(!isModalState));
  };
  const declare = () => {};
  return (
    <>
      <div className={classes.container}>
        {/* 채팅 모달 */}
        <div className={classes.chatPull}>
          <span>채팅왔다</span>
          <button onClick={() => test()}>볼꺼냐?</button>
          <button onClick={() => declare()}>나가?</button>
        </div>
        <CreateReadChat isModalState={isModalState} />
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
    </>
  );
};

export default NavigationBar;
