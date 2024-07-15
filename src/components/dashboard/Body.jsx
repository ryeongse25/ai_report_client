import styled from 'styled-components';
import { Container } from "../CommonStyles";
import CalendarComponent from './CalendarComponent';
import UserComponent from "./UserComponent";
// import Chart from "./chart";
import { useNavigate } from 'react-router-dom';

const BodyContainer = styled.div`
  position: relative;
  height: 800px;
  min-width: 1300px; /* 창의 너비가 작아질 때 좌우 스크롤을 가능하게 함 */
  margin: 30px 0;
  border-radius: 10px;
  background-color: #675C58;
  padding: 10px;
  overflow: auto; /* 스크롤을 가능하게 함 */
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  width: 800px;
  height: 450px;
  background-color: #f5f5f5c0;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
`;

const UserInfoContainer = styled.div`
  position: absolute;
  top: 50px;
  right: 50px;
  width: 350px;
  height: 200px;
  background-color: #f5f5f5c0;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
`;

const ReportContainer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50px;
  width: 800px;
  height: 200px;
  background-color: #f5f5f5c0;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
`;

const StatsContainer = styled.div`
  position: absolute;
  bottom: 50px;
  right: 50px;
  width: 350px;
  height: 450px;
  background-color: #f5f5f5c0;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
`;

const Button = styled.button`
  background-color: #CF1010;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #CF101080;
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
          <UserComponent />
        </UserInfoContainer>
        <ReportContainer>
          <h2>공지 사항</h2>
          <p>공지 사항</p>
          <Button onClick={() => navigate('/notification')}>이동하기</Button>
        </ReportContainer>
        <StatsContainer>
          {/* <Chart /> */}
        </StatsContainer>
      </BodyContainer>
    </Container>
  );
};

export default Body;
