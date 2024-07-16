import React from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';

const UserComponentContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  background-color: #f2f2f2;
  border-radius: 10px;
  width: 100%;
  height: 100%;
`;

const UserName = styled.h3`
  font-size: 20px;
  padding: 0 10px;
`;

const CenterName = styled.h3`
  color: grey;
  font-size: 18px;
  padding: 0 10px;
`;

const ButtonGroupContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  width; 100%;
  margin-bottom: 20px;
`;

const EditButton = styled.button`
  background-color: #FF5A5A;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  flex: 1;

  &:hover {
    background-color: #FF7A7A;
  }
`;

const LogoutButton = styled.button`
  background-color: #CCCCCC;
  color: black;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;

  &:hover {
    background-color: #E0E0E0;
  }
`;

const UserComponent = () => {
    const navigate = useNavigate();

  return (
    <UserComponentContainer>
      <div style={{display: 'flex', alignItems: 'center'}}>
        <div style={{width: '180px'}}>
          <UserName>이름</UserName> 
          <CenterName>분당 119 안전센터</CenterName> 
        </div>
        <img src="images\userIcon.png" alt="User Icon" width="90" height="90" />
      </div>
      <ButtonGroupContainer>
        <EditButton>정보수정</EditButton>
        <LogoutButton onClick={() => navigate('/')}>로그아웃</LogoutButton>
      </ButtonGroupContainer>
    </UserComponentContainer>
  );
};

export default UserComponent;
