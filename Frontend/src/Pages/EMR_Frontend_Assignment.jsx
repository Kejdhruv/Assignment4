import React, { useEffect, useState } from "react";
import "./EMR.css";

import AppointmentCard from "../Components/Appointment_Card";
import Tabs from "../Components/Tabs";
import AppointmentCalendar from "../Components/Calender"

import {
  FaCheckCircle,
  FaTimesCircle,
  FaClock,
  FaCalendarAlt,
} from "react-icons/fa";

const API_BASE = "http://127.0.0.1:8000";

const EMR_Frontend_Assignment = () => {
  const [allAppointments, setAllAppointments] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeFilter, setActiveFilter] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);

  // -------------------------
  // FETCH ALL APPOINTMENTS
  // -------------------------
  useEffect(() => {
    fetch(`${API_BASE}/appointments`)
      .then((res) => res.json())
      .then((data) => {
        setAllAppointments(data);
        setAppointments(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // -------------------------
  // FILTER BY STATUS / TAB / CARD
  // -------------------------
  const filterByStatus = (status) => {
    setSelectedDate(null);
    setActiveFilter(status);

    if (status === "All") {
      setAppointments(allAppointments);
    } else {
      setAppointments(allAppointments.filter(a => a.status === status));
    }
  };

  // -------------------------
  // FILTER BY DATE (CALENDAR)
  // -------------------------
  const handleDateSelect = (dateObj) => {
    setSelectedDate(dateObj);
    setActiveFilter("");

    const formatted = dateObj.toLocaleDateString("en-CA");

    fetch(`${API_BASE}/appointments?date=${formatted}`)
      .then((res) => res.json())
      .then((data) => setAppointments(data));
  };

  // -------------------------
  // STATUS UPDATE
  // -------------------------
  const handleStatusChange = (id, newStatus) => {
    fetch(
      `${API_BASE}/appointments/${id}/status?new_status=${newStatus}`,
      { method: "PUT" }
    )
      .then(() => fetch(`${API_BASE}/appointments`))
      .then((res) => res.json())
      .then((data) => {
        setAllAppointments(data);
        setAppointments(data);
      });
  };

  if (loading) return <p className="loading">Loading...</p>;

  // -------------------------
  // COUNTS FOR DASHBOARD CARDS
  // -------------------------
  const count = (status) =>
    allAppointments.filter(a => a.status === status).length;

  return (
    <div className="emr-page">
      <div className="emr-container">

        {/* ===== DASHBOARD CARDS ===== */}
       <div className="stats-container">

  <div className="stat-card" onClick={() => filterByStatus("Confirmed")}>
    <div className="stat-content">
      <h2>{count("Confirmed")}</h2>
      <p>Confirmed Appointments</p>
    </div>
    <div className="icon-box confirmed">
      <FaCheckCircle />
    </div>
  </div>

  <div className="stat-card" onClick={() => filterByStatus("Cancelled")}>
    <div className="stat-content">
      <h2>{count("Cancelled")}</h2>
      <p>Cancelled Appointments</p>
    </div>
    <div className="icon-box cancelled">
      <FaTimesCircle />
    </div>
  </div>

  <div className="stat-card" onClick={() => filterByStatus("Upcoming")}>
    <div className="stat-content">
      <h2>{count("Upcoming")}</h2>
      <p>Upcoming Appointments</p>
    </div>
    <div className="icon-box upcoming">
      <FaClock />
    </div>
  </div>

  <div className="stat-card" onClick={() => filterByStatus("Completed")}>
    <div className="stat-content">
      <h2>{count("Completed")}</h2>
      <p>Completed Appointments</p>
    </div>
    <div className="icon-box scheduled">
      <FaCalendarAlt />
    </div>
  </div>

</div>

        {/* ===== BOTTOM SECTION ===== */}
        <div className="bottom-container">

          {/* LEFT: CALENDAR */}
          <div className="calendar-container">
            <AppointmentCalendar
              selectedDate={selectedDate}
              onDateSelect={handleDateSelect}
            />
          </div>

          {/* RIGHT: APPOINTMENTS */}
          <div className="appointments-container">

            <div className="appointments-header">
              <Tabs
                activeTab={activeFilter}
                onTabChange={filterByStatus}
                showAll
              />
            </div>

            {appointments.length === 0 && (
              <p className="empty">No appointments found.</p>
            )}

            {appointments.map(appt => (
              <AppointmentCard
                key={appt.id}
                appointment={appt}
                onStatusChange={handleStatusChange}
              />
            ))}

          </div>
        </div>

      </div>
    </div>
  );
};

export default EMR_Frontend_Assignment;