import React from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header'; // 헤더 컴포넌트 경로

const NotificationContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 20px;
  margin: 10px;
  flex: 1;
`;

const Notification = () => {
  return (
    <>
      <Header />
      <NotificationContainer>
        <h2>공지사항</h2>
        {/* 공지사항 콘텐츠 */}
      </NotificationContainer>
    </>
  );
};

export default Notification;
