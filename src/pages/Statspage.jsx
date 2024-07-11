import React from 'react';
import styled from 'styled-components';
import Header from '../components/header/Header'; // 헤더 컴포넌트 경로 수정

const ReportContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 20px;
  padding: 20px;
  margin: 10px;
  flex: 1;
`;

const Stats = () => {
  return (
    <>
      <Header />
      <ReportContainer>
        <h2>신고현황</h2>
        {/* 신고현황 콘텐츠 */}
      </ReportContainer>
    </>
  );
};

export default Stats;
