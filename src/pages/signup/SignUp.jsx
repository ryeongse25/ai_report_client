import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import './SignUp.css';

function Signup() {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [idMessage, setIdMessage] = useState('');
  const [email, setEmail] = useState('');
  const [authNumVisible, setAuthNumVisible] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authNum, setAuthNum] = useState('');

  // id 중복검사
  useEffect(() => {
    if (id) {
      checkIdAvailability(id);
    } else {
      setIdMessage('');
    }
  }, [id]);

  const checkIdAvailability = async (id) => {
    try {
      const response = await axios.post('/', { id }); // api 주소
      if (response.data.isAvailable) {
        setIdMessage('사용 가능한 아이디입니다');
      } else {
        setIdMessage('중복된 아이디입니다');
      }
    } catch (error) {
      console.error('Error checking ID availability:', error);
      setIdMessage('아이디 중복 검사에 실패했습니다');
    }
  };

  // email 유효성 검사
  const checkEmailAvailability = async (email) => {
    try {
      const response = await axios.post('/', { email }); // api 주소
      if (response.data.isAvailable) {
        Swal.fire({
          icon: 'success',
          title: '인증번호가 발송되었습니다',
          showConfirmButton: false,
          timer: 2000
        });
        setAuthNumVisible(true);
      } else {
        Swal.fire({
          icon: 'error',
          title: '이미 가입된 이메일입니다',
          showConfirmButton: false,
          timer: 2000
        });
      }
    } catch (error) {
      console.error('Error checking email availability:', error);
      Swal.fire({
        icon: 'error',
        title: '이메일 중복 검사에 실패했습니다',
        showConfirmButton: false,
        timer: 2000
      });
    }
  };

  // email 인증번호 확인
  const handleAuthNumCheck = async () => {
    try {
      const response = await axios.post('/', { email, authNum }); // api 주소
      if (response.data.isValid) {
        Swal.fire({
          icon: 'success',
          title: '인증번호가 확인되었습니다',
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '인증번호가 올바르지 않습니다',
          showConfirmButton: true
        });
      }
    } catch (error) {
      console.error('Error checking auth number:', error);
      Swal.fire({
        icon: 'error',
        title: '인증번호 확인에 실패했습니다',
        showConfirmButton: true
      });
    }
  };
   
  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAuthButtonClick = () => {
    checkEmailAvailability(email);
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handleAuthNumChange = (e) => {
    setAuthNum(e.target.value);
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !id || !password || !confirmPassword || !email || !authNum) {
      Swal.fire({
        icon: 'warning',
        title: '모든 정보를 입력해주세요',
        showConfirmButton: true,
        timer: 2000
      });
      return;
    }

    // 비밀번호 재확인
    if (password !== confirmPassword) {
      Swal.fire({
        icon: 'error',
        title: '비밀번호가 일치하지 않습니다',
        showConfirmButton: true,
        timer: 2000
      });
      return;
    }

    try {
      const response = await axios.post('/', { name, id, password, email, authNum }); // api 주소
      if (response.data.success) {
        Swal.fire({
          icon: 'success',
          title: '회원가입에 성공했습니다',
          showConfirmButton: true
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: '회원가입에 실패했습니다',
          text: response.data.message,
          showConfirmButton: true
        });
      }
    } catch (error) {
      console.error('Error during signup:', error);
      Swal.fire({
        icon: 'error',
        title: '회원가입 중 오류가 발생했습니다',
        showConfirmButton: true
      });
    }
  };

  return (
    <div className="signupContainer">
      <video autoPlay muted loop id="background-video">
        <source src="/videos/firetruck.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="backContainer">
        <div className="formWrapper">
          <div className="title">회원가입</div>
          <div className="formContainer">
            <form className="form" onSubmit={handleSubmit}>
              <div className="inlineFieldContainer">
                <div className="fieldContainer">
                  <label className="label" htmlFor="name">name</label>
                  <input className="input" type="text" id="name" placeholder="이름" value={name} onChange={handleNameChange} required />
                </div>
                <div className="fieldContainer">
                  <label className="label" htmlFor="id">id</label>
                  <input 
                    className="input" 
                    type="text" 
                    id="id" 
                    placeholder="아이디"
                    onChange={handleIdChange} 
                    required 
                  />
                  <div className='message'>{idMessage}</div>
                </div>
              </div>
              <div className="fieldContainer">
                <label className="label" htmlFor="password">pw</label>
                <input className="input" type="password" id="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} required />
                <input className="input" type="password" id="confirm-password" placeholder="비밀번호 재확인" value={confirmPassword} onChange={handleConfirmPasswordChange} required />
              </div>
              <div className="fieldContainer">
                <label className="label" htmlFor="email">e-mail</label>
                <div className="authButtonContainer">
                  <input 
                    className="authInput" 
                    type="text" 
                    id="email" 
                    placeholder="이메일" 
                    onChange={handleEmailChange} 
                    required 
                  />
                  <button type="button" className="authButton" onClick={handleAuthButtonClick}>인증</button>
                </div>
                {authNumVisible && (
                  <div className="authNumContainer">
                    <input className="authNum" type="text" id="text" placeholder="인증번호" value={authNum} onChange={handleAuthNumChange} required />
                    <button type="button" className="authNumButton" onClick={handleAuthNumCheck}>확인</button>
                  </div>
                )}
              </div>
            </form>
          </div>
          <button type="submit" className="button">가입하기</button>
        </div>
      </div>
    </div>
  );
}

export default Signup;
