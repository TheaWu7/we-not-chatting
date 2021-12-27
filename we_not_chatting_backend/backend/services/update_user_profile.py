from typing import Optional
from backend.database import User


class UserNotFoundException(Exception):
    pass


def update_user_profile(user_id: str, avatar: Optional[str] = None, nickname: Optional[str] = None):
    user = User.get_or_none(id=user_id)
    if user is None:
        raise UserNotFoundException()

    if avatar is not None:
        user.avatar = avatar

    if nickname is not None:
        user.nickname = nickname

    user.save()
