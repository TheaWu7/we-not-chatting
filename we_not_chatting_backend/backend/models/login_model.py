from pydantic import BaseModel
from typing import Optional


class PhoneLoginModel(BaseModel):
    phone: str
    pwd: Optional[str]
    verification: Optional[str]
