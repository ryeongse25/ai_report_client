import React from 'react';
import './ID.css';

function FindID_2() {
  console.log('Rendering FindID_2 component');
  return (
    <div className='container'>
      <div className='backContainer'>
        <div className='formWrapper'>
          <div className='title'>아이디 찾기</div>
          <div className='formContainer'>
            <div className='description'>인증메일이 발송되었습니다. 인증번호 입력 후 ‘인증완료’ 버튼을 눌러주십시오.</div>
            <form className='form'>
              <div className='fieldContainer'>
                <input className='input' type="text" id="email" placeholder="이메일" required />
                <button type="button" className='button'>인증완료</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FindID_2;
