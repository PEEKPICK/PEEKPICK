import React,{useEffect,useRef,forwardRef}from 'react';
import classes from './LogOut.module.css';
import { Link } from 'react-router-dom';
const LogOut = forwardRef((props,ref) => {
  let wrapperRef = useRef();
    useEffect(()=>{
      document.addEventListener('mousedown', handleClickOutside);
      return()=>{
        document.removeEventListener('mousedown', handleClickOutside);
      }
    })
    const handleClickOutside=(event)=>{
      if (wrapperRef && !wrapperRef.current.contains(event.target)){
        props.setLogoutView(false);
      }
    }
    const LogOutDisplay=()=>{
      props.setLogoutView(false);
    }
    const Logout=()=>{
      localStorage.clear()
    }

  return (
    <div className={classes.hi} ref={wrapperRef}>
      {/* 모달창 */}
      <div>
        <h3>CAUTION</h3>
        {/* x 버튼 click 시 로그아웃 화면 종료 */}
        <img src="img/cancel.png" alt="" onClick={LogOutDisplay}/>
      </div>
      <hr />
      <div>
        <h4>로그아웃 하시겠습니까?</h4>

        {/* 클릭시 로그아웃 화면 종료 */}
        <div className={classes.hate} onClick={LogOutDisplay}>
          <h4>싫어!</h4>
        </div>
        {/* 클릭시 로그아웃 */}
        <Link to="/login">
        <div className={classes.like} onClick={Logout}>
          <h4>좋아!</h4>
        </div>
        </Link>
      </div>
    </div>
  );
})

export default LogOut;