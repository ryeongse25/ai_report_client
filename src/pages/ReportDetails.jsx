import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { Container } from "../components/CommonStyles"; // 경로 수정
import Header from '../components/header/Header';

// 임의의 신고 내역 데이터
const mockData = {
  "2024-07-01": [
    { id: 1, report: "7월 1일 세계 멸망", detail: "무서워" },
    { id: 2, report: "운석 충돌", detail: "안녕히가세요" },
  ],
  "2024-07-02": [
    { id: 1, report: "신고 내역 3", detail: "상세 내용 3" },
  ],
  // 추가적인 날짜 및 신고 내역 데이터
};

const ReportDetailsContainer = styled.div`
  margin: 20px;
  background-color: #f5f5f5c0;
  padding: 20px;
  border-radius: 10px;
`;

const ReportItem = styled.div`
  margin: 10px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const ReportDetails = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [reports, setReports] = useState([]);

  useEffect(() => {
    const formattedDate = selectedDate.toISOString().split('T')[0];
    setReports(mockData[formattedDate] || []);
  }, [selectedDate]);

  return (
    <Container>
      <Header />
      <ReportDetailsContainer>
        <h2>신고 내역 확인</h2>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="yyyy-MM-dd"
        />
        {reports.length > 0 ? (
          reports.map((report) => (
            <ReportItem key={report.id}>
              <h3>{report.report}</h3>
              <p>{report.detail}</p>
            </ReportItem>
          ))
        ) : (
          <p>선택한 날짜의 신고 내역이 없습니다.</p>
        )}
      </ReportDetailsContainer>
    </Container>
  );
};

export default ReportDetails;
