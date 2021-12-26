from typing import Optional, List

from pydantic import BaseModel

from backend.models.moments_model import MomentsPostModel


class SimpleResponseModel(BaseModel):
    code: int
    msg: Optional[str]


class LoginResponseModel(BaseModel):
    class LoginDataModel(BaseModel):
        user_id: str
        token: str

    code: int
    msg: Optional[str]
    data: Optional[LoginDataModel]


class GetLatestMomentsResponseModel(BaseModel):
    code: int
    msg: Optional[str]
    data: Optional[List[MomentsPostModel]]
