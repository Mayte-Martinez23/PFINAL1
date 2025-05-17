import 'react-calendar/dist/Calendar.css';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import { useState } from "react";
import styled from "styled-components";

const CalendarContainer = styled.div`
  margin-top: 1.5rem;
  padding: 1.5rem;
  border-radius: 12px;
  background-color: #ffffff;
  box-shadow: 0 6px 15px rgba(0,0,0,0.1);
`;

const CalendarTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: 700;
  color: #1e40af;
  margin-bottom: 1rem;
  text-align: center;
`;

const Calendar = () => {
  const [events, setEvents] = useState([
    {
      title: "Consulta con Juan",
      start: "2025-05-20T10:00:00",
      end: "2025-05-20T10:30:00"
    }
  ]);

  const handleDateSelect = (selectInfo) => {
    const title = prompt("Nombre del paciente:");
    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
      };
      setEvents([...events, newEvent]);
    }
  };

  return (
    <CalendarContainer>
      <CalendarTitle>Agenda de Citas</CalendarTitle>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="timeGridWeek"
        selectable={true}
        select={handleDateSelect}
        events={events}
        headerToolbar={{
          start: "prev,next today",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height="auto"
        eventColor="#2563eb"  // Azul profesional para eventos
        dayHeaderClassNames={() => "fc-day-header-custom"}
      />
      <style>
        {`
          .fc-day-header-custom {
            color: #1e40af !important;
            font-weight: 600 !important;
          }
          .fc .fc-toolbar-title {
            color: #1e40af;
            font-weight: 700;
          }
          .fc .fc-button {
            background-color: #2563eb;
            border: none;
            color: white;
            font-weight: 600;
          }
          .fc .fc-button:hover {
            background-color: #1e40af;
          }
          .fc .fc-button-active {
            background-color: #1e40af;
          }
          .fc .fc-scrollgrid-sync-inner {
            background: #f9fafb;
          }
        `}
      </style>
    </CalendarContainer>
  );
};

export default Calendar;
