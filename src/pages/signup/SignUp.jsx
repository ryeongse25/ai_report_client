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

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [code, setCode] = useState('');
  const [confirmed, setConfirmed] = useState(false); // 이메일 인증 완료 여부
  const [authNumVisible, setAuthNumVisible] = useState(false);

  // 스페이스바 막기
  const onKeyDown = (e) => {
    if (e.key === ' ') e.preventDefault();
  }

  // email 인증번호 확인
  // const handleAuthNumCheck = async () => {
  //   try {
  //     const response = await axios.post('/', { email, code }); // api 주소
  //     if (response.data.isValid) {
  //       Swal.fire({
  //         icon: 'success',
  //         title: '인증번호가 확인되었습니다',
  //         showConfirmButton: true
  //       });
  //     } else {
  //       Swal.fire({
  //         icon: 'error',
  //         title: '인증번호가 올바르지 않습니다',
  //         showConfirmButton: true
  //       });
  //     }
  //   } catch (error) {
  //     console.error('Error checking auth number:', error);
  //     Swal.fire({
  //       icon: 'error',
  //       title: '인증번호 확인에 실패했습니다',
  //       showConfirmButton: true
  //     });
  //   }
  // };
   
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

  // 이메일 인증 버튼 클릭
  const onEmailClick = () => {
    const csrftoken = getCookie('csrftoken');
    axios.post('http://localhost:8000/account/emailcheck/', {'email': email}, {
      headers: {
        'X-CSRFToken': csrftoken
      }
    })
    .then((res) => {
      // 이메일 중복 검사 성공
      if (!res.data.valid) {
        Swal.fire({
          icon: 'error',
          title: '이미 가입된 이메일입니다.',
          showConfirmButton: false,
          timer: 2000
        });
      } else {
        // 이메일 인증코드 보내는 api 호출
        axios.post('http://localhost:8000/account/sendemail/', {'email': email}, {
          headers: {
            'X-CSRFToken': csrftoken
          }
        })
        .then((res) => {
          // 이메일 발송 성공
          console.log(res);
          Swal.fire({
            icon: 'success',
            title: '인증번호가 발송되었습니다',
            showConfirmButton: false,
            timer: 2000
          });
          setAuthNumVisible(true);
        })
        .catch((error) => {
          // 이메일 발송 실패
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: '이메일 발송에 실패하였습니다.',
            text: '잠시후 다시 시도해주세요.',
            showConfirmButton: false,
            timer: 2000
          });
        })
      }
    })
    .catch((error) => {
      // 이메일 중복 확인 실패
      console.log(error)
    })
  }

  // 인증 코드 확인
  const onClickAuthBtn = () => {
    const csrftoken = getCookie('csrftoken');
    axios.post('http://localhost:8000/account/checksignupcode/', {email, code}, {
      headers: {
        'X-CSRFToken': csrftoken
      }
    })
    .then((res) => {
      console.log(res.data)
    })
    .catch((error) => {
      console.log(error);
    })
  }
  
  // 가입하기 버튼
  const handleSubmit = async () => {
    if (!name || !id || !password || !confirmPassword || !email) {
      Swal.fire({
        icon: 'warning',
        title: '모든 정보를 입력해주세요',
        showConfirmButton: false,
        timer: 2000
      });
      return;
    } else if (!confirmed) {
      Swal.fire({
        icon: 'warning',
        title: '이메일 인증을 완료해주세요.',
        showConfirmButton: false,
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
      const response = await axios.post('/', { name, id, password, email, code }); // api 주소
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
                    <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} onKeyDown={onKeyDown} required />
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
                    <input type="password" id="password" placeholder="비밀번호" value={password} onChange={(e) => setPassword(e.target.value)} onKeyDown={onKeyDown} required />
                    <input type="password" id="confirm-password" placeholder="비밀번호 재확인" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} onKeyDown={onKeyDown} required />
                  </div>
                </div>
                <div>
                  <div style={{paddingTop: '10px'}}>
                    <label htmlFor="email">e-mail</label>
                    <div class='emailContainer'>
                      <input
                        placeholder="이메일" 
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={onKeyDown}
                        required 
                      />
                      <button type="button" onClick={onEmailClick}>인증</button>
                    </div>
                  </div>
                  {authNumVisible &&
                  <div className="authNumContainer">
                    <input className='authNum' placeholder="인증번호" value={code} onChange={(e) => setCode(e.target.value)} required />
                    <button type="button" onClick={onClickAuthBtn}>확인</button>
                  </div>}
                </div>
              </div>
            </form>
          <button type="submit" className="submitBtn" onClick={handleSubmit}>가입하기</button>
        </div>
      </div>
    </FullContainer>
  )
}

export default Signup;
