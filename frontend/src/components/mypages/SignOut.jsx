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
      <hr className={classes.hr}/>
      <div className={classes.explanation}>
        <span>
          회원 탈퇴 어쩌구 저쩌구 모든 정보가 삭제 어쩌구
          너는 지금뭐해 자니 밖이야 뜬금 없는 문자를 돌려 보지만
          어떻게 해볼까란 뜻은 아니야
          시기 다른 래퍼들의 반대편을 바라보던 래퍼들의 배포 그건
          백프로 개뻥 뭐든 개빨아 마치 텐프로 됐어 보인 각본 짜인 대봉
        </span>
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