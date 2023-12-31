import React, { useEffect, useRef, forwardRef } from 'react';
import classes from './LogOut.module.css';
import { customAxios } from '../../api/customAxios';
const LogOut = forwardRef((props, ref) => {
  let wrapperRef = useRef();

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  });

  const handleClickOutside = (event) => {
    // Link를 클릭한 경우 모달 창 닫기 동작을 수행하지 않음
    if (
      wrapperRef &&
      !wrapperRef.current.contains(event.target)) {
      props.setLogoutView(false);
    }
  };

  const LogOutDisplay = () => {
    props.setLogoutView(false);
  };

  const Logout = () => {
    customAxios.post('/member/logout')
      .then(response => {
        localStorage.removeItem('jwtToken');
        window.location.replace('/');
        // setTimeout(()=>{
        //   navigate('/');
        // },1000)
      })
      .catch(response => {
        localStorage.removeItem('jwtToken');
        window.location.replace('/');
      })
  };

  return (
    <div className={classes.logout} ref={wrapperRef}>
      {/* 모달창 */}
      <div className={classes.logouttop}>
        <span>CAUTION</span>
        {/* x 버튼 click 시 로그아웃 화면 종료 */}
        <img src="img/cancel.png" alt="" onClick={LogOutDisplay} />
      </div>
      <hr className={classes.hr} />
      <div className={classes.explanation}>
        <span>로그아웃 하시겠습니까?</span>
      </div>
      <div className={classes.btndiv}>
        {/* 클릭시 로그아웃 화면 종료 */}
        <div onClick={LogOutDisplay} className={classes.hate}>
          <span>싫어!</span>
        </div>
        {/* 클릭시 로그아웃 */}
        <div onClick={Logout} className={classes.like}>
          <span>좋아!</span>
        </div>
      </div>
    </div>
  );
});

export default LogOut;
