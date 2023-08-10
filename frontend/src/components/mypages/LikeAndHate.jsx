import React from 'react';
import classes from './LikeAndHate.module.css';
import { useNavigate } from 'react-router-dom';

const LikeAndHate = ({ ModalOutSide, like, hate, likes, hates }) => {
  const navigate = useNavigate();

  // 리덕스와 백에 있는 데이터를 array 형식으로 저장한 다음 for 문을 이용해 div를 생성하는 코드가 있을 것입니다.
  // 또한, axios put 요청을 추가해야 할 수도 있습니다.

  const handleLikeEdit = () => {
    navigate('/likeedit');
  };

  const handleHateEdit = () => {
    navigate('/hateedit');
  };

  return (
    <div>
      <img src="" alt="" />
      <div className={classes.likehate}>
        <span>좋아하는 것</span>
        {/* 좋아요 수정 컴포넌트 */}
        {!ModalOutSide ? (
          <button onClick={handleLikeEdit}>수정</button>
        ) : (
          <button>수정</button>
        )}
      </div>
      <div>
        {{ like }.length === 0 ? (
          <></>
        ) : (
          <div className={classes.itemWrap}>
            {like.map((item, index) => (
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
        {/* 싫어요 수정 컴포넌트 */}
        {!ModalOutSide ? (
          <button onClick={handleHateEdit}>수정</button>
        ) : (
          <button>수정</button>
        )}
      </div>
      {
        { hate }.length === 0 ? (
          <></>
        ) : (
          <div className={classes.itemWrap}>
            {hate.map((item, index) => (
              <div
                key={index}
                className={classes.items}
              >
                #{item}
              </div>
            ))}
          </div>
        )
      }
    </div >
  );
};

export default LikeAndHate;