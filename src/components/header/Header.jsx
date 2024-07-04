import styled from 'styled-components'
import { Container, Image } from '../CommonStyles';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBell } from '@fortawesome/free-regular-svg-icons';

const CustomHeader = styled.header`
    height: 70px;
    color: white;
    font-size: 25px;
    min-width: 1040px;
    background-color: black;

    &:hover {
        color: black;
        background-color: white;
    }
`

const CustomNav = styled.nav`
    height: 70px;
    padding: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
`

const Profile = styled.div`
    width: 30px;
    height: 30px;
    margin-left: 25px;
    border-radius: 50%;
    cursor: pointer;
    overflow: hidden;
`

const Header = () => {
    return <>
    <CustomHeader>
        <Container>
            <CustomNav>
                <div style={{cursor: 'pointer'}} onClick={() => window.location.href = '/'}>LOGO</div>
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <div style={{fontSize: '29px', cursor: 'pointer'}}>
                        <FontAwesomeIcon icon={faBell} />
                    </div>
                    <Profile>
                        <Image src='https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg' />
                    </Profile>
                </div>
            </CustomNav>
        </Container>
    </CustomHeader>
    </>
}

export default Header;