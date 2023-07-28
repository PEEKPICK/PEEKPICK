import React,{useState} from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
const Profile = (props) => {
  const [emoji,setEmoji] = useState("");
  const [emojiId,setEmojiId] = useState("");
  const changeImg=()=>{
  axios.get("http://192.168.31.26:8081/member/emoji")
  .then((response)=>{
    console.log(response)
    setEmoji(response.data.data.imageUrl)
    setEmojiId(response.data.data.emojiId)
  })
}
const emojiIdSave = {
  emojiId : {emojiId}
}
const ImgChangePut = () => {
  axios.put("", {emojiIdSave})
  .then((response) => {
    console.log(response)
  })
  .catch((response)=>{
    console.log(response)
  })
}
  return (
    <div>
      <div>
        <h1>프로필 변경</h1>
        {/* 클릭시 마이페이지로 이동하는 x 버튼 */}
      <Link to={"/mypage"}>
        <img src="img/cancel.png" alt="" />
      </Link>
      </div>
      <hr />
      <div>
        {/* 백에서 전달하는 이모지 */}
        <img src={emoji} alt="" />
        {/* 클릭시 백에서 이모지 전달 버튼 */}
        <div onClick={changeImg}>
          <h4>다시 뽑기</h4>
        </div>
      </div>
      {/* 다시 뽑기 한번이상 클릭시 선택완료 버튼 색상 on */}
      {/* 클릭시 props로 이모지 마이페이지로 전달 */}
      <div onClick={ImgChangePut}>
        <h4>선택 완료</h4>
      </div>
    </div>
  );
}

export default Profile;