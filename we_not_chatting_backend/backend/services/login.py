from typing import Optional, Tuple

from backend.cache import auth_token_cache
from backend.services.verifiaction_code import verify_verification_code
from backend.database import User
import nanoid


def phone_login(phone: str, verification: Optional[str], pwd: Optional[str]) -> Optional[Tuple[str, str]]:
    user = User.get_or_none(phone=phone)
    if user is None:
        return None

    if pwd is not None:
        if user.password == pwd:
            token = nanoid.generate(size=32)
            auth_token_cache.set(token, user.id)
            return user.id, token

    if verification is not None:
        if verify_verification_code(phone, verification):
            token = nanoid.generate(size=32)
            auth_token_cache.set(token, user.id)
            return user.id, token

    return None
