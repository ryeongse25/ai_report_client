import styled from 'styled-components'
import { Container, Image } from '../CommonStyles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from '@fortawesome/free-regular-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

const CustomHeader = styled.header`
    height: 80px;
    color: white;
    font-size: 25px;
    min-width: 1040px;
    background-color: #675C58;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: relative; 
`

const NavContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin-right: 20px;
`

const Tab = styled.div`
    padding: 10px 20px;
    cursor: pointer;
    font-size: 18px;
    color: ${props => props.active ? 'white' : '#aaa'};
    background-color: ${props => props.active ? '#A79E9A' : 'transparent'};
    border-radius: 20px;
    margin: 0 5px;
    
    &:hover {
        background-color: #A79E9A;
        color: white;
    }
`
const Logo = styled.img`
    cursor: pointer;
    width: 80px;
    height: auto;
    margin-left: 20px;
`;

const HeaderContent = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
`

const Header = () => {
    const navigateTo = (path) => {
        window.location.href = path;
    };

    return (
        <CustomHeader>
            <img 
                    src={`${process.env.PUBLIC_URL}/images/logoEX.png`} 
                    alt="LOGO Image"
                    style={{ width: '80px', height: 'auto', marginLeft: '20px' }}
                />
            <HeaderContent>
                <Logo 
                    src={`${process.env.PUBLIC_URL}/images/home.png`}  
                    alt="Home Button"
                    onClick={() => navigateTo('/')}  
                />
                <NavContainer>
                    <Tab onClick={() => navigateTo('/Main')}>대시보드</Tab>
                    <Tab onClick={() => navigateTo('/Statspage')}>신고현황</Tab>
                    <Tab onClick={() => navigateTo('/notification')}>공지사항</Tab>
                </NavContainer>
            </HeaderContent>
        </CustomHeader>
    )
}

export default Header;
