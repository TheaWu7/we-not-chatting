import os
from twilio.rest import Client


if "TWILIO_SID" in os.environ:
    twilio_client = Client(os.environ["TWILIO_SID"], os.environ["TWILIO_TOKEN"])


def send_verification_sms(phone: str, code: str):
    twilio_client.messages.create(to=f"+86{phone}", from_="+12058397318", body=f"Your Verification Code: {code}")
