from pydantic import BaseModel


class SendVerificationModel(BaseModel):
    phone: str
