import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

export const FullContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
`

export const Container = styled.div`
  width: 100%;
  margin: 10 auto;
  min-width: 700px;
  max-width: 1300px;
`

export const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export const GoBackBtn = () => {

  const style = {
    top: '15px',
    left: '15px',
    color: 'white',
    position: 'absolute',
    cursor: 'pointer'
  }

  return (
    <div style={style} onClick={() => window.location.href = '/'}>
      <img
        src={`${process.env.PUBLIC_URL}/images/home.png`} // 이미지 경로
        alt="Home"
        style={{ width: '70px', height: 'auto', cursor: 'pointer' }}
      />
    </div>
  )
}