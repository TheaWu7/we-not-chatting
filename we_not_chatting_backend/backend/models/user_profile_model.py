from pydantic import BaseModel
from typing import Optional


class UpdateUserProfileModel(BaseModel):
    nickname: Optional[str] = None
    avatar: Optional[str] = None
