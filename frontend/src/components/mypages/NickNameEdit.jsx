import React, { useState, useEffect, useRef, forwardRef } from 'react';
import classes from './NickNameEdit.module.css';
import { customAxios } from '../../api/customAxios';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/authSlice';
const NickNameEdit = forwardRef((props, ref) => {
  let wrapperRef = useRef();
  // 리덕스에 있는 자료 미리 넣어놓기
  const [prefix, setPrefix] = useState('hi');
  const [prefixId, setPrefixId] = useState('hi');
  const [nickname, setNickname] = useState('');
  const [oneLine, setoneLine] = useState('');
  const dispatch = useDispatch();
  if (oneLine.length >= 20) {
    alert("한 줄 소개에는 20단어 이상이 허용되지 않습니다.")
    setoneLine("");
  }
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
    console.log(nickname)
  }
  const handleoneLine = (e) => {
    setoneLine(e.target.value);
    console.log(oneLine);
  }
  const NickNameEditDisplay = () => {
    props.setNicknameView(false);
  }

  const titleChange = () => {
    customAxios.get("/member/prefix")
      .then((response) => {
        console.log(response)
        setPrefix(response.data.data.content)
        setPrefixId(response.data.data.prefixId)
      })
  }
  const profile = {
    "prefixId": prefixId,
  }
  console.log(profile)
  const changeProfile = () => {
    // 리덕스 코드 집어넣기
    customAxios.put("/member/info", { profile })
      .then((response) => {
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
      <hr />
      <div className={classes.title}>
        <h4>타이틀</h4>
        {/* 형용사 버튼클릭시 input 안에 들어옴 변경 금지
                input 말고 div로 디자인 해야할지도? */}
        <div className={classes.titleinline}>
        <input type="text" value={prefix} readOnly />
        {/* 클릭시 형용사 랜덤으로 백에서 뽑아오기 */}
        <img src="img/reloadWhite.png" alt="타이틀 바꾸기 버튼" onClick={titleChange} />
        </div>
      </div>
      <div>
        <h4>닉네임</h4>
        {/* 입력 받은 정보 props로 전달해야하기 때문에 이 부분 공부 */}
        <div className={classes.nickname}>
        <input type="text" value={nickname} onChange={handleNicknameChange} />
        </div>
      </div>
      <div>
        <h4>한 줄 소개</h4>
        {/* 이 부분도 닉네임과 타이틀 동일하게 잘 전달해야함! */}
        <div className={classes.oneline}>

        <input type="text" value={oneLine} onChange={handleoneLine} />
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