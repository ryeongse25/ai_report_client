import styled from 'styled-components';
import { Container } from "../components/CommonStyles";
import { useNavigate } from 'react-router-dom';
import Header from '../components/header/Header'; // 헤더 컴포넌트 경로 수정

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
        <MacWindow>
          <MacHeader>
            <Dot color="#FF605C" />
            <Dot color="#FFBD44" />
            <Dot color="#00CA4E" />
          </MacHeader>
          <MacBody>
            <ReportContainer>
              <h2>신고현황</h2>
              {/* 신고현황 콘텐츠 */}
            </ReportContainer>
          </MacBody>
        </MacWindow>
      </Container>
    </>
  );
};

export default Stats;
