import { useNavigate } from 'react-router-dom';

import classes from './style/UserNickname.module.css';

const UserNickname = () => {
  const navigate = useNavigate();

  const moveToUserLikeHate = () => {
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
        <h3>타이들</h3>
        <div>
          <input type="text" />
          <img src="img/reloadWhite.png" alt="reload" className={classes.reload} />
        </div>
      </div>
      <div>
        <h3>닉네임</h3>
        <input type="text" />
      </div>
      <div>
        <button onClick={moveToUserLikeHate}>다음으로</button>
      </div>
    </div>
  );
}
export default UserNickname;