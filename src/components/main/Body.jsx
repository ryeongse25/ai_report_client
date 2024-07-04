import styled from 'styled-components'
import { Container } from "../CommonStyles"

const FolderBody = styled.div`
    height: 700px;
    min-width: 1000px;
    margin-bottom: 50px;
    border-radius: 0 10px 10px 10px;
    background-color: ${props => props.category === '대시보드' ? 'red' : props.category === '신고현황' ? 'blue' : 'orange'}
`

const Body = ({category}) => {
    return <>
        <Container>
            <FolderBody category={category}>{category}</FolderBody>
        </Container>
    </>
}

export default Body;