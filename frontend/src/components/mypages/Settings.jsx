import React from 'react';
import classes from './settings.module.css';
import { Link } from 'react-router-dom';
import LogOut from './LogOut';
import { useState } from 'react';


const Settings = (props) => {
  const [ModalLogOut, setModalLogOut] = useState(false);
  const showModal = () => {
    setModalLogOut(!ModalLogOut);
  }
  return (
    // 모달창
    <div className={classes.back}>
      <div className={classes.modalback}>
        {/* onClick 시 공지사항 components */}
        <Link to={"/announcement"}>
        <div>
          <h2>공지사항</h2>
        </div>
        </Link>
        <hr />
        <div onClick={showModal}>
          {/* onClick 시 로그아웃 components */}
          <h2>로그아웃</h2>
        </div>
        <hr />
        <div>
        {/* onClick 시 회원탈퇴 components */}
        <h2>회원탈퇴</h2>
        </div>
      </div>
      {/* 로그아웃 모달창 위치 고정 시킬거임 */}
      {ModalLogOut && <LogOut set ModalLogOut={setModalLogOut} />}
    </div>

  );
}

export default Settings;