import { customAxios } from '../../api/customAxios';

import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import common from './style/Common.module.css';
import classes from './style/UserLikeOrHate.module.css';

const UserLikeHate = () => {
  // 페이지 렌더링 시
  const userInfo = useSelector(state => state.auth);

  useEffect(() => {
    console.log(userInfo)
  }, [userInfo]);

  // 함수 생성
  const navigate = useNavigate();

  // 함수 정의
  const moveToUserLike = () => {
    navigate('/userlike')
  }

  const moveToUserHate = () => {
    navigate('/userhate')
  }

  const moveToWelcome = () => {
    const dataToSend = {
      memberId: userInfo.memberId,
      email: userInfo.email,
      name: userInfo.name,
      gender: userInfo.gender,
      phone: userInfo.phone,
      birthday: userInfo.birthday,
      emojiId: userInfo.emojiId,
      prefixId: userInfo.prefixId,
      nickname: userInfo.nickname,
      likes: userInfo.likes,
      disLikes: userInfo.disLikes,
    }
  
    customAxios.post('/member/signup', dataToSend)
      .then(response => {
        if (response.data.code === "201") {
          const accessToken = response.data.data;
          localStorage.setItem('jwtToken', accessToken);
        } else {
          console.log(response)
        }
        console.log(response)
      })
      .catch(error => {
        console.log(error)
      })
    navigate('/welcome')
  }

  return (
    <div className={common.container}>
      <div style={{display:'flex'}}>
        <h1>취향</h1>
        <h1 style={{color:'purple'}}>PICK</h1>
      </div>
      <div>
        <p>
          무엇을 좋아하시나요?
          <br />
          또, 무엇을 싫어하시나요?
        </p>
      </div>
      <div className={common.linetag}>
        <div className={classes.line1}></div>
        <div className={classes.line2}></div>
      </div>
      <div className={classes.likehateWrap}>
        <div className={classes.buttonWrap}>
          <div>
            <h3>좋아하는 것</h3>
          </div>
          <div>
            <button onClick={moveToUserLike}>+추가</button>
          </div>
        </div>
        {userInfo.like.length === 0 ? (
          <></>
        ) : (
          <div>
            {userInfo.like.map(item => (
              <span className={common.items}>{item} x</span>
            ))}
          </div>
        )}
        
        <div className={`${classes.buttonWrap} ${classes.hate}`}>
          <div>
            <h3>싫어하는 것</h3>
          </div>
          <div>
            <button onClick={moveToUserHate}>+추가</button>
          </div>
        </div>
        <div>
            {userInfo.hate}
          </div>
      </div>
      <div>
        <button onClick={moveToWelcome} className={common.next}>다음으로</button>
      </div>
    </div>
  );
};

export default UserLikeHate;