// useNavigate는 다른 js파일로 이동할 때 사용
import { authAxios } from '../../api/customAxios';

import common from './style/Common.module.css';
import classes from './style/Welcome.module.css';

const Welcome = () => {
  // 토큰 인증 함수
  const startapp = () => {
    const token = localStorage.getItem('jwtToken')
    authAxios.get("/member/info", {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        console.log(response.data)
        if (response.data.code === "200") {
          window.location.replace("/");
        }
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
        <img src="img/confetti.gif" alt='confetti' className={classes.confetti} />
      </div>
      <div>
        <button onClick={startapp} className={common.next}>시작하기</button>
      </div>
    </div>
  );
}
export default Welcome;