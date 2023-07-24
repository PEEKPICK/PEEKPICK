import ProfilePick from './ProfilePick';
import { Link } from 'react-router-dom';

import classes from './SignUp.module.css'

const SignUp = () => {
  return (
    <div>
      <h1>회원가입</h1>
      <p>회원 정보를 확인해주세요</p>
      <form className={classes.formStyle}>
        <input type="text" name="email" className={classes.box} />
        <input type="text" name="name" className={classes.box} />
        <input type="text" name="phone" className={classes.box} />
        <input type="text" name="birth" className={classes.box} />
        <Link to="./ProfilePick.jsx">다음으로</Link>
      </form>
    </div>
  );
};

export default SignUp;