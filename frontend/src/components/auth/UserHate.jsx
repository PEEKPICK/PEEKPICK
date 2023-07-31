import { customAxios } from '../../api/customAxios';

import Modal from './Modal';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { authActions } from '../../store/authSlice';
import common from './style/Common.module.css';

const UserHate = () => {
  // 상태관리
  // dataAxios, middleDataAxios - 결과값, 오류값 판단을 위한 flag
  const [dataAxios, setDataAxios] = useState(false);
  const [middleDataAxios, setMiddleDataAxios] = useState(false);
  // modal 판단을 위한 flag
  const [modalOpen, setModalOpen] = useState(false);
  // likeList, middleLikeList는 대분류, 중분류 표시
  const [likeList, setLikeList] = useState([]);
  const [middleLikeList, setMiddleLikeList] = useState([]);
  // tempMiddleList - 백엔드 전송을 위한 중분류 id
  const [tempMiddleList, setTempMiddleList] = useState([]);
  // middleItem - UserLikeHate에 표시할 중분류 이름
  const [middleItem, setMiddleItem] = useState([]);

  // 기본 함수 설정
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // axios 통신 (대분류 가져오기)
  useEffect(() => {
    customAxios.get('/member/taste')
      .then(response => {
        console.log(response.data)
        setDataAxios(true);
        setLikeList(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  // 중분류 뽑아오는 함수
  const middleItemHandler = (item) => {
    customAxios.get(`/member/taste?category_large=${item}`)
      .then(response => {
        console.log(response.data)
        setMiddleDataAxios(true);
        setMiddleLikeList(response.data.data);
      })
      .catch(error=> {
        console.log(error);
      })
  }

  // 중분류 선택 시, 5개 여부 파악 및 리스트에 추가
  const middleListCheck = (categoryId, middle) => {
    if (!tempMiddleList.includes(categoryId)) {
      if (tempMiddleList.length < 5) {
        setTempMiddleList((prevList) => [...prevList, categoryId])
        setMiddleItem((prevItem) => [...prevItem, middle])
      } else {
        setModalOpen(true);
      }
    } else {
      setTempMiddleList((prevList) => prevList.filter(item => item !== categoryId))
      setMiddleItem((prevItem) => prevItem.filter(item => item !== middle))
    }
  };

  // 모달창 종료
  const closeModal = () => {
    setModalOpen(false);
  };

  const selectedFinish = () => {
    const changedLikes = {
      dislikes: tempMiddleList,
      hate: middleItem,
    }
    dispatch(authActions.updateUserHate(changedLikes))
    navigate('/userlikehate');
  };

  return (
    <div>
      <div>
        <div>
          <h1>좋아해요</h1>
        </div>
        <div>
          <p>(최대 5개 선택 가능)</p>
        </div>
      </div>
      <div className={common.line}></div>
      <div>
        {dataAxios ? (
          <ul>
            {likeList.map(item => (
              <button key={item} onClick={() => middleItemHandler(item)}>{item}</button>
            ))}
          </ul>
        ) : (<p>대분류가 없습니다.</p>)}
      </div>
      <div>
        {middleDataAxios ? (
          <ul>
            {middleLikeList.map(middleItem => (
              <button key={middleItem.categoryId} onClick={() => middleListCheck(middleItem.categoryId, middleItem.middle)}>{middleItem.middle}</button>
            ))}
          </ul>
        ) : (<p>중분류가 없습니다.</p>)}
      </div>
      <div>
        {modalOpen && <Modal onClose={closeModal} />}
      </div>
      <div>
        <button onClick={selectedFinish}>선택완료</button>
      </div>
    </div>
  );
}
export default UserHate;