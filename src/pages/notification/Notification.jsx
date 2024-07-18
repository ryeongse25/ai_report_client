import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import Header from '../../components/header/Header';
import { Container, FullContainer } from "../../components/CommonStyles";

const MacWindow = styled.div`
  width: 90%;
  max-width: 1200px;
  margin: 50px auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.2);
`;

const MacHeader = styled.div`
  display: flex;
  align-items: center;
  padding: 10px 15px;
  background-color: #f5f5f5;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
  border-bottom: 1px solid #ccc;
`;

const Dot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 8px;
  background-color: ${props => props.color};
`;

const MacBody = styled.div`
  padding: 20px;
  background-color: #f5f5f5;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
`;

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
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const storedNotifications = JSON.parse(localStorage.getItem('notifications')) || [];
    setNotifications(storedNotifications);
  }, []);

  return (
    <Container>
      <Header />
      <MacWindow>
        <MacHeader>
          <Dot color="#FF605C" />
          <Dot color="#FFBD44" />
          <Dot color="#00CA4E" />
        </MacHeader>
        <MacBody>
          <NotificationContainer>
            <NotificationHeader>
              <h2>공지사항</h2>
              <WriteButton onClick={() => navigate('/notification/write')}>글쓰기</WriteButton>
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
        </MacBody>
      </MacWindow>
    </Container>
  );
};

export default Notification;
