import styled from 'styled-components';
import { Container } from "../CommonStyles";
import CalendarComponent from './CalendarComponent';
import { useNavigate } from 'react-router-dom';

const BodyContainer = styled.div`
  position: relative;
  height: 750px;
  min-width: 1100px;
  margin: 50px 0;
  border-radius: 10px;
  background-color: gray;
  padding: 20px;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 40px;
  left: 40px;
  width: 750px;
  height: 450px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-left: 10px;
  margin-top: 10px;
`;

const UserInfoContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 400px;
  height: 150px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
`;

const ReportContainer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 40px;
  width: 750px;
  height: 150px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  margin-left: 10px;
`;

const StatsContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 400px;
  height: 450px;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
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
          <h2>신고 내역</h2>
          <p>신고 내역</p>
          <Button onClick={() => navigate('/report-details')}>이동하기</Button>
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
