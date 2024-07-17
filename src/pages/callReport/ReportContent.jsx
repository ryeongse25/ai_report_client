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
      { id: 1, content: '신고 내용 1ㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁㅁ', address: '서울시 강남구', urgency: '높음' },
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
            <div className='detail-item'>
              <label>ID</label>
              <span>{report.id}</span>
            </div>
            <div className='detail-item'>
              <label>주소</label>
              <span>{report.address}</span>
            </div>
            <div className='detail-item'>
              <label>긴급도</label>
              <span>{report.urgency}</span>
            </div>
            <div className='detail-item'>
              <label>내용</label>
              <span>{report.content}</span>
            </div>
          </div>
            <div className="list-button-container">
            <img 
              src="/images/list.png" 
              alt="목록" 
              className="toList-button" 
              onClick={() => navigate('/callreport')}  
            />
            <p>목록으로</p>
          </div>
        </div>
    </div>
  );
};

export default ReportDetails;
