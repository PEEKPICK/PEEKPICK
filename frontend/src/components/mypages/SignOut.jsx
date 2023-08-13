import React, { useEffect, useRef, forwardRef, useState } from 'react';
import classes from './SignOut.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const SignOut = forwardRef((props, ref) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }
  let wrapperRef = useRef();
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  })
  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      props.setSignoutView(false);
    }
  }
  const SignOutDisplay = () => {
    props.setSignoutView(false);
  }
  // axios delete 요청하기
  const deleteSign = () => {
    axios.delete('http://192.168.31.26:8081/member/secession')
      .then((response) => {
        console.log('삭제 성공', response);
      })
      .catch((error) => {
        console.log(error)
      })
  }
  return (
    <div className={classes.signout} ref={wrapperRef}>
      {/* 모달창 */}
      <div className={classes.signouttop}>
        <h3>CAUTION</h3>
        {/* x 버튼 click 시 회원 탈퇴 화면 종료 */}
        <img src="img/cancel.png" alt="" onClick={SignOutDisplay} />
      </div>
      <hr className={classes.hr} />
      <div className={classes.explanation}>
      <span>회원 탈퇴 안내</span>
      <span>정말로 회원 탈퇴를 하시겠습니까?</span>
      <span>모든 데이터와 정보가</span> 
      <span>영구적으로 삭제됩니다.</span>   
      <span>탈퇴 후에는 복구가 불가능합니다.</span>              
      </div>

      <div className={classes.agree}>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange} />
        {/* 체크박스 활성화시 회원탈퇴 버튼 색 활성화 */}
        <span>위 유의사항을 모두 확인하였고, 탈퇴를 진행합니다.</span>
      </div>
      {/* 색깔 변화 넣어야함 */}
      <div>
        {isChecked ? (
          <Link to="/login">
            <div onClick={deleteSign} className={classes.btnclick}>
              {/* 클릭 시 DB 계정 정보 삭제 */}
              <h4>회원 탈퇴</h4>
            </div>
          </Link>
        ) : (
          <div className={classes.btnbasic}>
            <h4>회원 탈퇴</h4>
          </div>
        )}
      </div>
    </div>
  );
})

export default SignOut;