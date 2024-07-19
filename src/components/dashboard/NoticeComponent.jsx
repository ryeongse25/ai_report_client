import styled from 'styled-components'
import { getNotice } from '../../apis/notification';
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ReportContainer = styled.div`
  position: absolute;
  bottom: 50px;
  left: 50px;
  width: 800px;
  height: 200px;
  background-color: #f5f5f5c0;
  border-radius: 15px;
  padding: 20px;
  box-sizing: border-box;
`;

const PlusButton = styled.div`
  width: 25px;
  height: 25px;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  border-radius: 50%;
  border: 2px solid black;
  background-color: inherit;
  cursor: pointer;

  span {
    top: -9px;
    position: relative;
  }
`

const NoticeComponent = () => {
  const navigate = useNavigate();

  const [notice, setNotice] = useState([]);

  useEffect(() => {
    getNotice((res) => setNotice(res))
  }, [])

  return (
    <ReportContainer>
        <div style={{display: 'flex', justifyContent: 'space-between'}}>
          <h2>공지 사항</h2>
          <PlusButton onClick={() => navigate('/notice')}><span>+</span></PlusButton>
        </div>
        {notice}
    </ReportContainer>
  )
}

export default NoticeComponent;