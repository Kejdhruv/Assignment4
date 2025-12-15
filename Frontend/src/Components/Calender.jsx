import React from "react";
import "./Calender.css";

const Calendar = ({ selectedDate, onDateSelect }) => {
  const today = new Date();

  const dates = Array.from({ length: 7 }, (_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i);
    return d.toISOString().split("T")[0];
  });

  return (
    <div className="calendar">
      <h4>Select Date</h4>

      <div className="calendar-dates">
        {dates.map((date) => (
          <button
            key={date}
            className={`calendar-date ${
              selectedDate === date ? "selected" : ""
            }`}
            onClick={() => onDateSelect(date)}
          >
            {date}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Calendar;