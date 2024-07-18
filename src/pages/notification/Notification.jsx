import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { getUser } from '../../apis/user';
import { getNotice } from '../../apis/notification';

import styled from 'styled-components';
import Header from '../../components/header/Header';
import Content from '../../components/notification/Content';

const NotificationContainer = styled.div`
  margin: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 10px;
`;

const NotificationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

const NotificationItem = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const WriteButton = styled.button`
  padding: 10px 20px;
  background-color: #888;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

const Notification = () => {
  const navigate = useNavigate();

  const [isAdmin, setIsAdmin] = useState(false); 
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    // 관리자 여부 확인
    getUser().then((res) => {
      const admin = res.is_admin;
      if (admin) setIsAdmin(true);
    })

    // 전체 공지사항 가져오기
    getNotice().then((res) => {
      setNotifications(res);
    })
  }, []);

  return (
    <>
      <Header />
      <NotificationContainer>
        <NotificationHeader>
          <h2>공지사항</h2>
          {isAdmin && <WriteButton onClick={() => navigate('/notification/write')}>글쓰기</WriteButton>}
        </NotificationHeader>

        {notifications.length > 0 ? (
          notifications.map((notice, index) => (
            <NotificationItem key={index}>
              <p>{index + 1}</p>
              <h3>{notice.fields.title}</h3>
              <p>{notice.fields.created_at.slice(0, 10)}</p>
            </NotificationItem>
          ))
        ) : (
          <p>작성된 공지사항이 없습니다.</p>
        )}
      </NotificationContainer>
    </>
  );
};

export default Notification;