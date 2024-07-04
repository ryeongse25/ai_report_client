import styled from 'styled-components'
import { FullContainer } from '../components/CommonStyles';

const BtnBox = styled.div`
    width: 200px;
    height: 200px;
    font-weight: 900;
    text-align: center;
    line-height: 200px;
    border-radius: 20px;
    background-color: lightgray;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    cursor: pointer;

    &:hover {
        transform: scale(1.1);
    }
`

const Home = () => {
    return <>
        <FullContainer>
            <div style={{textAlign: 'center'}}>
                <h1 style={{marginBottom: '100px'}}>AI 자동 신고 시스템</h1>
                <div style={{display: 'flex', gap: '150px'}}>
                    <BtnBox onClick={() => window.location.href='/report'}>신고하기</BtnBox>
                    <BtnBox onClick={() => window.location.href='/main'}>관리자 페이지</BtnBox>
                </div>
            </div>
        </FullContainer>
    </>
}

export default Home;