from random import randint
from backend import verification_cache

def send_verification_code(phone: str) -> str:
    code = str(randint(0, 999999)).zfill(6)
    verification_cache.set(phone, code, ex=600)
    return code


def verify_verification_code(phone: str, code: str) -> bool:
    correct_code = verification_cache.get(phone)
    if correct_code is None:
        return False
    return correct_code == code
