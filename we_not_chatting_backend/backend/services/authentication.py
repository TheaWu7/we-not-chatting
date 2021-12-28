from backend.cache import auth_token_cache

from typing import Optional


def auth_via_token(token: str) -> Optional[str]:
    user_id = auth_token_cache.get(token)
    return user_id.decode() if user_id is not None else None
