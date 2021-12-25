from backend.services.verifiaction_code import verify_verification_code
from backend.database import User


def create_phone_user(phone: str, verification: str) -> bool:
    if not verify_verification_code(phone, verification):
        return False

    new_user = User.create()
    new_user.phone = phone
    new_user.save()
    return True


def create_email_user(email: str, password: str) -> bool:
    new_user = User.create()
    new_user.email = email
    new_user.password = password
    new_user.save()

    return True
