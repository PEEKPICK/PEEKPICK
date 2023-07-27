import React from 'react';

const ProfileImg = (props) => {
  return (
    <div>
      <div>
        <h1>프로필 변경</h1>
        {/* 클릭시 마이페이지로 이동하는 x 버튼 */}
        <img src="img/cancel.png" alt="" />
      </div>
      <hr />
      <div>
        {/* 백에서 전달하는 이모지 */}
        <img src="" alt="" />
        {/* 클릭시 백에서 이모지 전달 버튼 */}
        <div>
          <h4>다시 뽑기</h4>
        </div>
      </div>
      {/* 다시 뽑기 한번이상 클릭시 선택완료 버튼 색상 on */}
      {/* 클릭시 props로 이모지 마이페이지로 전달 */}
      <div>
        <h4>선택 완료</h4>
      </div>
    </div>
  );
}

export default ProfileImg;