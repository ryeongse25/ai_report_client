import styled from 'styled-components'
import { Container } from "../CommonStyles"
import CalendarComponent from './CalendarComponent';

const BodyContainer = styled.div`
    height: 700px;
    min-width: 1100px;
    margin: 50px 0;
    border-radius: 10px;
    background-color: gray;
`

const Body = ({category}) => {
    return <>
        <Container>
            <BodyContainer>
                <CalendarComponent />
            </BodyContainer>
        </Container>
    </>
}

export default Body;