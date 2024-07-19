import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 서버랑 연결할 때 사용
// const ReportList = () => {
// const [reports, setReports] = useState([]);
//const [currentPage, setCurrentPage] = useState(1);
// const [searchTerm, setSearchTerm] = useState('');
// const [searchQuery, setSearchQuery] = useState('');
// const reportsPerPage = 2;

// useEffect(() => {
//   fetchReports();
// }, [currentPage, searchQuery]);

// const fetchReports = async () => {
//   try {
//     const response = await fetch('/'); // 서버 API 주소
//     const data = await response.json();

//     const filteredReports = data.filter(report => 
//       report.content.includes(searchQuery) ||
//       report.address.includes(searchQuery) ||
//       report.mainCategory.includes(searchQuery) ||
//       report.subCategory.includes(searchQuery) ||
//       report.location.includes(searchQuery)
//     );

//     const indexOfLastReport = currentPage * reportsPerPage;
//     const indexOfFirstReport = indexOfLastReport - reportsPerPage;
//     const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
//     setReports(currentReports);
//   } catch (error) {
//     console.error('신고 데이터를 가져오는 데 실패했습니다:', error);
//   }
// };

//임시데이터 
const ReportList = () => {
    const allReports = [
      { id: 1, date: '2024-07-11', mainCategory: 'Category 1', subCategory: 'subcategory A', location: '대왕중학교', address: '서울시 강남구', content: '신고 내용 1', recording: '녹취록 1' },
      { id: 2, date: '2024-07-11', mainCategory: 'Category 2', subCategory: 'subcategory B', location: '빽다방', address: '서울시 서초구', content: '신고 내용 2', recording: '녹취록 2' },
      { id: 3, date: '2024-07-12', mainCategory: 'Category 3', subCategory: 'subcategory C', location: '스타벅스', address: '서울시 종로구', content: '신고 내용 3', recording: '녹취록 3' },
      { id: 4, date: '2024-07-13', mainCategory: 'Category 4', subCategory: 'subcategory D', location: 'ㅇㅇ아파트', address: '서울시 강동구', content: '신고 내용 4', recording: '녹취록 4' },
      { id: 5, date: '2024-07-14', mainCategory: 'Category 5', subCategory: 'subcategory E', location: '송파구도서관', address: '서울시 송파구', content: '신고 내용 5', recording: '녹취록 5' },
    ];

  
    const [reports, setReports] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const reportsPerPage = 2; 
  
    useEffect(() => {
      fetchReports();
    }, [currentPage, searchQuery]);
  
    const fetchReports = () => {
        const filteredReports = allReports.filter(report => 
          report.content.includes(searchQuery) ||
          report.address.includes(searchQuery) ||
          report.urgency.includes(searchQuery)
        );
    
        const indexOfLastReport = currentPage * reportsPerPage;
        const indexOfFirstReport = indexOfLastReport - reportsPerPage;
        const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
        setReports(currentReports);
      };
  //      
    const totalPages = Math.ceil(
        allReports.filter(report => 
          report.content.includes(searchQuery) ||
          report.address.includes(searchQuery) ||
          report.urgency.includes(searchQuery)
        ).length / reportsPerPage
      );
    
    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
      };
    
    const handlePrevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
      };
    
    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
      };
    
    const handleSearchClick = () => {
        setSearchQuery(searchTerm);
        setCurrentPage(1); 
      };

  return (
    <div className='report-list-container'>
      <div className="report-list">
        <div className="searchBar">
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            value={searchTerm}
            onChange={handleSearchChange}
            style={{ width: '80%' }}
          />
          <button onClick={handleSearchClick} style={{ width: '20%' }}>검색</button>
        </div>
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                {/* 내용,녹취록은 상세페이지에서 */}
                <th>ID</th>
                <th>날짜</th>
                <th>주소</th>
                <th>장소</th>
                <th>대분류</th>
                <th>중분류</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>
                    <Link to={`/reportdetails/${report.id}`}>{report.id}</Link>
                  </td>
                  <td>{report.date}</td>
                  <td>{report.address}</td>
                  <td>{report.location}</td>
                  <td>{report.mainCategory}</td>
                  <td>{report.subCategory}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              &lt;
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
    
  );
};

export default ReportList;
