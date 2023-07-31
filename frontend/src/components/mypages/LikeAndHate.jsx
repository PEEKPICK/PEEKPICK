import React from 'react';

const LikeAndHate = () => {
  // 리덕스와 백에 있는 거 array 형식으로 저장한다음 for 문을 이용해 div 만들기
  // axios put 요청 추가
  
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