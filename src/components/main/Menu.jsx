import styled from 'styled-components'

const FolderMenu = styled.div`
    width: 100px;
    height: 40px;
    margin-top: 45px;
    font-weight: 900;
    line-height: 40px;
    text-align: center;
    border-radius: 10px 10px 0 0;
    background-color: ${props => props.category === '대시보드' ? 'red' : props.category === '신고현황' ? 'blue' : 'orange'};
    cursor: pointer;
`

const Menu = ({category, onClickFunction}) => {

    return <>
        <FolderMenu category={category} onClick={() => onClickFunction(category)}>{category}</FolderMenu>
    </>
}

export default Menu;