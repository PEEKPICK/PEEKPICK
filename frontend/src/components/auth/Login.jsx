import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';

// import { authActions } from '../../store/authSlice';
import classes from './style/Login.module.css';

const Login = () => {
  const dispatch = useDispatch();

  const kakao = () => {
    axios.get('http://192.168.31.26:8081/member/emoji')
      .then(response => {
        // dispatch(authActions.updateProfile);
        console.log(response.data);
      })
      .catch(error => {
        console.log(error)
      })
  };

  const naver = () => {
    console.log('naver')
  };

  const google = () => {
    console.log('google')
  };

  useEffect(() => {
    kakao();
    naver();
    google();
  }, [])
;
  return (
    <div className={classes.container}>
      <div className={classes.buttons}>
        <button onClick={kakao}>카카오 로그인</button>
        <button onClick={naver}>네이버 로그인</button>
        <button onClick={google}>구글 로그인</button>
      </div>
    </div>
  );
}
export default Login;