import React, { useEffect, useState } from "react";
import "./EMR.css";
import AppointmentCard from "../Components/Appointment_Card";
import Tabs from "../Components/Tabs"
import AppointmentCalendar from "../components/Calender";

const API_BASE = "http://127.0.0.1:8000";

const EMR_Frontend_Assignment = () => {
  const [appointments, setAppointments] = useState([]);
  const [allAppointments, setAllAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [activeTab, setActiveTab] = useState("All");
  const [selectedDate, setSelectedDate] = useState(null);

  // INITIAL DATA FETCH
  useEffect(() => {
    fetch(`${API_BASE}/appointments`)
      .then((res) => res.json())
      .then((data) => {
        setAppointments(data);
        setAllAppointments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching appointments:", err);
        setLoading(false);
      });
  }, []);

  // TAB FILTERING
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    setSelectedDate(null);

    const today = new Date().toISOString().split("T")[0];

    if (tab === "All") {
      setAppointments(allAppointments);
    } else if (tab === "Today") {
      setAppointments(allAppointments.filter((a) => a.date === today));
    } else if (tab === "Upcoming") {
      setAppointments(allAppointments.filter((a) => a.date > today));
    } else if (tab === "Past") {
      setAppointments(allAppointments.filter((a) => a.date < today));
    }
  };

  // -------------------------
  // CALENDAR FILTERING
  // -------------------------
const handleDateSelect = (dateObj) => {
  setSelectedDate(dateObj);
  setActiveTab("");

  // Format date safely (local date, no timezone bug)
  const formattedDate = dateObj.toLocaleDateString("en-CA");

  fetch(`${API_BASE}/appointments?date=${formattedDate}`)
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
        setAppointments(data);
        setAllAppointments(data);
      });
  };

  // -------------------------
  // LOADING STATE
  // -------------------------
  if (loading) {
    return <p style={{ padding: 20 }}>Loading appointments...</p>;
  }

  return (
    <div className="emr-page">
      <div className="emr-container">

        {/* Header */}
        <div className="emr-header">
          <h1>Appointment Management</h1>
          <p>Schedule and manage patient appointments</p>
        </div>

        {/* Tabs */}
        <Tabs activeTab={activeTab} onTabChange={handleTabChange} />

        {/* Calendar */}
     <AppointmentCalendar
  selectedDate={selectedDate}
  onDateSelect={handleDateSelect}
/>

        {/* Appointment List */}
        {appointments.length === 0 && (
          <p>No appointments found.</p>
        )}

        {appointments.map((appt) => (
          <AppointmentCard
            key={appt.id}
            appointment={appt}
            onStatusChange={handleStatusChange}
          />
        ))}

      </div>
    </div>
  );
};

export default EMR_Frontend_Assignment;