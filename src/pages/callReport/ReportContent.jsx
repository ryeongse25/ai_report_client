import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ReportContent.css';
import Header from '../../components/header/Header'; 

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);

  useEffect(() => {
    const allReports = [
      { id: 1, content: '신고 내용 1', address: '서울시 강남구', urgency: '높음' },
      { id: 2, content: '신고 내용 2', address: '서울시 서초구', urgency: '중간' },
      { id: 3, content: '신고 내용 3', address: '서울시 종로구', urgency: '낮음' },
      { id: 4, content: '신고 내용 4', address: '서울시 강동구', urgency: '높음' },
      { id: 5, content: '신고 내용 5', address: '서울시 송파구', urgency: '중간' },

    ];

    const foundReport = allReports.find(report => report.id === parseInt(id));
    setReport(foundReport);
  }, [id]);

  if (!report) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Header />
        <div className='Details'>
          <h1>신고 상세 페이지</h1>
          <div className='detail-contents'>
            <p>ID: {report.id}</p>
            <p>주소: {report.address}</p>
            <p>긴급도: {report.urgency}</p>
            <p>내용: {report.content}</p>
          </div>
          <img 
            src="/images/list.png" 
            alt="목록" 
            className="toList-button" 
            onClick={() => navigate('/callreport')}  
          />
        </div>
    </div>
  );
};

export default ReportDetails;
