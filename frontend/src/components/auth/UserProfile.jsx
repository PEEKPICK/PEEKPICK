import { customAxios } from '../../api/customAxios';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { authActions } from '../../store/authSlice';
import classes from './style/UserProfile.module.css';
import common from './style/Common.module.css';

const UserProfile = () => {
  // 상태관리
  const [randomEmoji, setRandomEmoji] = useState('https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Astonished+Face.png');
  const [emojiId, setEmojiId] = useState('1');

  // redux, router, redux선택 처리
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 이모지 다시 뽑기를 위한 버튼
  const randomGacha = () => {
    customAxios.get('/member/emoji')
      .then(response => {
        setEmojiId(response.data.data.emojiId);
        setRandomEmoji(response.data.data.animatedImageUrl);
      })
      .catch(error => {
        console.log(error)
      })
  };

  // 다음으로 이동
  const moveToUserNickname = () => {
    const changedEmojiId = {
      emojiId: emojiId
    }
    dispatch(authActions.updateProfile(changedEmojiId));
    navigate('/usernickname')
  };

  return (
    <div>
      <div className={common.signup}>
        <h1>프로필 PICK</h1>
      </div>
      <div className={common.signup}>
        <p>개성넘치는 프로필을 뽑아보세요
          <br />
          숨겨진 프로필이 있다는 소문이...
        </p>
      </div>
      <div>
      <div className={common.linetag}>
        <div className={classes.line1}></div>
        <div className={classes.line2}></div>
      </div>
      </div>
      <div className={common.signup}>
        <img src={randomEmoji} alt="dummy_emoji" className={classes.myImage} />
      </div>
      <div className={common.signup}>
        <button onClick={randomGacha} className={classes.randomButton}>다시뽑기</button>
      </div>
      <div className={common.signup}>
        <button onClick={moveToUserNickname} className={common.next}>다음으로</button>
      </div>
    </div>
  );
}
export default UserProfile;