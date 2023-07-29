import { useNavigate } from 'react-router-dom';

import classes from './style/UserLikeOrHate.module.css';

const UserLike = () => {
  const navigate = useNavigate();

  const selectedFinish = () => {
    navigate('/userlikehate');
  };

  return (
    <div>
      <div>
        <h1>좋아해요</h1>
        <p>(최대 5개 선택 가능)</p>
      </div>
      <div className={classes.line}></div>
      <div>
        <button onClick={selectedFinish}>선택완료</button>
      </div>
    </div>
  );
}
export default UserLike;