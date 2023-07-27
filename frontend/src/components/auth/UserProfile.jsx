import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../store/authSlice';
import classes from './style/UserProfile.module.css';

const UserProfile = () => {
  // 상태관리
  const [randomEmoji, setRandomEmoji] = useState('https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Astonished+Face.png');
  const [emoji, setEmoji] = useState('1');

  // redux, router, redux선택 처리
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 이모지 다시 뽑기를 위한 버튼
  const randomGacha = () => {
    axios.get('http://192.168.31.26:8081/member/emoji')
      .then(response => {
        setEmoji(response.data.data.emojiId);
        setRandomEmoji(response.data.data.animatedImageUrl);
      })
      .catch(error => {
        console.log(error)
      })
  };

  // 다음으로 이동
  const moveToUserNickname = () => {
    dispatch(authActions.updateProfile(emoji));
    navigate('/usernickname')
  };

  return (
    <div>
      <div>
        <h1>프로필 PICK</h1>
      </div>
      <div>
        <p>개성넘치는 프로필을 뽑아보세요.</p>
        <p>숨겨진 프로필이 있다는 소문이...</p>
      </div>
      <div className={classes.line}></div>
      <div>
        <img src={randomEmoji} alt="dummy_emoji" className={classes.myImage} />
      </div>
      <div>
        <button onClick={randomGacha}>다시뽑기</button>
      </div>
      <div>
        <button onClick={moveToUserNickname}>다음으로</button>
      </div>
    </div>
  );
}
export default UserProfile;