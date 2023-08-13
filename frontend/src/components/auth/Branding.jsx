import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import common from './style/Common.module.css';
import classes from './style/Branding.module.css';

const Branding = () => {
  const [checkIMG, setCheckIMG] = useState(1);

  const navigate = useNavigate();

  const moveToLogin = () => {
    navigate('/');
  };

  return (
    <div className={common.side}>
      <div className={classes.container}>
        <div>
          <img
            src={`img/branding_${checkIMG}.svg`}
            alt="branding"
          />
        </div>
        {checkIMG !== 3 ? (
          <div>
            <button onClick={() => setCheckIMG(checkIMG + 1)}>다음으로</button>
          </div>
        ) : (
          <div>
            <button onClick={() => moveToLogin()}>함께하기</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Branding;