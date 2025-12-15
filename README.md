# 🏥 EMR Appointment Management System

A modern **Electronic Medical Record (EMR) Appointment Management System** built with **React (Vite)** for the frontend and **FastAPI (Python)** for the backend.  
The application provides a clean dashboard to view, filter, and manage patient appointments efficiently.

---



## ✨ Features

### 📊 Dashboard Overview
- Summary cards showing:
  - Confirmed Appointments
  - Cancelled Appointments
  - Upcoming Appointments
  - Completed Appointments
- Each card displays the total count and acts as a quick filter.

### 📅 Calendar-Based Filtering
- Interactive month-view calendar.
- Clicking a date fetches and displays appointments scheduled for that day.

### 🗂️ Appointment Management
- View appointment details:
  - Patient name
  - Date & time
  - Duration
  - Doctor assigned
  - Appointment type (In-person)
- Update appointment status:
  - Schedule (Confirm)
  - Cancel
  - Complete
- UI updates immediately after status changes.

### 🧭 Tab-Based Filters
- Filter appointments by:
  - All
  - Today
  - Upcoming
  - Past

### 🎨 UI & UX
- Centered, dashboard-style layout.
- White card-based design with subtle shadows.
- Minimal, aesthetic icons for clarity.
- Responsive and professional EMR-style interface.

---

## 🛠️ Tech Stack

### Frontend
- React (Vite)
- Custom CSS (component-based)
- react-icons
- react-calendar

### Backend
- FastAPI (Python 3.x)
- CORS Middleware
- Mock data (no database required)

---

## 📁 Project Structure

### Frontend
Frontend/
├── src/
│   ├── Components/
│   │   ├── Appointment_Card.jsx
│   │   ├── Tabs.jsx
│   │   └── Calendar.jsx
│   ├── Pages/
│   │   └── EMR_Frontend_Assignment.jsx
         ── EMR.css
│   
└── main.jsx 


### Backend
Backend/
├── main.py
├── Process/
│   └── Appointment_Service.py
├── Data/
│   └── mock_data.py
└── requirements.txt


---

## 🚀 Getting Started

### Setup

```bash
cd Backend
python -m venv venv
source venv/bin/activate   # Windows: venv\Scripts\activate
pip install -r requirements.txt
python -m uvicorn main:app --reload
Backend runs on :-
http://127.0.0.1:8000


cd Frontend
npm install
npm run dev
Frontend runs on:-
http://localhost:5173



### 📤 Sample Response

```json
[
  {
    "id": 1,
    "name": "John Doe",
    "date": "2025-01-20",
    "time": "10:30 AM",
    "duration": 30,
    "doctorName": "Dr. Smith",
    "status": "Confirmed"
  },
  {
    "id": 2,
    "name": "Jane Williams",
    "date": "2025-01-21",
    "time": "02:00 PM",
    "duration": 45,
    "doctorName": "Dr. Adams",
    "status": "Upcoming"
  }
] 

## 🔌 API Endpoints & Query Structure

The backend exposes REST APIs for fetching and updating appointment data.

---

### 📥 Get Appointments

**Endpoint**
**Query Parameters (Optional)**

| Parameter | Type | Description |
|--------|------|------------|
| `date` | string | Filter appointments by date (`YYYY-MM-DD`) |
| `status` | string | Filter appointments by status |

**Example Requests**
GET /appointments
GET /appointments?date=2025-01-20
GET /appointments?status=Confirmed
GET /appointments?date=2025-01-20&status=Upcoming
 
Update Appointment Status
PUT /appointments/{appointment_id}/status
**Example Requests**
PUT /appointments/3/status?new_status=Completed


🔐 CORS Configuration

CORS is enabled in FastAPI to allow frontend access:
allow_origins=["http://localhost:5173"]

🧠 Design Decisions
	•	Centralized state management in the main EMR page.
	•	Stateless, reusable UI components.
	•	Clear separation between UI, logic, and API calls.
	•	Date handling normalized to avoid timezone issues.
	•	Status-based and date-based filtering handled independently.

📌 Future Enhancements
	•	Authentication & authorization
	•	Database integration
	•	Appointment creation & editing
	•	Pagination for large datasets
	•	Notifications & reminders



---



    👤 Author

Dhruv Kejriwal
SDE Intern Assignment – EMR Appointment Management System