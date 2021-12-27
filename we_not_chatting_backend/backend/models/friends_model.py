from pydantic import BaseModel
from typing import Optional


class SendFriendRequestModel(BaseModel):
    wx_id: str
    msg: str


class SetFriendRemarksModel(BaseModel):
    wx_id: str
    remarks: Optional[str] = None
