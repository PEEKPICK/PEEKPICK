import React from 'react';
import classes from './PickandLike.module.css';
const PickAndLike = () => {
  // 얘는 리덕스에서 값 받아올듯?
  return (
    <div className={classes.checkpick}>
        <div className={classes.pick}>
          {/* 가져온 정보 {} 안에 넣기 */}
          <span>PICK{ } 200회</span>
          {/* PICK과 Like 사이 가로막 */}
        </div>
        <div className={classes.peek}>
          <img src="" alt="" />
          {/* 따봉 이미지 */}
          <img src="img/goodFill.png" alt="" className={classes.img} />
          {/* 가져온 정보 {} 안에 넣기 */}
          <span>{ }300회</span>
        </div>
    </div>
  );
}

export default PickAndLike;