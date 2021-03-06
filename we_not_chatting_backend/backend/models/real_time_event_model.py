from pydantic import BaseModel


class RealTimeEventBaseModel(BaseModel):
    code: int = 0
    msg_type: str


class FriendRequestModel(RealTimeEventBaseModel):
    msg_type = "friend_request"
    from_id: str
    to_id: str
    msg: str


class MessageDataModel(BaseModel):
    msg_type: int
    msg: str


class MessageSentModel(RealTimeEventBaseModel):
    msg_type = "chat_message"
    from_id: str
    to_id: str
    msg: MessageDataModel


class DeleteFriendModel(RealTimeEventBaseModel):
    msg_type = "delete_friend"
    from_id: str
    delete_id: str


class UpdateProfileModel(RealTimeEventBaseModel):
    msg_type = "update_profile"
    user_id: str
