from random import randint
from typing import Optional

from backend import verification_cache

def send_verification_code(phone: str) -> str:
    code = str(randint(0, 999999)).zfill(6)
    verification_cache.set(phone, code, ex=600)
    return code


def verify_verification_code(phone: str, code: str) -> bool:
    correct_code: Optional[bytes] = verification_cache.get(phone)
    if correct_code is None:
        return False
    passed = correct_code.decode() == code
    if passed:
        verification_cache.delete(phone)

    return passed
