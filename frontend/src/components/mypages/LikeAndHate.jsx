import React from 'react';
import classes from './LikeAndHate.module.css';
import { Link } from 'react-router-dom';

const LikeAndHate = ({ ModalOutSide }) => {
  // 리덕스와 백에 있는 거 array 형식으로 저장한다음 for 문을 이용해 div 만들기
  // axios put 요청 추가
  return (
    <div>

      <img src="" alt="" />
      <div className={classes.likehate}>
        <span>좋아하는 것</span>
        {/* 좋아요 수정 components */}
        <Link to={ModalOutSide ? null : "/likeedit"}>
          <button>수정</button>
        </Link>
      </div >
      <div className={classes.list}>
        <span>
        </span>
      </div>

      <div className={classes.likehate}>
        <span>싫어하는 것</span>
        {/* 싫어요 수정 components */}
        <Link to={ModalOutSide ? null : "/hateedit"}>
          <button >수정</button>
        </Link>
      </div>
      <div>
        {/* 여기는 본인이 선택한 취향 componenets */}
      </div>
    </div>
  );
}

export default LikeAndHate;