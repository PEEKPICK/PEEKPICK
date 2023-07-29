import axios from 'axios';
import Modal from './Modal';

import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { authActions } from '../../store/authSlice';
import common from './style/Common.module.css';

const UserHate = () => {
  // 상태관리
  const [dataAxios, setDataAxios] = useState(false);
  const [middleDataAxios, setMiddleDataAxios] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [likeList, setLikeList] = useState([]);
  const [middleLikeList, setMiddleLikeList] = useState([]);
  const [tempMiddleList, setTempMiddleList] = useState([]);
  const [middleItem, setMiddleItem] = useState([]);

  // 기본 함수 설정
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // axios 통신 (대분류 가져오기)
  useEffect(() => {
    axios.get('http://172.30.1.11:8081/member/taste')
      .then(response => {
        setDataAxios(true);
        setLikeList(response.data.data)
      })
      .catch(error => {
        console.log(error)
      })
  }, [])

  // 중분류 뽑아오는 함수
  const middleItemHandler = (item) => {
    axios.get(`http://172.30.1.11:8081/member/taste?category_large=${item}`)
      .then(response => {
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
    dispatch(authActions.updateUserLike(changedLikes))
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