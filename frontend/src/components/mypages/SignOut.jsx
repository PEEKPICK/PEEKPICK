import React from 'react';

const SingOut = () => {
  return (
    <div>
      {/* 모달창 */}
      <div>
        <h3>CAUTION</h3>
        {/* x 버튼 click 시 회원 탈퇴 화면 종료 */}
        <img src="" alt="" />
      </div>
      <hr />
      <div>
        <p>
          회원 탈퇴 어쩌구 저쩌구 모든 정보가 삭제 어쩌구
        </p>
        <input type="checkbox" />
        {/* 체크박스 활성화시 회원탈퇴 버튼 색 활성화 */}
        <p>위 유의사항을 모두 확인하였고, 탈퇴를 진행합니다.</p>
      </div>
      {/* 색깔 변화 넣어야함 */}
      <div>
        {/* 클릭 시 DB 계정 정보 삭제 */}
        <h4>회원탈퇴</h4>
      </div>
    </div>
  );
}

export default SingOut;