import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FullContainer } from '../../components/CommonStyles';
import { GoBackBtn } from '../../components/CommonStyles';
import './FindID.css';

function FindID() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleEmailSubmit = async () => {
    try {
      const response = await fetch('/account/findid', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const result = await response.json();

      if (result.valid) {
        navigate('/find-id-2');
      } else {
        setError('해당 이메일이 존재하지 않습니다.');
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
      <div className='findid-bg'>
        <div className='backContainer'>
          <h2 className='title'>아이디 찾기</h2>
          <div className='formContainer'>
            <div className='description'>이메일 정보를 입력해 주십시오.</div>
            <div className='form' onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="email">e-mail</label>
              <input 
                id="email" 
                placeholder="이메일" 
                value={email}
                onChange={handleEmailChange}
                required 
              />
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

export default FindID;
