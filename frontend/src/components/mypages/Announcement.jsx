import React from 'react';
import classes from './Announcement.module.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
const Announcement = () => {
  // 상태(state)를 정의하여 내용의 표시 여부를 저장합니다.
  const [contentVisible, setContentVisible] = useState({});

  // 버튼 클릭 시 해당 공지사항 내용을 토글하는 함수입니다.
  const toggleContent = (id) => {
    setContentVisible((prevVisible) => ({
      ...prevVisible,
      [id]: !prevVisible[id]
    }));
  };


  return (
    <div>
      <div className={classes.top}>
        {/* 뒤로가기 클릭시 마이페이지 onCLick */}
        <Link to="/mypage">
        <img src="img/back.png" alt="" />
        </Link>
        <h2>공지사항</h2>
      </div>
      <div className={classes.noticecontent}>
        <div className={classes.noticeitem}>
          <span className={classes.noticedate}>2023년 8월 18일</span>
          <div className={classes.noticetextimg}>
            <p className={classes.noticetext}>최종 발표 두둥 등장</p>
            <img src="img/down.png" alt="" onClick={()=> {toggleContent(1)}}/>
          </div>
        </div>
        {contentVisible[1]&&<div className={classes.content}>
          곧 최종 발표가 진행된다 우와아아아아아아ㅏ아아아아아아아아ㅏ아아아아아아아ㅏ아아
          </div>}
      </div>
      <div className={classes.noticecontent}>
        <div className={classes.noticeitem}>
          <span className={classes.noticedate}>2023년 8월 18일</span>
          <div className={classes.noticetextimg}>
            <p className={classes.noticetext}>최종 발표 두둥 등장</p>
            <img src="img/down.png" alt="" onClick={()=> {toggleContent(2)}}/>
          </div>
        </div>
        {contentVisible[2]&&<div className={classes.content}>
          곧 최종 발표가 진행된다 우와아아아아아아ㅏ아아아아아아아아ㅏ아아아아아아아ㅏ아아
          </div>}
      </div>
    </div>
  );
}
export default Announcement;