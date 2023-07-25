import { useNavigate } from 'react-router-dom';

import classes from './UserInfo.module.css';

const UserInfo = () => {
  const navigate = useNavigate();

  const moveToUserProfile = () => {
    navigate('/userprofile')
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
          <input type="text" name="email" value="이메일" />
          <input type="text" name="name" value="이름" />
          <input type="text" name="phone" value="전화번호" />
          <input type="text" name="birth" value="생년월일" />
          <input type="text" name="sex" value="성별"/>
          <input type="button" value="다음으로" onClick={moveToUserProfile} />
        </form>
      </div>
    </div>
  );
}
export default UserInfo;