import { useNavigate } from "react-router-dom";

import classes from "./style/UserLikeHate.module.css";

const UserLikeHate = () => {
  const navigate = useNavigate();

  const moveToUserLike = () => {
    navigate("/userlike");
  };

  const moveToUserHate = () => {
    navigate("/userhate");
  };

  const moveToWelcome = () => {
    navigate("/welcome");
  };

  return (
    <div>
      <div>
        <h1>취향 PICK</h1>
      </div>
      <div>
        <p>
          무엇을 좋아하시나요?
          <br />
          또, 무엇을 싫어하시나요?
        </p>
      </div>
      <div className={classes.line}></div>
      <div>
        <h3>좋아하는 것</h3>
        <button onClick={moveToUserLike}>+추가</button>
      </div>
      <div>
        <h3>싫어하는 것</h3>
        <button onClick={moveToUserHate}>+추가</button>
      </div>
      <div>
        <button onClick={moveToWelcome}>다음으로</button>
      </div>
    </div>
  );
};

export default UserLikeHate;
