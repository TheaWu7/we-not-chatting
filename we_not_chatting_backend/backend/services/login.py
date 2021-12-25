from typing import Optional

from backend.cache import auth_token_cache
from backend.services.verifiaction_code import verify_verification_code
from backend.database import User
import nanoid


def phone_login(phone: str, verification: str) -> Optional[str]:
    user = User.get(phone=phone)
    if user is None:
        return None

    if verify_verification_code(phone, verification):
        token = nanoid.generate(size=32)
        auth_token_cache.set(user.id, token)
        return token

    return None


def email_login(email: str, pwd: str) -> Optional[str]:
    user = User.get(email=email, password=pwd)
    if user is None:
        return None

    token = nanoid.generate(size=32)
    auth_token_cache.set(user.id, token)
    return token
