import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { customAxios } from '../../api/customAxios';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/authSlice';
import classes from './profile.module.css';
const Profile = (props) => {
  // 상태 관리

  const dispatch = useDispatch();
  const userInfo = useSelector(state => state.auth);
  const [emojiId, setEmojiId] = useState("");
  const [emojiUrl, setEmojiUrl] = useState(userInfo.emojiUrl);
  const [emojiCheck, setEmojiCheck] = useState(false);

  const navigate  =useNavigate();

  // API 요청
  const changeImg = () => {
    customAxios.get("/member/emoji")
      .then((response) => {
        console.log(response)
        // 이런 식으로 한 이유는 새로고침을 하고 프로필 편집을 들어가면,
        // store에 이미지가 없기 때문에, 삼항연산자로 두가지 방식을 필요할 때마다 사용으로
        // 해결
        setEmojiId(response.data.data.emojiId)
        setEmojiUrl(response.data.data.imageUrl)
        setEmojiCheck(true)
      })
    }
    const moveToMyPage = ()=>{
      navigate('/mypage');
    }
    const ImgChangePut = () => {
      customAxios.put("/member/info/emoji", { emojiId })
      .then((response) => {
        // 콘솔
        console.log(emojiUrl)
        console.log(response)
        // 리덕스에 정보 저장을 위한 데이터 생성
        const sendToMyPageData = {
          emojiUrl: emojiUrl,
        }
        const sendToProfile = {
          emojiId: emojiId,
        }
        // 리덕스의 action을 통해 데이터 변경
        dispatch(authActions.updateMyPageProfile(sendToMyPageData))
        dispatch(authActions.updateProfile(sendToProfile))
        navigate('/mypage');
      })
      .catch((response) => {
        console.log(response)
      })
  }

  return (
    <div className={classes.profile}>
      <div className={classes.profiletop}>
        <h1>프로필 변경</h1>
        {/* 클릭시 마이페이지로 이동하는 x 버튼 */}
          <img src="img/cancel.png" alt="" onClick={moveToMyPage}/>
      </div>
      <hr className={classes.hr} />
      <div className={classes.emoji}>
        {/* 백에서 전달하는 이모지 */}
        {emojiCheck ? <img src={emojiUrl} alt="" /> : <img src={userInfo.emojiUrl} alt="" />}
        {/* 클릭시 백에서 이모지 전달 버튼 */}
      </div>
      <div onClick={changeImg} className={classes.return}>
        <h4>다시 뽑기</h4>
      </div>
      {/* 다시 뽑기 한번이상 클릭시 선택완료 버튼 색상 on */}
      {/* 클릭시 props로 이모지 마이페이지로 전달 */}
      {emojiCheck ?
        <div onClick={ImgChangePut} className={classes.completeon}>
          <h4>선택 완료</h4>
        </div>
        :
        <div onClick={ImgChangePut} className={classes.complete}>
          <h4>선택 완료</h4>
        </div>}

    </div>
  );
}

export default Profile;