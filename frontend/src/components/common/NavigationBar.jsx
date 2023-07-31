import React, { useState } from 'react';
import ChartAlert from './ChatAlert';
import { Link } from 'react-router-dom';
import classes from './NavigationBar.module.css';
const NavigationBar = () => {
  const [picky, setPicky] = useState(false);
  const [picker, setPicker] = useState(true);
  const [mypage, setMypage] = useState(false);

  const pickyClick = () => {
    setPicky(true);
    setPicker(false);
    setMypage(false);
  }
  const pickerClick = () => {
    setPicky(false);
    setPicker(true);
    setMypage(false);
  }
  const mypageClick = () => {
    setPicky(false);
    setPicker(false);
    setMypage(true);
  }
  return (
    <div className={classes.basic}>
      <div>
        {/* 알림 올경우 생성되는 알림창 components */}
        <ChartAlert></ChartAlert>
      </div>

      {/* 개별적으로 클릭시 그쪽 색상 들어오게 div css 설정 잘하기 */}
      <nav className={classes.navi}>
        {picky ? <Link to="picky" className={classes.self}>
          <div onClick={pickyClick} >
            {/* <img src="img/heartBlack.png" alt="" /> */}
            <img src="img/heartWhite.png" alt="" />
            <p>이슈</p>
          </div>
        </Link> :
          <Link to="picky" className={classes.selfs}>
            <div onClick={pickyClick}>
              <img src="img/heartBlack.png" alt="" />
              {/* <img src="img/heartWhite.png" alt="" /> */}
              <p>이슈</p>
            </div>
          </Link>}
        {picker ? <Link to={""} className={classes.self}>
          <div onClick={pickerClick}>
            {/* <img src="img/finderBlack.png" alt="" /> */}
            <img src="img/finderWhite.png" alt="" />
            <p>사람</p>
          </div>
        </Link> :
          <Link to={""} className={classes.selfs}>
            <div onClick={pickerClick}>
              <img src="img/finderBlack.png" alt="" />
              {/* <img src="img/finderWhite.png" alt="" /> */}
              <p>사람</p>
            </div>
          </Link>}
        {mypage ? <Link to={"mypage"} className={classes.self}>
          <div onClick={mypageClick}>
            {/* <img src="img/mypageBlack.png" alt="" /> */}
            <img src="img/mypageWhite.png" alt="" />
            <p>프로필</p>
          </div>
        </Link> :
        <Link to={"mypage"} className={classes.selfs}>
        <div onClick={mypageClick}>
          <img src="img/mypageBlack.png" alt="" />
          {/* <img src="img/mypageWhite.png" alt="" /> */}
          <p>프로필</p>
        </div>
      </Link>}
      </nav>
    </div>
  );
}

export default NavigationBar;