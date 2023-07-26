// useNavigate는 다른 js파일로 이동할 때 사용
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  // navigate 함수 사용
  const navigate = useNavigate();

  // startapp 클릭 시 메인페이지(피커찾기)로 이동
  const startapp = () => {
    navigate("/");
  };

  return (
    <div>
      <h1>환영합니다!</h1>
      <div>
        <p>타인과 당신의 취향에 대해 부담없이 이야기를 나눌 수 있어요!</p>
      </div>
      <div>
        <img src="img/confetti.gif" alt='confetti' />
      </div>
      <div>
        <button onClick={startapp}>시작하기</button>
      </div>
    </div>
  );
}
export default Welcome;