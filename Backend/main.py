# main.py

import sys
import os
from typing import Optional

sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware

from Process.Appointment_Service import (
    get_appointments,
    update_appointment_status
)

app = FastAPI(title="EMR Appointment Service")
#Cors Used for Cross PLatform 
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

#API ENDPOINTS 

#For Fetching the DATA
@app.get("/appointments")
def fetch_appointments(
    date: Optional[str] = Query(default=None),
    status: Optional[str] = Query(default=None)
):
    return get_appointments(date=date, status=status)

#For Updating DATA 
@app.put("/appointments/{appointment_id}/status")
def change_appointment_status(
    appointment_id: int,
    new_status: str
):
    updated = update_appointment_status(appointment_id, new_status)

    if not updated:
        return {"error": "Appointment not found"}

    return updated