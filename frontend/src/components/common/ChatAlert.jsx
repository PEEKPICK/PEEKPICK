import React from "react";
import classes from './NavigationBar.module.css';

const ChatAlert = () => {
  return (
    // 클릭 시 채팅창 켜지게 만들어야함 전체 div 설정
    // 동민이형이 만드는 채팅창으로 연결이 되어야함!
    <div className={classes.alert}>
      {/* 빨간 불 */}
      <img src="img/infoRed.png" alt="" />
      <span>즐거운 아메리카노</span>
      {/* 맨오른쪽 열기창 */}
      <img src="img/up.png" alt="" />
      {/* <img src="img/down.png" alt="" /> */}
    </div>
  );
};

export default ChatAlert;