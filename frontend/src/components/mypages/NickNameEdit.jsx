import React from 'react';

const NameEdit = (props) => {
  return (
    <div>
      {/* 모달창 */}
      <div>
        <h4>닉네임 변경</h4>
        {/* 클릭시 마이페이지 이동 */}
        <img src="" alt="" />
      </div>
      <div>
        <h4>타이틀</h4>
        {/* 형용사 버튼클릭시 input 안에 들어옴 변경 금지
                input 말고 div로 디자인 해야할지도? */}
        <input type="text" />
        {/* 클릭시 형용사 랜덤으로 백에서 뽑아오기 */}
        <img src="" alt="" />
      </div>
      <div>
        <h4>닉네임</h4>
        {/* 입력 받은 정보 props로 전달해야하기 때문에 이 부분 공부 */}
        <input type="text" />
      </div>
      <div>
        <h4>한 줄 소개</h4>
        {/* 이 부분도 닉네임과 타이틀 동일하게 잘 전달해야함! */}
        <input type="text" />
      </div>
      {/* 클릭시 props로 마이페이지에 값 전달 */}
      <div>
        <p>저장</p>
      </div>
    </div>
  );
}

export default NameEdit;