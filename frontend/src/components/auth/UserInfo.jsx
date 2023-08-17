import { authAxios } from '../../api/customAxios';

import Modal from './Modal';

import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import { authActions } from '../../store/authSlice';
import classes from './style/UserInfo.module.css';
import common from './style/Common.module.css';

const UserInfo = () => {
  // 바꿀 store 선택
  const userInfo = useSelector(state => state.auth);

  // 상태관리
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState('M');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [showModal, setShowModal] = useState(false);

  // redux, router 설정
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // 자동하이픈을 위한 useRef함수
  const phoneRef = useRef();
  const birthRef = useRef();

  // axios 통신으로 유저 정보 불러오기
  useEffect(() => {
    // 쿼리 파라미터에서 유저 id 가져오기
    const urlParams = new URLSearchParams(window.location.search);
    const value = urlParams.get("id");

    // axios 통신
    authAxios.get(`/member/signup/info?id=${value}`)
      .then(response => {
        const userData = response.data.data;

        // store에 dispatch
        dispatch(authActions.updateUserInfo({
          memberId: value,
          name: userData.name,
          email: userData.email,
          phone: userData.phone,
          birthday: userData.birthday,
          gender: userData.gender,
        }));

        // 상태 갱신
        setUsername(userData.name);
        setEmail(userData.email);
        setPhone(userData.phone);
        setBirthday(userData.birthday);
      })
      .catch(error => {
        console.log(error);
      })
  }, [dispatch])

  // 이름 작성 시 상태관리
  const changeUsernameHandler = (e) => {
    setUsername(e.target.value)
  };

  // 이름이 있다면 이름을 표시하고 없다면 input창
  const nameIsValid = () => {
    if (userInfo.name) {
      return (
        <div>
          {username}
        </div>
      );
    } else {
      return (
        <input
          type="text"
          name="username"
          placeholder="이름 (ex. 홍길동)"
          onChange={changeUsernameHandler}
        />
      );
    }
  };

  // 이메일 작성 시 상태관리
  const changeEmailHandler = (e) => {
    setEmail(e.target.value)
  };

  // 이메일이 있다면 이메일을 표시하고 없다면 input창
  const emailIsValid = () => {
    if (userInfo.email) {
      return (
        <div>
          {email}
        </div>
      );
    } else {
      return (
        <input
          type="text"
          name="useremail"
          placeholder="이메일 (ex. example@example.com)"
          onChange={changeEmailHandler}
        />
      );
    }
  }

  // 휴대폰 번호 자동 하이픈 생성 함수 + 상태관리
  const autoHypenPhone = (e) => {
    const value = phoneRef.current.value.replace(/\D+/g, "");
    const phoneLength = 11;

    let result;
    result = "";

    for (let i = 0; i < value.length && i < phoneLength; i++) {
      switch (i) {
        case 3:
          result += "-";
          break;
        case 7:
          result += "-";
          break;
        default:
          break;
      }

      result += value[i];
    }

    phoneRef.current.value = result;
    setPhone(e.target.value)
  };

  // 휴대폰 번호가 있다면 있는 것으로 처리하고 아니면 input창 보여줌
  const phoneIsValid = () => {
    return (
      <input
        type="tel"
        name="user-phone"
        ref={phoneRef}
        placeholder="(선택) 전화번호(ex. 010-1234-5678)"
        onChange={autoHypenPhone}
      />
    );
  };

  // 생년월일 자동 하이픈 생성 함수 + 상태관리
  const autoHypenBirth = (e) => {
    const value = birthRef.current.value.replace(/\D+/g, "");
    const birthLength = 8;

    let result;
    result = "";

    for (let i = 0; i < value.length && i < birthLength; i++) {
      switch (i) {
        case 4:
          result += "-";
          break;
        case 6:
          result += "-";
          break;
        default:
          break;
      }

      result += value[i];
    }

    birthRef.current.value = result;
    setBirthday(e.target.value)
  };

  // 생일이 있으면 있는거 보여주고, 없으면 input 보여줌
  const birthdayIsValid = () => {
    if (userInfo.birthday) {
      return (
        <>
          {birthday}
        </>
      );
    } else {
      return (
        <input
          type="text"
          name="birth"
          ref={birthRef}
          placeholder="생년월일 (ex. 1998-06-28)"
          onChange={autoHypenBirth}
        />
      );
    }
  };

  // 모달검사 함수 (하나라도 정보가 없다면 모달을 보여줌)
  const isAnyFieldEmpty = () => {
    return !(username && email && birthday);
  };

  // 모달종료 함수
  const closeModal = () => {
    setShowModal(false);
  };

  // 다음으로 이동하는 함수 (정보 갱신, 다음으로 이동)
  const moveToUserProfile = () => {
    if (isAnyFieldEmpty()) {
      setShowModal(true);
    } else {
      const changedUserData = {
        memberId: userInfo.memberId,
        name: username,
        email: email,
        phone: phone,
        birthday: birthday,
        gender: gender,
      }
      dispatch(authActions.updateUserInfo(changedUserData));
      navigate('/userprofile')
    }
  };

  return (
    <div className={common.side}>
      <div className={common.container}>
        <div>
          <h1>회원가입</h1>
        </div>
        <div className={classes.span}>
          <span>회원 정보를 확인해주세요</span>
        </div>
        <div>
          <form className={classes.formInfo}>
            <div className={classes.box}>
              {nameIsValid()}
            </div>
            <div className={classes.box}>
              {emailIsValid()}
            </div>
            <div className={classes.box}>
              {phoneIsValid()}
            </div>
            <div className={classes.box}>
              {birthdayIsValid()}
            </div>
            <div className={classes.switch}>
              <input type="radio" id="radio-one" name="switch-one" value="M" checked={gender === 'M'} onChange={() => setGender('M')} />
              <label htmlFor="radio-one">남자</label>
              <input type="radio" id="radio-two" name="switch-one" value="F" checked={gender === 'F'} onChange={() => setGender('F')} />
              <label htmlFor="radio-two">여자</label>
            </div>
            <input type="button" value="다음으로" onClick={moveToUserProfile} className={common.next} />
          </form>
        </div>
        {showModal && <Modal onClose={closeModal} check={2} />}
      </div>
    </div>
  );
}
export default UserInfo;