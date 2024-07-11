import styled from 'styled-components'
import { Container } from "../CommonStyles"

const FolderBody = styled.div`
    height: 700px;
    min-width: 1100px;
    margin-bottom: 500px;
    margin-top: 50px;
    border-radius: 10px 10px 10px 10px;
    margin-top 500px;
    background-color: ${props => props.category === '대시보드' ? 'gray' : props.category === '신고현황' ? 'blue' : 'orange'}
`

const Body = ({category}) => {
    return <>
        <Container>
            <FolderBody category={category}>{category}</FolderBody>
        </Container>
    </>
}

export default Body;