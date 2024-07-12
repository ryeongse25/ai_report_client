import styled from 'styled-components'
import { Container, Image } from '../CommonStyles';

const CustomHeader = styled.header`
  height: 80px;
  color: white;
  font-size: 25px;
  min-width: 1040px;
  background-color: #675C58;
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
const Logo = styled.img`
  cursor: pointer;
  width: 80px;
  height: auto;
`;

const Header = () => {
  const navigateTo = (path) => {
    window.location.href = path;
  };

  return (
    <CustomHeader>
      <Container>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <div style={{width: '90px'}}>
            <Image src={`${process.env.PUBLIC_URL}/images/logoEX.png`} />
          </div>
          <NavContainer>  
            <Logo 
              src={`${process.env.PUBLIC_URL}/images/home.png`}  
              alt="Home Button"
              onClick={() => navigateTo('/')}  
            />
            <Tab onClick={() => navigateTo('/Main')}>대시보드</Tab>
            <Tab onClick={() => navigateTo('/Statspage')}>신고현황</Tab>
            <Tab onClick={() => navigateTo('/notification')}>공지사항</Tab>
          </NavContainer>
        </div>
      </Container>
    </CustomHeader>
  )
}

export default Header;
