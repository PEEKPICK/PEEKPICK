import React,{useEffect,useRef,forwardRef} from 'react';
import classes from './settings.module.css';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
const Settings = forwardRef((props, ref) =>{
  //  모달창 설정
  let wrapperRef = useRef(); //모달창 가장 바깥쪽 태그를 감싸주는 역할

    useEffect(()=>{
      document.addEventListener('mousedown', handleClickOutside);
      return()=>{
        document.removeEventListener('mousedown', handleClickOutside);
      }
    })
    const handleClickOutside=(event)=>{
      if (wrapperRef && !wrapperRef.current.contains(event.target)) {
        props.setVisible(false);
      }
    }
    const LogOutOn=()=>{
      props.setVisible(false);
      props.setLogoutView(true);
    }
    const SignOutOn=()=>{
      props.setVisible(false);
      props.setSignoutView(true);
    }


  
  return (
    // 모달창

    <div className={classes.settings} ref={wrapperRef}>
      <div>
        {/* onClick 시 공지사항 components */}
        <Link to={"/announcement"} style={{ textDecoration: "none" ,color:"black"}}>
        <div>
          <span>공지사항</span>
        </div>
        </Link>
        <hr className={classes.hr} />
        <div onClick={LogOutOn}>
          {/* onClick 시 로그아웃 components */}
          <span>로그아웃</span>
        </div>
        <hr className={classes.hr} />
        <div onClick={SignOutOn}>
        {/* onClick 시 회원탈퇴 components */}
        <span>회원탈퇴</span>
        </div>
      </div>
      {/* 로그아웃 모달창 위치 고정 시킬거임 */}
    </div>

  );
})

export default Settings;