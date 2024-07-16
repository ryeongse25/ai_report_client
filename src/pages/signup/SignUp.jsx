import axios from 'axios';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// functions
import { getCookie } from '../../utils/cookie';
import { blockSpace } from '../../utils/keyboard';
import { isValidEmail } from '../../utils/utils';
import { checkCode, emailCheck, idCheck, sendCode } from '../../apis/user';
import { errorWithoutBtn, successWithoutBtn, warningWithoutBtn } from '../../utils/swal';

// css
import './SignUp.css';
import { FullContainer, GoBackBtn } from '../../components/CommonStyles';

function Signup() {
  const navigate = useNavigate();

  const [id, setId] = useState('');
  const [idDuplicated, setIdDuplicated] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [code, setCode] = useState('');
  const [confirmed, setConfirmed] = useState(false); // 이메일 인증 완료 여부
  const [authNumVisible, setAuthNumVisible] = useState(false);


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
  const onIdChange = async (e) => {
    setId(e.target.value);

    const res = await idCheck(e.target.value);
    setIdDuplicated(!res);
  };

  // 이메일 인증 버튼 클릭
  const onEmailClick = async () => {
    if (email == '') return;

    // 이메일 유효성 검사
    const valid = isValidEmail(email);
    if (!valid) {
      warningWithoutBtn('이메일 주소가 올바르지 않습니다.');
      return;
    }
    
    // 이메일 중복 검사
    const res = await emailCheck(email);
    if (res) {
      const res = await sendCode(email);
      if (res) setAuthNumVisible(true);
    } else errorWithoutBtn('이미 가입된 이메일입니다.');
  }

  // 인증 코드 확인
  const onClickAuthBtn = async () => {
    const res = await checkCode(email, code);
    console.log(res);
    // setConfirmed(true);
  }
  
  // 가입하기 버튼
  const onSubmit = async () => {
    if (!name || !id || !password || !confirmPassword || !email) {
      warningWithoutBtn('모든 정보를 입력해주세요.');
      return;
    // } else if (!confirmed) {
    //   warningWithoutBtn('이메일 인증을 완료해주세요.');
    //   return;
    } else if (password !== confirmPassword) {
      errorWithoutBtn('비밀번호가 일치하지 않습니다.')
      return;
    }

    try {
      const csrftoken = getCookie('csrftoken');
      const response = await axios.post('http://localhost:8000/account/signup/', { name, id, password, email }, {
        headers: {
          'X-CSRFToken': csrftoken
        }
      });

      if (response.data.success) {
        successWithoutBtn('회원가입에 성공하였습니다.', '로그인 페이지로 이동합니다.', navigate('/login'));
      } else {
        Swal.fire({
          icon: 'error',
          title: '회원가입에 실패했습니다',
          text: response.data.message,
          showConfirmButton: true
        });
      }
    } catch (error) {
      let code = error.response.data.errorCode;

      if (code == 0) errorWithoutBtn('비밀번호는 8글자 이상이어야 합니다.', '대문자, 숫자, 특수기호를 최소 1개 이상 포함해주세요.');
      else if (code == 1) errorWithoutBtn('이미 가입된 이메일입니다.');

      console.error('회원가입:', error);
    }
  };

  useEffect(() => {
    // csrf token 가져오기
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
            <form>
              <div>
                <div className="inlineFieldContainer">
                  <div className="fieldContainer">
                    <p><label htmlFor="name">name</label></p>
                    <input placeholder="이름" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      onKeyDown={blockSpace} 
                    />
                  </div>
                  <div className="fieldContainer">
                    <p><label htmlFor="id">id</label></p>
                    <input 
                      value={id}
                      placeholder="아이디"
                      onChange={onIdChange}
                      onKeyDown={blockSpace}
                    />
                    <div className='msg' style={{color: idDuplicated ? 'red' : 'green'}}>
                      { id && (idDuplicated ? '이미 사용중인 아이디입니다.' : '사용 가능한 아이디입니다.')}
                    </div>
                  </div>
                </div>
                <div>
                  <div className="fieldContainer">
                    <label htmlFor="password">pw</label>
                    <input type="password" 
                      placeholder="비밀번호" 
                      value={password} 
                      onChange={(e) => setPassword(e.target.value)} 
                      onKeyDown={blockSpace}
                    />
                    <input type="password" 
                      placeholder="비밀번호 재확인" 
                      value={confirmPassword} 
                      onChange={(e) => setConfirmPassword(e.target.value)} 
                      onKeyDown={blockSpace} 
                    />
                  </div>
                </div>
                <div>
                  <div style={{paddingTop: '10px'}}>
                    <label htmlFor="email">e-mail</label>
                    <div class='emailContainer'>
                      <input
                        placeholder="이메일" 
                        onChange={(e) => setEmail(e.target.value)}
                        onKeyDown={blockSpace}
                      />
                      <button type="button" onClick={onEmailClick}>인증</button>
                    </div>
                  </div>
                  {authNumVisible &&
                  <div className="authNumContainer">
                    <input className='authNum' 
                      placeholder="인증번호" 
                      value={code} 
                      onChange={(e) => setCode(e.target.value)}
                      onKeyDown={blockSpace}
                    />
                    <button type="button" onClick={onClickAuthBtn}>확인</button>
                  </div>}
                </div>
              </div>
            </form>
          <button type="button" className="submitBtn" onClick={onSubmit}>가입하기</button>
        </div>
      </div>
    </FullContainer>
  )
}

export default Signup;
