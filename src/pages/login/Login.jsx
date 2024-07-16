import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { FullContainer } from '../../components/CommonStyles';

import { getCookie } from '../../utils/cookie';
import { changeLink } from '../../utils/utils';

import './Login.css'; 

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 버튼 클릭
  const onClick = (e) => { 
    const csrftoken = getCookie('csrftoken');
    axios.post('http://localhost:8000/account/signin/', {id, password}, {
      headers: {
        'X-CSRFToken': csrftoken
      }
    })
    .then((res) => {
      console.log(res);
    })
    .catch((error) => {
      console.log(error);
    })
  };

  useEffect(() => {
    // csrf token 가져오기
    axios.get('http://localhost:8000/account/signup/')
  }, [])

  return (
    <FullContainer>
      <div className="login-container">
          <video autoPlay muted loop id="background-video">
            <source src="/videos/firetruck.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="container">
            <div className="image-section">
              <img src="/images/1.jpg" alt="Logo" />
            </div>
            <div className="login-section">
              <div className="login-header">
                <img src="/images/phone.png" alt="Login Icon" />
                <span>로그인</span>
              </div>
              <form>
                <input
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="ID"
                    required
                    />
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PW"
                    />
                <button type="button" onClick={onClick}>로그인</button>
              </form>
              <div className="links">
                <button className="link-button" onClick={() => changeLink('/signup')}>회원가입</button>
                <button className="link-button" onClick={() => changeLink('/findid')}>ID 찾기</button>
                <button className="link-button" onClick={() => changeLink('/changepw')}>PW 변경</button>
              </div>
          </div>
        </div>
      </div>
    </FullContainer>
  );
};

export default Login;
