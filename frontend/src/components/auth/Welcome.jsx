// useNavigate는 다른 js파일로 이동할 때 사용
import { customAxios } from '../../api/customAxios';

import common from './style/Common.module.css';
import classes from './style/Welcome.module.css';

const Welcome = () => {
  // 헤더에 토큰 넣어서 백엔드에 요청
  const startapp = () => {
    const token = localStorage.getItem('jwtToken');

    customAxios.get("/member/info", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      })
  };

  return (
    <div className={common.container}>
      <h1 className={classes.title}>환영합니다!</h1>
      <div>
        <p>타인과 당신의 취향에 대해
          <br />
          부담없이 이야기를 나눌 수 있어요!
        </p>
      </div>
      <div>
        <img src="img/confetti.gif" alt='confetti' />
      </div>
      <div>
        <button onClick={startapp} className={common.next}>시작하기</button>
      </div>
    </div>
  );
}
export default Welcome;