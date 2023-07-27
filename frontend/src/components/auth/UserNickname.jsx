import axios from 'axios';

import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { authActions } from '../../store/authSlice';
import classes from './style/UserNickname.module.css';

import { useSelector } from 'react-redux';

const UserNickname = () => {
  const check = useSelector(state => state.auth)

  // 상태관리
  const [prefix, setPrefix] = useState('37');
  const [content, setContent] = useState('아빠같은');
  const [nickname, setNickname] = useState('');

  // redux, router 처리
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //함수 정의
  const randomPrefix = () => {
    axios.get('http://192.168.31.26:8081/member/prefix')
      .then(response => {
        setPrefix(response.data.data.prefixId);
        setContent(response.data.data.content);
      })
      .catch(error => {
        console.log(error)
      })
  };

  const moveToUserLikeHate = () => {
    const changedNickname = {
      prefixId: prefix,
      nickname: nickname,
    }
    dispatch(authActions.updateUserNickname(changedNickname));
    console.log(check)
    navigate('/userlikehate')
  }

  return (
    <div>
      <div>
        <h1>닉네임 PICK</h1>
      </div>
      <div>
        <p>자신을 나타낼 수 있는 정보는 최대한 삼가해주세요!</p>
      </div>
      <div className={classes.line}></div>
      <div>
        <h3>타이틀</h3>
        <div>
          <div>
            {content}
          </div>
          <img src="img/reloadWhite.png" alt="reload" className={classes.reload} onClick={randomPrefix} />
        </div>
      </div>
      <div>
        <h3>닉네임</h3>
        <input type="text" onChange={e => setNickname(e.target.value)} />
      </div>
      <div>
        <button onClick={moveToUserLikeHate}>다음으로</button>
      </div>
    </div>
  );
}
export default UserNickname;