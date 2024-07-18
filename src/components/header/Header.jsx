import styled from 'styled-components'
import { Container, Image } from '../CommonStyles';
import { useNavigate } from 'react-router-dom';

const CustomHeader = styled.header`
  height: 80px;
  color: white;
  font-size: 25px;
  min-width: 1040px;
  background-color: #D5D9DB62;
`

const NavContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
`

const Tab = styled.div`
  padding: 10px 20px;
  cursor: pointer;
  font-size: 18px;
  color: ${props => props.active ? 'white' : '#aaa'};
  background-color: ${props => props.active ? '#A79E9A' : 'transparent'};
  border-radius: 20px;
  
  &:hover {
    background-color: #A79E9A;
    color: white;
  }
`

const Logo = styled.div`
  width: 90px;
  cursor: pointer;
`;

const Header = () => {
  const navigate = useNavigate();

  return (
    <CustomHeader>
      <Container>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <Logo onClick={() => navigate('/')}>
            <Image src={`${process.env.PUBLIC_URL}/images/logoEX.png`} />
          </Logo>
          <NavContainer>  
            <Tab onClick={() => navigate('/main')}>대시보드</Tab>
            <Tab onClick={() => navigate('/callreport')}>신고내역</Tab>
            <Tab onClick={() => navigate('/notification')}>공지사항</Tab>
          </NavContainer>
        </div>
      </Container>
    </CustomHeader>
  )
}

export default Header;
