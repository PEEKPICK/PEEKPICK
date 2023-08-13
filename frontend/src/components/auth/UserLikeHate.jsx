import { authAxios } from '../../api/customAxios';

import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import common from './style/Common.module.css';
import classes from './style/UserLikeOrHate.module.css';

const UserLikeHate = () => {
  // 사용자 정보 불러오기
  const userInfo = useSelector(state => state.auth);

  // 함수 정의
  const navigate = useNavigate();

  // 좋아하는 것으로 이동
  const moveToUserLike = () => {
    navigate('/userlike')
  };

  // 싫어하는 것으로 이동
  const moveToUserHate = () => {
    navigate('/userhate')
  };

  // 백엔드로 정보 넘기고, welcome으로 이동
  const moveToWelcome = () => {
    if (userInfo.phone !== '1') {
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
      };

      authAxios.post('/member/signup', dataToSend)
        .then(response => {
          if (response.data.code === "201") {
            const accessToken = response.data.data;
            localStorage.setItem('jwtToken', accessToken);
          } else {
            console.log(response)
          }
        })
        .catch(error => {
          console.log(error)
        })
      navigate('/welcome');

    } else {
      const dataToSend = {
        memberId: userInfo.memberId,
        email: userInfo.email,
        name: userInfo.name,
        gender: userInfo.gender,
        phone: '010-0000-0000',
        birthday: userInfo.birthday,
        emojiId: userInfo.emojiId,
        prefixId: userInfo.prefixId,
        nickname: userInfo.nickname,
        likes: userInfo.likes,
        disLikes: userInfo.disLikes,
      };

      authAxios.post('/member/signup', dataToSend)
        .then(response => {
          if (response.data.code === "201") {
            const accessToken = response.data.data;
            localStorage.setItem('jwtToken', accessToken);
          } else {
            console.log(response)
          }
        })
        .catch(error => {
          console.log(error)
        })
      navigate('/welcome');
    }
  };

  return (
    <div className={common.side}>
      <div className={common.container}>
        <div className={common.title}>
          <h1>취향</h1>
          <h1 className={common.pointColor}>PICK</h1>
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
            <div className={common.itemWrap}>
              {userInfo.like.map((item, index) => (
                <div
                  key={index}
                  className={common.items}
                >
                  {item}
                </div>
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
          {userInfo.hate.length === 0 ? (
            <></>
          ) : (
            <div className={common.itemWrap}>
              {userInfo.hate.map((item, index) => (
                <div
                  key={index}
                  className={common.items}
                >
                  {item}
                </div>
              ))}
            </div>
          )}
        </div>
        <div>
          <button onClick={moveToWelcome} className={common.next}>다음으로</button>
        </div>
      </div>
    </div>
  );
};

export default UserLikeHate;