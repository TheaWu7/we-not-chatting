from pydantic import BaseModel


class SendFriendRequestModel(BaseModel):
    wx_id: str
    msg: str
