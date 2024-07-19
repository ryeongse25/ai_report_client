import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NoticeList = ({notice}) => {
  console.log(notice);
    const reportsPerPage = 5; 
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
  
    // useEffect(() => {
    //   fetchReports();
    // }, [currentPage, searchQuery]);
  
    // const fetchReports = () => {
    //     const filteredReports = allReports.filter(report => 
    //       report.content.includes(searchQuery) ||
    //       report.address.includes(searchQuery) ||
    //       report.urgency.includes(searchQuery)
    //     );
    
    //     const indexOfLastReport = currentPage * reportsPerPage;
    //     const indexOfFirstReport = indexOfLastReport - reportsPerPage;
    //     const currentReports = filteredReports.slice(indexOfFirstReport, indexOfLastReport);
    //     setReports(currentReports);
    //   };
    
    //   const totalPages = Math.ceil(
    //     allReports.filter(report => 
    //       report.content.includes(searchQuery) ||
    //       report.address.includes(searchQuery) ||
    //       report.urgency.includes(searchQuery)
    //     ).length / reportsPerPage
    //   );
    
    //   const handleNextPage = () => {
    //     setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    //   };
    
    //   const handlePrevPage = () => {
    //     setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    //   };
    
    //   const handleSearchChange = (event) => {
    //     setSearchTerm(event.target.value);
    //   };

    //   const handleSearchClick = () => {
    //     setSearchQuery(searchTerm);
    //     setCurrentPage(1); 
    //   };

  return (
      <div className="report-box">
        <div className='table-container'>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>제목</th>
                <th>글쓴이</th>
                <th>시간</th>
              </tr>
            </thead>
            <tbody>
              {notice.map((n, index) => (
                <tr key={index} onClick={() => navigate('/notice/' + n.id)}>
                  <td>{index}</td>
                  <td>{n.fields.title}</td>
                  <td>{n.fields.id}</td>
                  <td>{n.fields.created_at.slice(0, 10)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {/* <div className="pagination">
            <button onClick={handlePrevPage} disabled={currentPage === 1}>
              &lt;
            </button>
            <span>{currentPage} / {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>
              &gt;
            </button>
          </div> */}
        </div>
      </div>
  );
};

export default NoticeList;
