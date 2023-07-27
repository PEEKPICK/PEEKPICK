import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import classes from './style/UserInfo.module.css';

const UserInfo = () => {
  const [gender, setGender] = useState('M')

  const navigate = useNavigate();

  const moveToUserProfile = () => {
    navigate('/userprofile')
  };

  const userInfo = useSelector(state => state.auth);

  const checker = () => {
    console.log(userInfo);
  }

  return (
    <div>
      <div>
        <h1>회원가입</h1>
      </div>
      <div>
        <p>회원 정보를 확인해주세요</p>
      </div>
      <button onClick={checker}>API확인</button>
      <div>
        <form className={classes.form}>
          <input type="text" name="email" defaultValue="이메일" />
          <input type="text" name="name" defaultValue="이름" />
          <input type="text" name="phone" defaultValue="전화번호" />
          <input type="text" name="birth" defaultValue="생년월일" />
          <div className={classes.switch}>
            <input type="radio" id="radio-one" name="switch-one" value="M" checked={gender === 'M'} onChange={() => setGender('M')}/>
            <label htmlFor="radio-one">남자</label>
            <input type="radio" id="radio-two" name="switch-one" value="W" checked={gender === 'W'} onChange={() => setGender('W')}/>
            <label htmlFor="radio-two">여자</label>
          </div>
          <input type="button" value="다음으로" onClick={moveToUserProfile} />
        </form>
      </div>
    </div>
  );
}
export default UserInfo;