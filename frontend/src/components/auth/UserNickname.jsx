import { customAxios } from '../../api/customAxios';

import { useState } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { authActions } from '../../store/authSlice';
import classes from './style/UserNickname.module.css';
import common from './style/Common.module.css';

const UserNickname = () => {
  // 상태관리
  const [prefix, setPrefix] = useState('37');
  const [content, setContent] = useState('아빠같은');
  const [nickname, setNickname] = useState('');

  // redux, router 처리
  const navigate = useNavigate();
  const dispatch = useDispatch();


  //함수 정의
  const randomPrefix = () => {
    customAxios.get('/member/prefix')
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
    navigate('/userlikehate')
  }

  return (
    <div className={common.container}>
      <div>
        <h1>닉네임 PICK</h1>
      </div>
      <div>
        <p>자신을 나타낼 수 있는 정보는
          <br />
          최대한 삼가해주세요!
        </p>
      </div>
      <div className={common.linetag}>
        <div className={classes.line1}></div>
        <div className={classes.line2}></div>
      </div>
      <div className={classes.allWrap}>
        <div>
          <div>
            <h3>타이틀</h3>
          </div>
          <div className={classes.prefixWrap}>
            <div className={classes.prefix}>
              {content}
            </div>
            <div className={classes.reload}>
              <img src="img/reloadWhite.png" alt="reload" onClick={randomPrefix} />
            </div>
          </div>
        </div>
        <div>
          <div className={classes.nickname}>
            <h3>닉네임</h3>
          </div>
          <div>
            <input type="text" onChange={e => setNickname(e.target.value)}  className={classes.nicknameInput}/>
          </div>
        </div>
      </div>
      <div>
        <button onClick={moveToUserLikeHate} className={common.next}>다음으로</button>
      </div>
    </div>
  );
}
export default UserNickname;