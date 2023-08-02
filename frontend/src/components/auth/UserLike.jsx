import { customAxios } from '../../api/customAxios';

import Modal from './Modal';

import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import { authActions } from '../../store/authSlice';
import common from './style/Common.module.css';
import classes from './style/UserLike.module.css';

const UserLike = () => {
  // 중분류 정보 가져오기
  const userInfo = useSelector(state => state.auth);

  // 상태관리
  // dataAxios, middleDataAxios - 결과값, 오류값 판단을 위한 flag
  const [dataAxios, setDataAxios] = useState(false);
  const [middleDataAxios, setMiddleDataAxios] = useState(false);
  // modal 판단을 위한 flag
  const [modalOpen, setModalOpen] = useState(false);
  // likeList, middleLikeList는 대분류, 중분류 표시
  const [likeList, setLikeList] = useState([]);
  const [middleLikeList, setMiddleLikeList] = useState(userInfo.like);
  // tempMiddleList - 백엔드 전송을 위한 중분류 id
  const [tempMiddleList, setTempMiddleList] = useState(userInfo.likes);
  // middleItem - UserLikeHate에 표시할 중분류 이름
  const [middleItem, setMiddleItem] = useState(userInfo.like);

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
      likes: tempMiddleList,
      like: middleItem,
    }
    dispatch(authActions.updateUserLike(changedLikes))
    navigate('/userlikehate');
  };

  return (
    <div className={common.container}>
      <div>
        <div>
          <h1>좋아해요</h1>
        </div>
        <div>
          <p>(최대 5개 선택 가능)</p>
        </div>
      </div>
      <div className={common.defaultLine}></div>
      <div>
        {dataAxios ? (
          <div className={common.largelist}>
            {likeList.map(item => (
              <button
                key={item}
                onClick={() => middleItemHandler(item)}
                className={common.taste}
              >
                {item}
              </button>
            ))}
          </div>
        ) : (<p>에러가 발생했습니다.</p>)}
      </div>
      <div className={classes.middle}>
        {middleDataAxios ? (
          <div className={common.middlelist}>
            {middleLikeList.map(middleItem => (
              <button 
                key={middleItem.categoryId}
                onClick={() => middleListCheck(middleItem.categoryId, middleItem.middle)}
                className={common.taste}
              >
                {middleItem.middle}
              </button>
            ))}
          </div>
        ) : (
          <div className={classes.error}>
            <span>대분류를 선택해주세요!</span>
          </div>
        )}
      </div>
      <div>
        {modalOpen && <Modal onClose={closeModal} />}
      </div>
      <div>
        <button onClick={selectedFinish} className={common.next}>선택완료</button>
      </div>
    </div>
  );
}
export default UserLike;