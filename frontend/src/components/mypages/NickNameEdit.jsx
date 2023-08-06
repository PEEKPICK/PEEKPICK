import React, { useState, useEffect, useRef, forwardRef } from 'react';
import classes from './NickNameEdit.module.css';
import { customAxios } from '../../api/customAxios';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/authSlice';
const NickNameEdit = forwardRef((props, ref) => {
  let wrapperRef = useRef();
  // 리덕스에 있는 자료 미리 넣어놓기
  const userInfo = useSelector(state => state.auth);
  const [prefix, setPrefix] = useState(userInfo.prefix);
  const [prefixId, setPrefixId] = useState(userInfo.prefixId);
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [bio, setbio] = useState(userInfo.bio);

  // 로그인 자료
  const jwtToken = localStorage.getItem('jwtToken');
  const headers = {
    Authorization : `Bearer ${jwtToken}`
  }

  // 리덕스
  const dispatch = useDispatch();
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    }
  })
  const handleClickOutside = (event) => {
    if (wrapperRef && !wrapperRef.current.contains(event.target)) {
      props.setNicknameView(false);
    }
  }

  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  }
  const handlebio = (e) => {
    setbio(e.target.value);
  }
  const NickNameEditDisplay = () => {
    props.setNicknameView(false);
  }

  const profile = {
    "prefixId": prefixId,
    "nickname": nickname,
    "bio" : bio,
    "prefix":prefix,
  }
  const titleChange = () => {
    customAxios.get("/member/prefix")
      .then((response) => {
        setPrefix(response.data.data.content)
        setPrefixId(response.data.data.prefixId)
        dispatch(authActions.updateUserNickname(profile))
      })
  }

  const maxLengthHandler = (e, max) => {
    if (e.target.value.length > max) {
      e.target.value = e.target.value.substr(0, max);
    }
  };
  const changeProfile = () => {
    // 리덕스 코드 집어넣기
    customAxios.put("/member/info", profile, {headers})
      .then((response) => {
        dispatch(authActions.updateUserNickname(profile))
        props.setNicknameView(false);
        props.propPrefix(prefix);
        props.propBio(bio);
        props.propNickname(nickname);
      })
      .catch((error)=>{
        console.log(error)
      })
  }
  return (
    <div className={classes.nicknameedit} ref={wrapperRef}>
      {/* 모달창 */}
      <div className={classes.nicknameedittop}>
        <h3>닉네임 변경</h3>
        {/* 클릭시 마이페이지 이동 */}
        <img src="img/cancel.png" alt="" onClick={NickNameEditDisplay} />
      </div>
      <hr className={classes.hr}/>
      <div>
        <h4>타이틀</h4>
        {/* 형용사 버튼클릭시 input 안에 들어옴 변경 금지
                input 말고 div로 디자인 해야할지도? */}
        <div className={classes.titleinline}>
        <input type="text" value={prefix} placeholder={props.prefix} readOnly />
        {/* 클릭시 형용사 랜덤으로 백에서 뽑아오기 */}
        <img src="img/reloadWhite.png" alt="타이틀 바꾸기 버튼" onClick={titleChange} />
        </div>
      </div>
      <div>
        <h4>닉네임</h4>
        {/* 입력 받은 정보 props로 전달해야하기 때문에 이 부분 공부 */}
        <div className={classes.nickname}>
        <input type="text" placeholder={props.nickname} onChange={handleNicknameChange} onInput={e => maxLengthHandler(e, 6)}/>
        </div>
      </div>
      <div>
        <h4>한 줄 소개</h4>
        {/* 이 부분도 닉네임과 타이틀 동일하게 잘 전달해야함! */}
        <div className={classes.bio}>

        <input type="text"  placeholder={props.bio} onChange={handlebio} onInput={e => maxLengthHandler(e, 20)}/>
        </div>
      </div>
      {/* 클릭시 props로 마이페이지에 값 전달 */}
      
      <div onClick={changeProfile} className={classes.savebtn}>
        <span>저장</span>
      </div>
    </div>
  );
})

export default NickNameEdit;