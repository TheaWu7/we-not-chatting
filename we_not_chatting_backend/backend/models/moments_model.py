from typing import List, Optional

from pydantic import BaseModel


class MomentsMediaModel(BaseModel):
    type: int
    content: List[str]


class PostMomentsModel(BaseModel):
    content: str
    media: Optional[MomentsMediaModel]


class DeleteMomentsModel(BaseModel):
    moments_id: str


class MomentsCommentModel(BaseModel):
    wx_id: str
    content: str


class MomentsPostModel(BaseModel):
    wx_id: str
    content: str
    media: Optional[MomentsMediaModel]
    likes: Optional[List[str]]
    comments: Optional[List[MomentsCommentModel]]
    time: int
    moments_id: str


class LikeMomentModel(BaseModel):
    moments_id: str


class CommentMomentModel(BaseModel):
    moment_id: str
    comment: str
