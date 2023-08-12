import { authAxios } from '../../api/customAxios';

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

  // 함수설정
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 이모지 다시 뽑기를 위한 버튼
  const randomGacha = () => {
    authAxios.get('/member/emoji')
      .then(response => {
        // 이모지 ID 상태관리
        setEmojiId(response.data.data.emojiId);
        // 이모지 url 상태관리
        setRandomEmoji(response.data.data.animatedImageUrl);
      })
      .catch(error => {
        console.log(error)
      })
  };

  // 정보 리덕스에 저장 후 다음 페이지 이동
  const moveToUserNickname = () => {
    const changedEmojiId = {
      emojiId: emojiId
    }
    dispatch(authActions.updateProfile(changedEmojiId));
    navigate('/usernickname')
  };

  return (
    <div className={common.container}>
      <div className={common.title}>
        <h1>프로필</h1>
        <h1 className={common.pointColor}>PICK</h1>
      </div>
      {/* 상단 설명 */}
      <div>
        <p>개성넘치는 프로필을 뽑아보세요
          <br />
          숨겨진 프로필이 있다는 소문이...
        </p>
      </div>
      <div>
      {/* 상단 게이지바 */}
      <div className={common.linetag}>
        <div className={classes.line1}></div>
        <div className={classes.line2}></div>
      </div>
      </div>
      <div className={common.center}>
        <img src={randomEmoji} alt="dummy_emoji" className={classes.emoji} />
      </div>
      <div className={common.center}>
        <button onClick={randomGacha} className={classes.randomButton}>다시뽑기</button>
      </div>
      <div>
        <button onClick={moveToUserNickname} className={common.next}>다음으로</button>
      </div>
    </div>
  );
}
export default UserProfile;