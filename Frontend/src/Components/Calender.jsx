import React from "react";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import "./Calender.css";

const AppointmentCalendar = ({ selectedDate, onDateSelect }) => {
  return (
    <div className="calendar-wrapper">
      <Calendar
        value={selectedDate}
        onChange={(date) => {
          // date is a JS Date object (correct)
          onDateSelect(date);
        }}
      />
    </div>
  );
};

export default AppointmentCalendar; 