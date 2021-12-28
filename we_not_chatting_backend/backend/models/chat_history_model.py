from typing import Optional, List

from pydantic import BaseModel


class ChatHistoryResponseDataModel(BaseModel):
    from_user: str
    to_user: str
    time: int
    content: str
    content_type: int = 0


class ChatHistoryResponseModel(BaseModel):
    code: int = 0
    msg: Optional[str] = None
    data: Optional[List[ChatHistoryResponseDataModel]] = None
