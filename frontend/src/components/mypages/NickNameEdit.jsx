import React,{useState,useEffect,useRef,forwardRef} from 'react';
import classes from './NickNameEdit.module.css';
import axios from 'axios';
const NickNameEdit = forwardRef((props,ref) => {
  let wrapperRef = useRef();
  // 리덕스에 있는 자료 미리 넣어놓기
  const [prefix,setPrefix] = useState('hi');
  const [prefixId,setPrefixId] = useState('hi');
  const [nickname,setNickname] = useState('');
  const [oneline,setOneline] = useState('');

  useEffect(()=>{
    document.addEventListener('mousedown', handleClickOutside);
    return()=>{
      document.removeEventListener('mousedown', handleClickOutside);
    }
  })
  const handleClickOutside=(event)=>{
    if (wrapperRef && !wrapperRef.current.contains(event.target)){
      props.setNicknameView(false);
    }
  }
  
  const handleNicknameChange=(e)=>{
    setNickname(e.target.value);
    console.log(nickname)
  }
  const handleOneline=(e)=>{
    setOneline(e.target.value);
    console.log(oneline);
  }
  const NickNameEditDisplay=()=>{
    props.setNicknameView(false);
  }
  
  const titleChange=()=>{
    axios.get("http://172.30.1.11:8081/member/prefix")
    .then((response)=>{
      console.log(response)
      setPrefix(response.data.data.content)
      setPrefixId(response.data.data.prefixId)
    })
  }
  const profile={
    "userId" : prefixId,
    "bio" : oneline,
  }
  const changeProfile=()=>{
    // 리덕스 코드 집어넣기
    axios.put("",{profile})
    .then((request)=>{
      console.log(request)
    })
  }
  return (
    <div ref={wrapperRef} className={classes.hi}>
      {/* 모달창 */}
      <div>
        <h4>닉네임 변경</h4>
        {/* 클릭시 마이페이지 이동 */}
        <img src="img/cancel.png" alt="" onClick={NickNameEditDisplay}/>
      </div>
      <div>
        <h4>타이틀</h4>
        {/* 형용사 버튼클릭시 input 안에 들어옴 변경 금지
                input 말고 div로 디자인 해야할지도? */}
        <input type="text"  value={prefix} readOnly/>
        {/* 클릭시 형용사 랜덤으로 백에서 뽑아오기 */}
        <img src="img/reloadBlue.png" alt="타이틀 바꾸기 버튼"  onClick={titleChange}/>
      </div>
      <div>
        <h4>닉네임</h4>
        {/* 입력 받은 정보 props로 전달해야하기 때문에 이 부분 공부 */}
        <input type="text" value ={nickname} onChange={handleNicknameChange} />
      </div>
      <div>
        <h4>한 줄 소개</h4>
        {/* 이 부분도 닉네임과 타이틀 동일하게 잘 전달해야함! */}
        <input type="text" value ={oneline} onChange={handleOneline}/>
      </div>
      {/* 클릭시 props로 마이페이지에 값 전달 */}
      <div onClick={changeProfile}>
        <p>저장</p>
      </div>
    </div>
  );
})

export default NickNameEdit;