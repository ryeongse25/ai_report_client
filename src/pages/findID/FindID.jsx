import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isValidEmail } from '../../utils/utils';
import { errorWithoutBtn, successWithoutBtn } from '../../utils/swal';

import './FindID.css';
import { GoBackBtn } from '../../components/CommonStyles';
import { FullContainer } from '../../components/CommonStyles';
import { findid, verifyid } from '../../apis/user';

function FindID() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [code, setCode] = useState('');
  const [email, setEmail] = useState('');
  const [isCode, setIsCode] = useState(false);

  // 인증 메일 발송 버튼
  const onSend = async () => {
    if (email == '') return;
    if (!isValidEmail(email)) {
      errorWithoutBtn('이메일 형식이 올바르지 않습니다.');
      return;
    }

    const res = await findid(email);
    if (res) {
      setIsCode(true);
      successWithoutBtn('인증번호가 발송되었습니다.', '5분 안에 인증번호를 입력해주세요.', () => {});
    }
  };

  // 인증 코드 확인 버튼
  const onClick = async () => {
    if (code == '') return;
    const res = await verifyid(email, code);
    if (res) setId(res);
  }

  return (
    <FullContainer>
      <video autoPlay muted loop id="background-video">
        <source src="/videos/firetruck.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <GoBackBtn />
      <div className='findid-bg'>
        <div className='backContainer'>
          <h2>아이디 찾기</h2>
          <div className='formContainer'>
            {id == '' ? <>
              <h4>이메일 정보를 입력해 주십시오.</h4>
              <div className='form'>
                <label htmlFor="email">e-mail</label>
                <input
                  id='email'
                  value={email}
                  placeholder="이메일" 
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className='form' style={{marginTop: '5px'}}>
                {isCode && <>
                  <label htmlFor="code">인증번호</label>
                  <input
                    id='code'
                    value={code}
                    placeholder="인증번호" 
                    onChange={(e) => setCode(e.target.value)}
                    />
                </>}
              </div>
              {isCode ? <button type="button" onClick={onClick}>확인</button> :
              <button type="button" onClick={onSend}>인증메일 발송</button>}
            </> : 
            <>
              <p className='id-result'>아이디 : {id}</p>
              <button className='login' onClick={() => navigate('/login')}>로그인 페이지로 이동</button>
            </>}
          </div>
      </div>
    </div>
    </FullContainer>
  );
}

export default FindID;
