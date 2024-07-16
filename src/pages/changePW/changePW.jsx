import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullContainer } from '../../components/CommonStyles';
import { GoBackBtn } from '../../components/CommonStyles';
import './changePW.css';

function FindPW() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [id, setId] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleEmailSubmit = async () => {
    try {
      const response = await fetch('/account/changepw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, id }),
      });

      const result = await response.json();

      if (result.valid) {
        navigate('/change-pw-2');
      } else {
        setError('해당 아이디 혹은 이메일이 존재하지 않습니다.');
      }
    } catch (error) {
      setError('서버 오류가 발생했습니다. 나중에 다시 시도해주세요.');
    }
  };

  return (
    <FullContainer>
      <video autoPlay muted loop id="background-video">
        <source src="/videos/firetruck.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <GoBackBtn />
      <div className='changepw-bg'>
        <div className='backContainer'>
          <h2 className='title'>비밀번호 변경</h2>
          <div className='formContainer'>
            <div className='description'>비밀번호 재설정을 위해 정보를 입력해 주십시오.</div>
            <div className='form' onSubmit={(e) => e.preventDefault()}>
              <div className='changepw-inputGroup'>
                <label htmlFor="id">ID</label>
                <input 
                  id="id" 
                  placeholder="아이디" 
                  value={id}
                  onChange={handleIdChange}
                  required 
                />
              </div>
              <div className='changepw-inputGroup'>
                <label htmlFor="email">e-mail</label>
                <input 
                  id="email" 
                  placeholder="이메일" 
                  value={email}
                  onChange={handleEmailChange}
                  required 
                />
              </div>
              <button type="button" onClick={handleEmailSubmit}>인증메일 발송</button>
            </div>
            <div className='error'>
              {error && <p>{error}</p>}
            </div>
          </div>
      </div>
    </div>
    </FullContainer>
  );
}

export default FindPW;
