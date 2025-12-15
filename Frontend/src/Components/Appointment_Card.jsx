import React from "react";
import "./AppointmentCard.css";

const AppointmentCard = ({ appointment, onStatusChange }) => {
  return (
    <div className="appointment-card">
      <div className="appointment-info">
        <h3>{appointment.name}</h3>
        <p>
          {appointment.date} • {appointment.time} •{" "}
          {appointment.duration} mins
        </p>
        <p>{appointment.doctorName}</p>
      </div>

      <div className="appointment-actions">
        <span
          className={`status-badge status-${appointment.status.toLowerCase()}`}
        >
          {appointment.status}
        </span>

        <div className="action-buttons">
          <button onClick={() => onStatusChange(appointment.id, "Confirmed")}>
            Confirm
          </button>
          <button onClick={() => onStatusChange(appointment.id, "Cancelled")}>
            Cancel
          </button>
          <button onClick={() => onStatusChange(appointment.id, "Completed")}>
            Complete
          </button>
        </div>
      </div>
    </div>
  );
};

export default AppointmentCard;