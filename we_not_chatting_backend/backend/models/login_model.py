from pydantic import BaseModel
from typing import Optional


class PhoneLoginModel(BaseModel):
    phone: str
    verification: str


class EmailLoginModel(BaseModel):
    email: str
    password: str
