from typing import Optional

from pydantic import BaseModel


class UploadResourceDataModel(BaseModel):
    file_id: str


class UploadResourceResponseModel(BaseModel):
    code: int = 0
    msg: Optional[str] = None
    data: Optional[UploadResourceDataModel] = None
