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
    <div className={classes.side}>
      <div className={classes.top}>
        {/* 뒤로가기 클릭시 마이페이지 onCLick */}
        <Link to="/mypage">
          <img src="img/back.png" alt="" />
        </Link>
        <h2>공지사항</h2>
      </div>
      <div className={classes.noticecontent}>
        <div className={classes.noticeitem}>
          <span className={classes.noticedate}>2023년 8월 8일</span>
          <div className={classes.noticetextimg}>
            <p className={classes.noticetext}>중간 발표 최종.ver</p>
            {contentVisible[1] ?
              <img src="img/up.png" alt="" onClick={() => { toggleContent(1) }} /> :
              <img src="img/down.png" alt="" onClick={() => { toggleContent(1) }} />
            }
          </div>
        </div>
        {contentVisible[1] && <div className={classes.content}>
          데이터 전달 로직 수정중..
        </div>}
      </div>
      <div className={classes.noticecontent}>
        <div className={classes.noticeitem}>
          <span className={classes.noticedate}>2023년 8월 9일</span>
          <div className={classes.noticetextimg}>
            <p className={classes.noticetext}>중간 발표 최종의 최종.ver</p>
            {contentVisible[2] ?
              <img src="img/up.png" alt="" onClick={() => { toggleContent(2) }} /> :
              <img src="img/down.png" alt="" onClick={() => { toggleContent(2) }} />
            }
          </div>
        </div>
        {contentVisible[2] && <div className={classes.content}>
          이게 왜 안돼..?
        </div>}
      </div>
      <div className={classes.noticecontent}>
        <div className={classes.noticeitem}>
          <span className={classes.noticedate}>2023년 8월 10일</span>
          <div className={classes.noticetextimg}>
            <p className={classes.noticetext}>중간 발표 최종의 최종의 최종.ver</p>
            {contentVisible[3] ?
              <img src="img/up.png" alt="" onClick={() => { toggleContent(3) }} /> :
              <img src="img/down.png" alt="" onClick={() => { toggleContent(3) }} />
            }
          </div>
        </div>
        {contentVisible[3] && <div className={classes.content}>
          아아..시간이 되버렸습니다..
          저는 최선을 다했어요..
          잘 되겠죠..?
        </div>}
      </div>
      <div className={classes.noticecontent}>
        <div className={classes.noticeitem}>
          <span className={classes.noticedate}>2023년 8월 10일</span>
          <div className={classes.noticetextimg}>
            <p className={classes.noticetext}>중간 발표 진짜 진짜 최종의 최종의 최종.ver</p>
            {contentVisible[4] ?
              <img src="img/up.png" alt="" onClick={() => { toggleContent(4) }} /> :
              <img src="img/down.png" alt="" onClick={() => { toggleContent(4) }} />
            }
          </div>
        </div>
        {contentVisible[4] && <div className={classes.content}>
          제발 제발 제발 제발 에러만 뜨지 말아주세요 제발!!! 제발요 ㅠㅠㅠㅠㅠㅠㅠㅠ
        </div>}
      </div>
    </div>
  );
}
export default Announcement;