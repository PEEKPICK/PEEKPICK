import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import classes from './style/UserProfile.module.css';

const UserProfile = () => {
  const [randomEmoji, setRandomEmoji] = useState('https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Astonished+Face.png');
  const navigate = useNavigate();

  // 이모지 다시 뽑기를 위한 버튼
  const randomGacha = () => {
    var emoji = ['https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Astonished+Face.png',
                'https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Biting+Lip.png',
                'https://peekpick-app.s3.ap-northeast-2.amazonaws.com/Cat+with+Tears+of+Joy.png']
    var random_index = Math.floor(Math.random() * emoji.length);
    var selectedEmoji = emoji[random_index]
    setRandomEmoji(selectedEmoji);
  };

  // 다음으로 이동
  const moveToUserNickname = () => {
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
        <img src={randomEmoji} alt="dummy_emoji" />
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