// components/main/CalendarComponent.jsx
import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styled from 'styled-components';

const localizer = momentLocalizer(moment);

const CalendarWrapper = styled.div`
  position: relative;
  top: 50px; /* 원하는 위치로 조정 */
  left: 50px; /* 원하는 위치로 조정 */
  width: 400px; /* 너비를 조정 */
  height: 400px; /* 높이를 조정 */
  z-index: 2; /* 대시보드 div 위에 위치하도록 z-index 설정 */

  .rbc-calendar {
    background-color: #f0f0f0;
    border-radius: 10px;
    padding: 10px;
    height: 100%;
    width: 100%;
  }

  .rbc-toolbar {
    background-color: #444;
    color: white;
    border-radius: 10px;
  }

  .rbc-header {
    background-color: #333;
    color: white;
    border-radius: 10px;
  }

  .rbc-day-bg {
    background-color: #eaeaea;
  }

  .rbc-today {
    background-color: #ffeb3b;
  }

  .rbc-event {
    background-color: #3174ad;
    color: white;
  }
`;

const CalendarComponent = () => {
  const [events, setEvents] = useState([]);

  const handleSelect = ({ start, end }) => {
    const title = window.prompt('New Event name');
    if (title) {
      setEvents([
        ...events,
        {
          start,
          end,
          title,
        },
      ]);
    }
  };

  return (
    <CalendarWrapper>
      <Calendar
        localizer={localizer}
        events={events}
        selectable
        onSelectSlot={handleSelect}
        defaultView="month"
      />
    </CalendarWrapper>
  );
};

export default CalendarComponent;
