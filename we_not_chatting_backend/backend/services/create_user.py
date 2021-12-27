import nanoid

from backend.services.verifiaction_code import verify_verification_code
from backend.database import User
from backend.exceptions import VerificationFailedException, UserExistsWithSamePhone


def create_phone_user(phone: str, verification: str, pwd: str, nickname: str, avatar: str) -> bool:
    if not verify_verification_code(phone, verification):
        raise VerificationFailedException()

    user = User.get(phone=phone)
    if user is not None:
        raise UserExistsWithSamePhone()

    wx_id = "wnc_id_" + nanoid.generate(size=20)
    new_user = User.create(id=nanoid.generate(size=16), phone=phone, password=pwd, wx_id=wx_id, nickname=nickname, avatar=avatar)
    new_user.save()
    return True
