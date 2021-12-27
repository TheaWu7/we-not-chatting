from pydantic import BaseModel
from typing import Optional


class RegisterModel(BaseModel):
    phone: str
    pwd: str
    verification: str
    nickname: str
    avatar: str
