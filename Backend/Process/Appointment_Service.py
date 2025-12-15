
# Simulated Backend Microservice (Lambda)
# GraphQL/AppSync behavior is simulated
# -----------------------------------------

from Data.mock_data import appointments


# QUERY: Fetch Appointments

def get_appointments(date=None, status=None):
 
    results = appointments
    #Search Based on Date and Status 
    if date:
        results = [a for a in results if a["date"] == date]
        
    if status:
        results = [a for a in results if a["status"] == status]

    return results



# MUTATION: Update Status
def update_appointment_status(appointment_id, new_status):
 #Loop for Updating the Data 
    for appointment in appointments:
        if appointment["id"] == appointment_id:
            appointment["status"] = new_status
            return appointment

    return None 

