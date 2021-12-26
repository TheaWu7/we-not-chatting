from typing import Optional, List

from pydantic import BaseModel

from backend.models.moments_model import MomentsPostModel


class SimpleResponseModel(BaseModel):
    code: int = 0
    msg: Optional[str] = None

class LoginDataModel(BaseModel):
    user_id: str
    token: str

class LoginResponseModel(BaseModel):
    code: int
    msg: Optional[str] = None
    data: Optional[LoginDataModel] = None


class GetLatestMomentsDataModel(BaseModel):
    posts: Optional[List[MomentsPostModel]] = None


class GetLatestMomentsResponseModel(BaseModel):
    code: int
    msg: Optional[str] = None
    data: GetLatestMomentsDataModel = None


class GetUserProfileDataModel(BaseModel):
    avatar: Optional[str] = None
    nickname: Optional[str] = None


class GetUserProfileResponseModel(BaseModel):
    code: int = 0
    msg: Optional[str] = None
    data: Optional[GetUserProfileDataModel] = None
