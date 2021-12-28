from typing import Optional

from backend.database import User, Contact
from backend.models import GetUserProfileDataModel


def get_user(wx_id: str, user_id: Optional[str] = None) -> Optional[GetUserProfileDataModel]:
    user = User.get_or_none(wx_id=wx_id)
    if user is None:
        return None

    remark = None
    if user_id is not None:
        friend = Contact.get_or_none(owner=user_id, friend=user)
        if friend is not None:
            remark = friend.remarks

    data = GetUserProfileDataModel(avatar=user.avatar, nickname=user.nickname, wx_id=user.wx_id, remarks=remark)
    return data
