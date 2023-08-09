import { useState } from 'react';
import { authAxios } from '../../api/customAxios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';

import classes from './style/Login.module.css';

const Login = () => {
  // 테스트용 상태 관리
  const [tester, setTester] = useState(1);
  const navigate = useNavigate();

  const loginHandler = (service) => {
    console.log(service)
    window.location.href = `https://i9b309.p.ssafy.io/api/oauth2/authorization/${service}`;
  };

  // 테스트 버튼
  const test = (id) => {
    authAxios.post(`/member/login?id=test${id}`)
      .then(response => {
        if (response.data.code === '200') {
          const token = response.data.data
          localStorage.setItem("jwtToken", token);
          window.location.replace("/")
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  const testSignUp = () => {
    navigate("/userinfo")
  }

  return (
    <div className={classes.container}>
      <img
        src="img/temp_background.png"
        alt="background"
        className={classes.background}
      />
      <div className={classes.buttons}>
        {/* 이미지로 변경 예정 */}
        {/* 테스트 버튼 */}
        <input type="text" placeholder='숫자를 입력하세요' onChange={e => setTester(e.target.value)} />
        <button onClick={() => test(tester)}>테스트 버튼</button>
        <button onClick={() => testSignUp()}>테스트 회원가입</button>
        {/* 테스트 버튼 */}
        <img
          src="img/kakao_login.png" 
          alt="kakao" 
          href="https://i9b309.p.ssafy.io/api/oauth2/authorization/kakao" />
        {/* <img src="img/naver_login.png" alt="naver" onClick={() => loginHandler('naver')} /> */}
        <img src="img/naver_login.png" alt="naver" onClick={() => toast.error('개발 중인 서비스입니다.')} />
        <img src="img/google_login.png" alt="google" onClick={() => loginHandler('google')} />
      </div>
    </div>
  );
}

export default Login;
