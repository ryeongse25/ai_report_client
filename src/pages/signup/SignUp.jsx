import axios from 'axios';
import Swal from 'sweetalert2';
import React, { useState, useEffect } from 'react';
import { FullContainer, GoBackBtn } from '../../components/CommonStyles';
import './SignUp.css';

axios.defaults.withCredentials = true;
axios.defaults.xsrfCookieName = 'csrftoken';
axios.defaults.xsrfHeaderName = 'X-CSRFToken';

const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      let cookies = document.cookie.split(';');
      for (let i = 0; i < cookies.length; i++) {
          let cookie = cookies[i].trim();
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

function Signup() {
  const [id, setId] = useState('');
  const [idDuplicated, setIdDuplicated] = useState(false);

  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [authNumVisible, setAuthNumVisible] = useState(true);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [authNum, setAuthNum] = useState('');

  const onKeyDown = (e) => {
    if (e.key === ' ') e.preventDefault();
  }

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
   
  // 아이디 중복 검사
  const onIdChange = (e) => {
    setId(e.target.value);

    const csrftoken = getCookie('csrftoken');
    axios.post('http://localhost:8000/account/idcheck/', {'id': e.target.value}, {
      headers: {
        'X-CSRFToken': csrftoken
      }
    })
    .then((res) => {
      if (res.data.valid) setIdDuplicated(false);
      else setIdDuplicated(true);
    })
    .catch((error) => {
      console.log(error)
    })
  };

  const onNameChange = (e) => {
    setName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleAuthButtonClick = () => {
    checkEmailAvailability(email);
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

  useEffect(() => {
    axios.get('http://localhost:8000/account/signup/')
  }, [])

  return (
    <FullContainer>
      <div className="signupContainer">
        <video autoPlay muted loop id="background-video">
          <source src="/videos/firetruck.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <GoBackBtn />
        <div className="backContainer">
          <h4>회원가입</h4>
            <form onSubmit={handleSubmit}>
              <div>
                <div className="inlineFieldContainer">
                  <div className="fieldContainer">
                    <p><label htmlFor="name">name</label></p>
                    <input placeholder="이름" value={name} onChange={onNameChange} onKeyDown={onKeyDown} required />
                  </div>
                  <div className="fieldContainer">
                    <p><label htmlFor="id">id</label></p>
                    <input 
                      value={id}
                      placeholder="아이디"
                      onChange={onIdChange}
                      onKeyDown={onKeyDown}
                      required 
                    />
                    <div className='msg' style={{color: idDuplicated ? 'red' : 'green'}}>
                      { id && (idDuplicated ? '이미 사용중인 아이디입니다.' : '사용 가능한 아이디입니다.')}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="fieldContainer">
                    <label htmlFor="password">pw</label>
                    <input type="password" id="password" placeholder="비밀번호" value={password} onChange={handlePasswordChange} onKeyDown={onKeyDown} required />
                    <input type="password" id="confirm-password" placeholder="비밀번호 재확인" value={confirmPassword} onChange={handleConfirmPasswordChange} onKeyDown={onKeyDown} required />
                  </div>
                </div>
                <div>
                  <div style={{paddingTop: '10px'}}>
                    <label htmlFor="email">e-mail</label>
                    <div class='emailContainer'>
                      <input 
                        type="email" 
                        id="email" 
                        placeholder="이메일" 
                        onChange={handleEmailChange}
                        onKeyDown={onKeyDown}
                        required 
                      />
                      <button type="button" className="authButton" onClick={handleAuthButtonClick}>인증</button>
                    </div>
                  </div>
                  {authNumVisible && (
                    <div className="authNumContainer">
                      <input className="authNum" type="text" id="text" placeholder="인증번호" value={authNum} onChange={handleAuthNumChange} required />
                      <button type="button" className="authNumButton" onClick={handleAuthNumCheck}>확인</button>
                    </div>
                  )}
                </div>
              </div>
            </form>
          <button type="submit" className="submitBtn">가입하기</button>
        </div>
      </div>
    </FullContainer>
  )
}

export default Signup;
