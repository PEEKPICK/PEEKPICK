import React from 'react';

const LikeAndHate = () => {
  return (
    <div>
      <h3>좋아하는 것</h3>
      {/* 좋아요 수정 components */}
      <div>
        <p>수정</p>
      </div>
      <div>
        {/* 여기는 본인이 선택한 취향 components */}
      </div>
      <h3>싫어하는 것</h3>
      {/* 싫어요 수정 components */}
      <div>
        <p>수정</p>
      </div>
      <div>
        {/* 여기는 본인이 선택한 취향 componenets */}
      </div>
    </div>
  );
}

export default LikeAndHate;