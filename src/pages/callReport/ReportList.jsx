import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 서버랑 연결할 때 사용
// const ReportList = () => {
//   const [reports, setReports] = useState([]);

//   useEffect(() => {
//     fetchReports();
//   }, []);

//   const fetchReports = async () => {
//     try {
//       const response = await fetch('/api/reports'); // API 주소
//       const data = await response.json();
//       setReports(data);
//     } catch (error) {
//       console.error('신고 데이터를 가져오는 데 실패했습니다:', error);
//     }
//   };

//임시데이터 
const ReportList = () => {
    const allReports = [
      { id: 1, content: '신고 내용 1', address: '서울시 강남구', urgency: '높음' },
      { id: 2, content: '신고 내용 2', address: '서울시 서초구', urgency: '중간' },
      { id: 3, content: '신고 내용 3', address: '서울시 종로구', urgency: '낮음' },
      { id: 4, content: '신고 내용 4', address: '서울시 강동구', urgency: '높음' },
      { id: 5, content: '신고 내용 5', address: '서울시 송파구', urgency: '중간' },
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
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>주소</th>
              <th>긴급도</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((report) => (
              <tr key={report.id}>
                <td>
                  <Link to={`/reportdetails/${report.id}`}>{report.id}</Link>
                </td>
                <td>{report.address}</td>
                <td>{report.urgency}</td>
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
    
  );
};

export default ReportList;
