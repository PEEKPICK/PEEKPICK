import React from 'react';
import classes from './LikeAndHate.module.css';
import { Link } from 'react-router-dom';

const LikeAndHate = ({ ModalOutSide, likes, disLikes }) => {
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
    <div className={classes.center}>
      {{ likes }.length === 0 ? (
        <></>
        ) : (
          <div className={classes.itemWrap}>
          {likes.map((item, index) => (
            <div
            key={index}
            className={classes.items}
            >
              #{item}
            </div>
          ))}
        </div>
      )}
      </div>

      <div className={classes.likehate}>
        <span>싫어하는 것</span>
        {/* 싫어요 수정 components */}
        <Link to={ModalOutSide ? null : "/hateedit"}>
          <button >수정</button>
        </Link>
      </div>
      {{ disLikes }.length === 0 ? (
        <></>
      ) : (
        <div className={classes.itemWrap}>
          {disLikes.map((item, index) => (
            <div
              key={index}
              className={classes.items}
            >
              #{item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default LikeAndHate;