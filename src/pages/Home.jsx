import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { FullContainer } from "../components/CommonStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Home.css'; // 경로를 확인하여 수정

const BtnContainer = styled.div`
  color: #444445;
  text-align: center;
  gap: 50px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AdminBox = styled.div`
  width: 300px;
  height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 900;
  border-radius: 25px;
  border: 10px solid #f3f3f3;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 0%,
    rgba(222, 222, 222, 1) 80%
  );
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const UserBox = styled.div`
  width: 200px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  font-weight: 900;
  text-align: center;
  border-radius: 20px;
  border: 6px solid #fed3d3;
  background: rgb(242, 224, 224);
  background: linear-gradient(
    180deg,
    rgba(242, 224, 224, 1) 0%,
    rgba(255, 180, 180, 1) 100%
  );
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;


const images = [
  "/images/homeimg1.jpg",
  "/images/homeimg2.jpg",
  "/images/homeimg3.jpg"
];

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // 5초마다 이미지 전환

    return () => clearInterval(interval); // 컴포넌트 언마운트 시 인터벌 정리
  }, []);

  return (
    <>
      <FullContainer>
        <div className="app-container">
          <video autoPlay muted loop id="background-video">
            <source src="/videos/firetruck.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="container">
            <div className="image-section">
              <img src={images[currentImageIndex]} alt="Slideshow" />
            </div>
            <div className="main-section">
              <div className="main-header">
                <img src="/images/phone.png" alt="Main Icon" />
                <span>메인 페이지</span>
              </div>
              <BtnContainer>
                <AdminBox onClick={() => (window.location.href = "/main")}>
                  <div>
                    <p style={{ marginBottom: "10px" }}>
                      <FontAwesomeIcon icon={faUser} />
                    </p>
                    관리자 페이지
                  </div>
                </AdminBox>
                <UserBox onClick={() => (window.location.href = "/report")}>
                  신고하기
                </UserBox>
              </BtnContainer>
            </div>
          </div>
        </div>
      </FullContainer>
    </>
  );
};

export default Home;
