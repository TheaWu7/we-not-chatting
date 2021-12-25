from pydantic import BaseModel
from typing import Optional


class RegisterModel(BaseModel):
    email: Optional[str]
    phone: Optional[str]
    pwd: Optional[str]
    verification: Optional[str]
