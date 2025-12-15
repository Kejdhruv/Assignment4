import React from "react";
import "./Appointment_Card.css";
import {
  FaCalendarAlt,
  FaClock,
  FaUserMd,
  FaDna,
  FaTrash,
  FaCheckCircle,
  FaRegCalendarCheck
} from "react-icons/fa";

const AppointmentCard = ({ appointment, onStatusChange }) => {
  return (
    <div className="appointment-card">
      <div className="appointment-info">
        <h3>{appointment.name}</h3>

        <p className="meta-line">
          <FaCalendarAlt className="meta-icon" />
          {appointment.date}

          <span className="dot">•</span>

          <FaClock className="meta-icon" />
          {appointment.time}

          <span className="dot">•</span>

          {appointment.duration} mins
        </p>

        <p className="meta-line">
          <FaUserMd className="meta-icon" />
          {appointment.doctorName}

          <span className="dot">•</span>

          <FaDna className="meta-icon" />
          In-person
        </p>
      </div>

      <div className="appointment-actions">
        <span
          className={`status-badge status-${appointment.status.toLowerCase()}`}
        >
          {appointment.status}
        </span>

       <div className="action-buttons">
  <button
    className="schedule-btn"
    onClick={() => onStatusChange(appointment.id, "Confirmed")}
  >
    <FaRegCalendarCheck className="btn-icon" />
    Schedule
  </button>

  <button
    className="cancel-btn"
    onClick={() => onStatusChange(appointment.id, "Cancelled")}
  >
    <FaTrash className="btn-icon" />
    Cancel
  </button>

  <button
    className="complete-btn"
    onClick={() => onStatusChange(appointment.id, "Completed")}
  >
    <FaCheckCircle className="btn-icon" />
    Complete
  </button>
</div>
      </div>
    </div>
  );
};

export default AppointmentCard;