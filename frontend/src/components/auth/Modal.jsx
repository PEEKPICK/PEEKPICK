// 5개 초과 모달
const Modal = ({ onClose }) => {
  return (
    <div>
      <button onClick={onClose}>X</button>
      <div>
        <h2>최대 5개 선택이 가능합니다.</h2>
      </div>
    </div>
  );
};

export default Modal;