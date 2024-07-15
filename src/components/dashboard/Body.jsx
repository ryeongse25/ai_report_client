import styled from 'styled-components';
import { Container } from "../CommonStyles";
import CalendarComponent from './CalendarComponent';
import { useNavigate } from 'react-router-dom';

const BodyContainer = styled.div`
  position: relative;
  height: 800px;
  min-width: 1300px; /* 창의 너비가 작아질 때 좌우 스크롤을 가능하게 함 */
  margin: 30px 0;
  border-radius: 10px;
  background-color: gray;
  padding: 20px;
  overflow: auto; /* 스크롤을 가능하게 함 */
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  width: 800px;
  height: 450px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const UserInfoContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 350px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const ReportContainer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50px;
  width: 800px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const StatsContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 350px;
  height: 450px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #3174ad;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #255c8a;
  }
`;

const Body = ({ category }) => {
  const navigate = useNavigate();

  return (
    <Container>
      <BodyContainer>
        <CalendarWrapper>
          <CalendarComponent />
        </CalendarWrapper>
        <UserInfoContainer>
          <h2>회원 정보</h2>
          <p>회원 정보</p>
        </UserInfoContainer>
        <ReportContainer>
          <h2>공지 사항</h2>
          <p>공지 사항</p>
          <Button onClick={() => navigate('/notification')}>이동하기</Button>
        </ReportContainer>
        <StatsContainer>
          <h2>신고 현황</h2>
          <p>신고 현황 차트</p>
        </StatsContainer>
      </BodyContainer>
    </Container>
  );
};

export default Body;
