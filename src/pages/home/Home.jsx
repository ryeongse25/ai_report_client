import React from "react";
import ImageSlider from "../../components/home/ImageSlider";

import styled from "styled-components";
import { FullContainer } from "../../components/CommonStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import './Home.css';

const BtnContainer = styled.div`
  color: #444445;
  text-align: center;
  gap: 20px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const AdminBox = styled.div`
  width: 250px;
  height: 130px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 900;
  border-radius: 25px;
  border: 3px solid #ccc;
  background: rgb(240, 240, 240);
  background: linear-gradient(
                180deg,
                rgba(240, 240, 240, 1) 0%,
                rgba(200, 200, 200, 1) 80%
              );
  box-shadow: rgba(150, 150, 150, 0.4) 0px 8px 24px -6px;
  cursor: pointer;
  
  &:hover {
    transform: scale(1.1);
  }
`;

const UserBox = styled.div`
  width: 250px;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  font-weight: 900;
  text-align: center;
  border-radius: 20px;
  background: rgb(242, 224, 224);
  background: linear-gradient(
                180deg,
                rgba(255, 153, 153, 1) 0%,
                rgba(192, 42, 42, 1) 100%
              );
  border: 3px solid #E16464;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px;

  cursor: pointer;

  &:hover {
    transform: scale(1.1);
  }
`;

const Home = () => {
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
              <ImageSlider />
            </div>
            <div className="main-section">
              <div className="main-header">
                <img src="/images/mainlogo.png" alt="Main Icon" />
                <span style={{ fontSize: "30px", marginLeft: "5px", color: "#443C39" }}>LOGO</span>
              </div>
              <BtnContainer>
                <AdminBox onClick={() => (window.location.href = "/main")}>
                  <div>
                    <p style={{ marginBottom: "3px"}}>
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
