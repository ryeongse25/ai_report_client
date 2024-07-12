import styled from 'styled-components';
import { Container } from "../components/CommonStyles";
import { useNavigate } from 'react-router-dom';

import Header from '../components/header/Header'; // 헤더 컴포넌트 경로 수정

const BodyContainer = styled.div`
  position: relative;
  height: 800px;
  min-width: 1300px; /* 창의 너비가 작아질 때 좌우 스크롤을 가능하게 함 */
  margin: 30px 0;
  border-radius: 10px;
  background-color: gray;
  padding: 20px;
`;

const ReportContainer = styled.div`
  background-color: #f0f0f0;
  border-radius: 10px;
  padding: 50px;
  height: 20%; /* BodyContainer의 높이에 맞춤 */
  box-sizing: border-box; /* 패딩과 테두리를 포함한 크기 계산 */
`;

const Stats = () => {
  return (
    <>
      <Header />
      <Container>
        <BodyContainer>
          <ReportContainer>
            <h2>신고현황</h2>
            {/* 신고현황 콘텐츠 */}
          </ReportContainer>
        </BodyContainer>
      </Container>
    </>
  );
};

export default Stats;
