import { useState } from 'react';

import './CustomCalendar.css';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const CustomCalendar = () => {
  const [date, setDate] = useState(new Date());

  const data = [
    { '20240701': 5 },
    { '20240702': 5 },
    { '20240703': 5 },
    { '20240704': 5 },
    { '20240705': 5 },
    { '20240706': 10 },
    { '20240707': 5 },
    { '20240708': 5 },
    { '20240709': 5 },
    { '20240710': 5 },
    { '20240711': 5 },
    { '20240712': 5 },
    { '20240713': 5 },
    { '20240714': 5 },
    { '20240715': 5 },
    { '20240716': 5 },
    { '20240717': 5 },
    { '20240718': 5 },
    { '20240719': 5 },
  ];

  const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}${month}${day}`;
  };

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const formattedDate = formatDate(date);
      const dateEntry = data.find(entry => entry[formattedDate] !== undefined);

      if (dateEntry) {
        const count = dateEntry[formattedDate];
        return <p className="custom-text">{count} 건</p>;
      }
    }
    return null;
  };

  return (
    <div className='calendar-box'>
      <Calendar
        onChange={setDate}
        value={date}
        tileContent={tileContent}
      />
    </div>)
}

export default CustomCalendar;