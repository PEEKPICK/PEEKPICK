import React from 'react';

const LogOut = () => {
  return (
    <div>
      {/* 모달창 */}
      <div>
        <h3>CAUTION</h3>
        {/* x 버튼 click 시 로그아웃 화면 종료 */}
        <img src="" alt="" />
      </div>
      <hr />
      <div>
        <h4>로그아웃 하시겠습니까?</h4>

        {/* 클릭시 로그아웃 화면 종료 */}
        <div>
          <h4>싫어!</h4>
        </div>
        {/* 클릭시 로그아웃 */}
        <div>
          <h4>좋아!</h4>
        </div>
      </div>
    </div>
  );
}

export default LogOut;