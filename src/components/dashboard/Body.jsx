import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

import { getUser } from '../../apis/user';
import { Container } from "../CommonStyles";

import Chart from './chart/Chart';
import UserComponent from "./UserComponent";
import CalendarComponent from './CalendarComponent';
import NoticeComponent from './NoticeComponent';

const BodyContainer = styled.div`
  position: relative;
  height: 800px;
  min-width: 1300px;
  padding: 10px;
  margin: 20px 0;
`;

const CalendarWrapper = styled.div`
  position: absolute;
  top: 50px;
  left: 50px;
  width: 800px;
  height: 450px;
  background-color: #D5D9DB55;
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
  background-color: #D5D9DB55;
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
  background-color: #D5D9DB55;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
`;


const Body = () => {
  const navigate = useNavigate();

  const [name, setName] = useState('')

  useEffect(() => {
    getUser().then((res) => {
      if (res) setName(res.name);
      else navigate('/login');
    })
  }, [])

  return (
    <Container>
      <BodyContainer>
        <CalendarWrapper>
          <CalendarComponent />
        </CalendarWrapper>
        <UserInfoContainer>
          <UserComponent name={name}/>
        </UserInfoContainer>
        <NoticeComponent />
        <StatsContainer>
          <Chart />
        </StatsContainer>
      </BodyContainer>
    </Container>
  );
};

export default Body;
