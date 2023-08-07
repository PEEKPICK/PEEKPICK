import React from 'react';
import classes from './PickandLike.module.css';
// import { customAxios } from '../../api/customAxios';
const PickAndLike = (prop) => {
  
  return (
    <div className={classes.checkpick}>
        <div className={classes.pick}>
          {/* 가져온 정보 {} 안에 넣기 */}
          <span>PICK {prop.pickPoint} 회</span>
          {/* PICK과 Like 사이 가로막 */}
        </div>
          <hr className={classes.hr}/>
        <div className={classes.peek}>
          {/* 따봉 이미지 */}
          <img src="img/goodFill.png" alt="" className={classes.img} />
          {/* 가져온 정보 {} 안에 넣기 */}
          <span>{prop.likeCount} 회</span>
        </div>
    </div>
  );
}

export default PickAndLike;