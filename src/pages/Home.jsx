import styled from "styled-components";
import { FullContainer } from "../components/CommonStyles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

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

const Home = () => {
  return (
    <>
      <FullContainer>
        <div style={{ textAlign: "center" }}>
          <h1 style={{ marginBottom: "80px", color: "white" }}>
            AI 자동 신고 시스템
          </h1>
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
      </FullContainer>
    </>
  );
};

export default Home;