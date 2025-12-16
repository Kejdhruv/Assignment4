from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from mangum import Mangum

from Backend.Process.Appointment_Service import (
    get_appointments,
    update_appointment_status
)

app = FastAPI(title="EMR Appointment Service")

# CORS (update frontend URL after deploy)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/appointments")
def fetch_appointments(
    date: str | None = Query(default=None) , 
    status: str |  None = Query(default=None)
):
    return get_appointments(date=date, status=status)

@app.put("/appointments/{appointment_id}/status")
def change_appointment_status(
    appointment_id: int,
    new_status: str
):
    updated = update_appointment_status(appointment_id, new_status)
    if not updated:
        return {"error": "Appointment not found"}
    return updated

# 👇 THIS is what Vercel runs
handler = Mangum(app)