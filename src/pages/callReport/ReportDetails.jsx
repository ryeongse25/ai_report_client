import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header/Header'; 
import './ReportContent.css';

const ReportDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);


  //서버 있을 때 사용
  // useEffect(() => {
  //   const fetchReport = async () => {
  //     try {
  //       const response = await fetch(`/??/${id}`); // 서버 API 주소 (id가 외래키)
  //       const data = await response.json();
  //       setReport(data);
  //     } catch (error) {
  //       console.error('신고 데이터를 가져오는 데 실패했습니다:', error);
  //     }
  //   };

  //   fetchReport();
  // }, [id]);

  // if (!report) {
  //   return <div>Loading...</div>;
  // }


  useEffect(() => {
    const allReports = [
      { id: 1, date: '2024-07-11', mainCategory: 'Category 1', subCategory: 'subcategory A', location: '대왕중학교', address: '서울시 강남구', content: '신고 내용 1', recording: '녹취록 1' },
      { id: 2, date: '2024-07-11', mainCategory: 'Category 2', subCategory: 'subcategory B', location: '빽다방', address: '서울시 서초구', content: '신고 내용 2', recording: '녹취록 2' },
      { id: 3, date: '2024-07-12', mainCategory: 'Category 3', subCategory: 'subcategory C', location: '스타벅스', address: '서울시 종로구', content: '신고 내용 3', recording: '녹취록 3' },
      { id: 4, date: '2024-07-13', mainCategory: 'Category 4', subCategory: 'subcategory D', location: 'ㅇㅇ아파트', address: '서울시 강동구', content: '신고 내용 4', recording: '녹취록 4' },
      { id: 5, date: '2024-07-14', mainCategory: 'Category 5', subCategory: 'subcategory E', location: '송파구도서관', address: '서울시 송파구', content: '신고 내용 5', recording: '녹취록 5' },
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
          <h1>{report.date}</h1>
          <div className='detail-contents'>
            <div className='detail-item'>
              <label>ID</label>
              <span>{report.id}</span>
            </div>
            <div className='detail-item-row'>
              <div className='detail-item'>
                <label>주소</label>
                <span>{report.address}</span>
              </div>
              <div className='detail-item'>
                <label>장소</label>
                <span>{report.location}</span>
              </div>
            </div>
            <div className='detail-item-row'>
              <div className='detail-item'>
                <label>대분류</label>
                <span>{report.mainCategory}</span>
              </div>
              <div className='detail-item'>
                <label>중분류</label>
                <span>{report.subCategory}</span>
              </div>
            </div>
            <div className='detail-item'>
              <label>내용</label>
              <span>{report.content}</span>
            </div>
            <div className='detail-item'>
              <label>녹취록</label>
              <span>{report.recording}</span>
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
