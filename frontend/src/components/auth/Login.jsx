import { useState } from 'react';
import { customAxios } from '../../api/customAxios';
import { useNavigate } from 'react-router-dom';

import classes from './style/Login.module.css';

const Login = () => {
  // 테스트용 상태 관리
  const [tester, setTester] = useState(1);
  const navigate = useNavigate();

  const loginHandler = (service) => {
      window.location.href = `http://localhost:8081/oauth2/authorization/${service}`;
  };

  // 테스트 버튼
  const test = (id) => {
    const dummy = {
      id: 1,
      content: '더미입니다.'
    }

    customAxios.post(`/member/login?id=test${id}`, dummy)
      .then(response => {
        if (response.data.code === 200) {
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
      <div className={classes.buttons}>
        {/* 이미지로 변경 예정 */}
        {/* 테스트 버튼 */}
        <input type="text" onChange={e => setTester(e.target.value)} />
        <button onClick={() => test(tester)}>테스트 버튼</button>
        <button onClick={() => testSignUp()}>테스트 회원가입</button>
        {/* 테스트 버튼 */}
        <button onClick={() => loginHandler('kakao')}>카카오 로그인</button>
        <button onClick={() => loginHandler('naver')}>네이버 로그인</button>
        <button onClick={() => loginHandler('google')}>구글 로그인</button>
      </div>
    </div>
  );
}

export default Login;
