import React, { useState } from 'react';
import { FullContainer } from '../../components/CommonStyles';
import './Login.css'; 

const Login = () => {
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
      e.preventDefault();
      // API 호출 (fetch방식..?)
      console.log('ID:', id);
      console.log('Password:', password);
  };

  // 회원가입
  const handleSignup = () => {
      // 회원가입 로직
  };

  // 아이디 찾기
  const handleFindId = () => {
      // 아이디 찾기 로직
  };

  // 비밀번호 변경
  const handleChangePassword = () => {
      // 비밀번호 변경 로직
  };

  return (
    <FullContainer>
      <div className="app-container">
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
              <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    id="id"
                    name="id"
                    value={id}
                    onChange={(e) => setId(e.target.value)}
                    placeholder="ID"
                    required
                    />
                <input
                    type="password"
                    id="pw"
                    name="pw"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PW"
                    required
                    />
                <button type="submit">로그인</button>
              </form>
              <div className="links">
                <button className="link-button" onClick={handleSignup}>회원가입</button>
                <button className="link-button" onClick={handleFindId}>ID 찾기</button>
                <button className="link-button" onClick={handleChangePassword}>PW 변경</button>
              </div>
          </div>
        </div>
      </div>
    </FullContainer>
  );
};

export default Login;
