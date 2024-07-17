import React from 'react';

const ReportItem = ({ report }) => {
  return (
    <tr>
      <td>{report.id}</td>
      <td>{report.content}</td>
      <td>{report.address}</td>
      <td>{report.urgency}</td>
    </tr>
  );
};

export default ReportItem;
