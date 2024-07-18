import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import { Container } from "../../components/CommonStyles";
import { getUser } from '../../apis/user';

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
    getUser().then((res) => {
      console.log(res);
      const admin = res.is_admin;
      console.log(admin);
      if (admin) setIsAdmin(true);
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
          notifications.map((notification, index) => (
            <NotificationItem key={index}>
              <h3>{notification.title}</h3>
              <p>{notification.content}</p>
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