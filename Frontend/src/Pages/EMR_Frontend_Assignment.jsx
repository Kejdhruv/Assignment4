import React, { useEffect, useState } from "react";
import "./EMR.css";
const API_BASE = "http://127.0.0.1:8000";

const EMR_Frontend_Assignment = () => {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // -------------------------
  // INITIAL DATA FETCH
  // -------------------------
  useEffect(() => {
    fetch(`${API_BASE}/appointments`)
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, []);

  // -------------------------
  // TEMPORARY RENDER
  // -------------------------
  if (loading) {
    return <p style={{ padding: 20 }}>Loading appointments...</p>;
  }

 return (
  <div className="emr-page">
    <div className="emr-container">

      <div className="emr-header">
        <h1>Appointment Management</h1>
        <p>Schedule and manage patient appointments</p>
      </div>

      {appointments.length === 0 && (
        <p>No appointments found.</p>
      )}

      {appointments.map((appt) => (
        <div key={appt.id} className="appointment-card">
          <div className="appointment-info">
            <h3>{appt.name}</h3>
            <p>{appt.date} • {appt.time} • {appt.duration} mins</p>
            <p>{appt.doctorName}</p>
          </div>

          <span
            className={`status-badge ${
              appt.status === "Confirmed"
                ? "status-confirmed"
                : appt.status === "Cancelled"
                ? "status-cancelled"
                : appt.status === "Completed"
                ? "status-completed"
                : "status-upcoming"
            }`}
          >
            {appt.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);
};

export default EMR_Frontend_Assignment;