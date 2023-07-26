import React from 'react';
import classes from './settings.module.css';
import { Link } from 'react-router-dom';
const Settings = () => {

  return (
    // 모달창
    <div className={classes.back}>
      <div className={classes.modalback}>
        {/* onClick 시 공지사항 components */}
        <Link to={"/announcment"}>
        <div>
          <h2>공지사항</h2>
        </div>
        </Link>
        <hr />
        <div>
          {/* onClick 시 로그아웃 components */}
          <h2>로그아웃</h2>
        </div>
        <hr />
        <div>
        {/* onClick 시 회원탈퇴 components */}
        <h2>회원탈퇴</h2>
        </div>
      </div>
    </div>

  );
}

export default Settings;