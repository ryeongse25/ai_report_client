import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser } from '../../apis/user';
import { getNotice } from '../../apis/notification';

import './Notification.css'
import Header from '../../components/header/Header';
import NoticeList from '../../components/notification/NoticeList';

const Notification = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false); 
  const [notice, setNotice] = useState([]);

  useEffect(() => {
    // 관리자 여부 확인
    getUser().then((res) => {
      const admin = res.is_admin;
      if (admin) setIsAdmin(true);
    })

    // 전체 공지사항 가져오기
    getNotice().then((res) => {
      setNotice(res);
    })
  }, []);

  return (
    <>
      <Header />
      <div className='notice-container'>
        <div className='notice-header'>
          <div>
            <input placeholder='검색어를 입력하세요.'></input>
            <button>검색</button>
          </div>
          {isAdmin && <button className='write' onClick={() => navigate('/notification/write')}>글쓰기</button>}
        </div>
        {notice ? (
          <NoticeList notice={notice} />
        ) : (
          <p>작성된 공지사항이 없습니다.</p>
        )}
      </div>
    </>
  );
};

export default Notification;