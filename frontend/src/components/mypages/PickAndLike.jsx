import React from 'react';
import classes from './PickandLike.module.css';
const PickAndLike = () => {
  // 얘는 리덕스에서 값 받아올듯?
  return (
    <div>
      <div className={classes.checkpick}>
        {/* 가져온 정보 {} 안에 넣기 */}
        <h2>PICK{ } 200회</h2>
        {/* PICK과 Like 사이 가로막 */}
        <img src="" alt="" />
        {/* 따봉 이미지 */}
        <img src="img/goodFill.png" alt="" className={classes.img}/>
        {/* 가져온 정보 {} 안에 넣기 */}
        <h2>{ }300회</h2>
      </div>
    </div>
  );
}

export default PickAndLike;