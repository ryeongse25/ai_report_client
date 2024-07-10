import React from 'react';
import styled from 'styled-components';
import { FullContainer, GoBackBtn } from '../components/CommonStyles';

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #eee;
  height: 100vh;
  padding: 10px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #ccc;
  padding: 10px;
`;

const HeaderButton = styled.button`
  background-color: #fff;
  border: none;
  padding: 10px 20px;
  cursor: pointer;
`;

const Content = styled.div`
  display: flex;
  flex: 1;
  background-color: #bbb;
  padding: 10px;
`;

const LeftPanel = styled.div`
  flex: 2;
  display: flex;
  flex-direction: column;
  background-color: #888;
  padding: 10px;
  margin-right: 10px;
`;

const Calendar = styled.div`
  flex: 1;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
`;

const Notification = styled.div`
  flex: 1;
  background-color: #fff;
  padding: 10px;
`;

const RightPanel = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #888;
  padding: 10px;
`;

const UserInfo = styled.div`
  flex: 1;
  background-color: #fff;
  margin-bottom: 10px;
  padding: 10px;
`;

const Stats = styled.div`
  flex: 2;
  background-color: #fff;
  padding: 10px;
`;

const App = () => {
  return (
    <FullContainer>
        <video autoPlay muted loop id="background-video">
            <source src="/videos/firetruck.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        <GoBackBtn />
        <DashboardContainer>
        <Header>
            <HeaderButton>대시보드</HeaderButton>
            <HeaderButton>신고현황</HeaderButton>
            <HeaderButton>공지사항</HeaderButton>
        </Header>
        <Content>
            <LeftPanel>
            <Calendar>
                {/* 달력 */}
            </Calendar>
            <Notification>
                {/* 공지사항 */}
            </Notification>
            </LeftPanel>
            <RightPanel>
            <UserInfo>
                {/* 회원정보 */}
            </UserInfo>
            <Stats>
                {/* 신고 통계 */}
            </Stats>
            </RightPanel>
        </Content>
        </DashboardContainer>
    </FullContainer>
  );
};

export default App;