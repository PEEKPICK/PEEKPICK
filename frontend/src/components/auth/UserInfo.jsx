import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '../../store/authSlice';
import classes from './style/UserInfo.module.css';

const UserInfo = () => {
  const userInfo = useSelector(state => state.auth);

  const [gender, setGender] = useState('M')
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const moveToUserProfile = () => {
    const changedUserData = {
      name: userInfo.name,
      email: userInfo.email,
      phone: phone,
      birthday: birthday,
      gender: gender,
    }
    dispatch(authActions.updateUserInfo(changedUserData));
    navigate('/userprofile')
  };

  

  const phoneIsValid = () => {
    if (userInfo.phone) {
      return (
        <div>
          {userInfo.phone}
        </div>
      );
    } else {
      return (
        <input type="text" name="phone" defaultValue="전화번호" onChange={e => setPhone(e.target.value)} />
      );
    }
  };

  const birthdayIsValid = () => {
    if (userInfo.birthday) {
      return (
        <div>
          {userInfo.birthday}
        </div>
      );
    } else {
      return (
        <input type="text" name="birth" defaultValue="생년월일" onChange={e => setBirthday(e.target.value)} />
      );
    }
  };

  return (
    <div>
      <div>
        <h1>회원가입</h1>
      </div>
      <div>
        <p>회원 정보를 확인해주세요</p>
      </div>
      <div>
        <form className={classes.form}>
          <div>
            {userInfo.name}
          </div>
          <div>
            {userInfo.email}
          </div>
          <div>
            {phoneIsValid()}
          </div>
          <div>
            {birthdayIsValid()}
          </div>
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