import axios from 'axios';
import { useDispatch } from 'react-redux';

import classes from './style/Login.module.css';

const Login = () => {
  const dispatch = useDispatch();

  const kakao = () => {
    axios.get('https://jsonplaceholder.typicode.com/todos/1')
      .then(response => {
        dispatch();
        console.log(response.data)
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