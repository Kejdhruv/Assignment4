import React, { useEffect, useState } from "react";

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
  <div className="min-h-screen bg-slate-100">
    <div className="max-w-6xl mx-auto px-6 py-10">
      
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-slate-900">
          Appointment Management
        </h1>
        <p className="text-sm text-slate-500 mt-1">
          Schedule and manage patient appointments
        </p>
      </div>

      {/* Appointments */}
      <div className="space-y-4">
        {appointments.length === 0 && (
          <p className="text-slate-500">No appointments found.</p>
        )}

        {appointments.map((appt) => (
          <div
            key={appt.id}
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex items-center justify-between"
          >
            <div>
              <h3 className="font-medium text-slate-900">
                {appt.name}
              </h3>
              <p className="text-sm text-slate-500 mt-1">
                {appt.date} • {appt.time} • {appt.duration} mins
              </p>
              <p className="text-sm text-slate-600">
                {appt.doctorName}
              </p>
            </div>

            {/* Status badge */}
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium
                ${
                  appt.status === "Confirmed"
                    ? "bg-green-100 text-green-700"
                    : appt.status === "Cancelled"
                    ? "bg-red-100 text-red-700"
                    : appt.status === "Completed"
                    ? "bg-gray-200 text-gray-700"
                    : "bg-indigo-100 text-indigo-700"
                }
              `}
            >
              {appt.status}
            </span>
          </div>
        ))}
      </div>
    </div>
  </div>
);
};

export default EMR_Frontend_Assignment;