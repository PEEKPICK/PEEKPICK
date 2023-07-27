import React,{useState,useEffect,useRef,forwardRef} from 'react';
import classes from './settings.module.css';
import { Link } from 'react-router-dom';
// import { useState } from 'react';
const Settings = forwardRef((props, ref) =>{
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

    <div className={classes.hi} ref={wrapperRef}>
      <div>
        {/* onClick 시 공지사항 components */}
        <Link to={"/announcement"} style={{ textDecoration: "none" ,color:"black"}}>
        <div>
          <h2>공지사항</h2>
        </div>
        </Link>
        <hr />
        <div onClick={LogOutOn}>
          {/* onClick 시 로그아웃 components */}
          <h2>로그아웃</h2>
        </div>
        <hr />
        <div onClick={SignOutOn}>
        {/* onClick 시 회원탈퇴 components */}
        <h2>회원탈퇴</h2>
        </div>
      </div>
      {/* 로그아웃 모달창 위치 고정 시킬거임 */}
    </div>

  );
})

export default Settings;