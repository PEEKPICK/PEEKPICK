import React,{useEffect,useRef,forwardRef,useState} from 'react';
import classes from './SignOut.module.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
const SignOut = forwardRef((props,ref) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  }
  let wrapperRef = useRef();
    useEffect(()=>{
      document.addEventListener('mousedown', handleClickOutside);
      return()=>{
        document.removeEventListener('mousedown', handleClickOutside);
      }
    })
    const handleClickOutside=(event)=>{
      if (wrapperRef && !wrapperRef.current.contains(event.target)){
        props.setSignoutView(false);
      }
    }
    const SignOutDisplay=()=>{
      props.setSignoutView(false);
    }
    // axios delete 요청하기
    const deleteSign=() =>{
      axios.delete('http://192.168.31.26:8081/member/secession')
      .then((response)=>{
        console.log('삭제 성공',response);
      })
      .catch((error)=>{
        console.log(error)
      })
    }
  return (
    <div className={classes.hi} ref={wrapperRef}>
      {/* 모달창 */}
      <div>
        <h3>CAUTION</h3>
        {/* x 버튼 click 시 회원 탈퇴 화면 종료 */}
        <img src="img/cancel.png" alt="" onClick={SignOutDisplay}/>
      </div>
      <hr />
      <div>
        <p>
          회원 탈퇴 어쩌구 저쩌구 모든 정보가 삭제 어쩌구
        </p>
        <input type="checkbox" checked={isChecked} onChange={handleCheckboxChange}/>
        {/* 체크박스 활성화시 회원탈퇴 버튼 색 활성화 */}
        <p>위 유의사항을 모두 확인하였고, 탈퇴를 진행합니다.</p>
      </div>
      {/* 색깔 변화 넣어야함 */}
      {isChecked ?(
        <Link to="/login">
        <div onClick={deleteSign}>
        {/* 클릭 시 DB 계정 정보 삭제 */}
        <h4>회원탈퇴</h4>
      </div>
      </Link>
      ):(
        <div>
          <h4>회원탈퇴</h4>
        </div>
      )}
    </div>
  );
})

export default SignOut;