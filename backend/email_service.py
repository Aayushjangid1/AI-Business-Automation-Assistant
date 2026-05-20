import os
import resend
from dotenv import load_dotenv

load_dotenv()

resend.api_key = os.getenv("RESEND_API_KEY")


def send_email_notification(lead):

    params = {
        "from": "onboarding@resend.dev",
        "to": ["aayush.jangid783@gmail.com"],
        "subject": "New Lead Captured",
        "html": f"""
        <h2>New Lead Details</h2>

        <p><b>Name:</b> {lead.name}</p>
        <p><b>Email:</b> {lead.email}</p>
        <p><b>Phone:</b> {lead.phone}</p>
        <p><b>Interest:</b> {lead.interest}</p>
        """
    }

    resend.Emails.send(params)