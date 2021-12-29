from typing import Optional

from fastapi import status, Header
from fastapi.responses import JSONResponse

from backend.apis.common_response import AUTHENTICATION_FAILED_RESPONSE
from backend.apis.common_response import MISSING_ARGS_RESPONSE
from backend.app import app
from backend.database import User, Contact
from backend.models import RegisterModel, PhoneLoginModel, LoginResponseModel, SimpleResponseModel, LoginDataModel, \
    GetUserProfileResponseModel, UpdateUserProfileModel
from backend.models.response_model import UserMomentsBgDataModel, GetUserMomentsBgResponseModel
from backend.services.authentication import auth_via_token
from backend.services.create_user import create_phone_user
from backend.services.login import phone_login as phone_login_svc
from backend.services.update_user_profile import update_user_profile, UserNotFoundException
from backend.services.get_user import get_user as get_user_svc
from backend.exceptions import VerificationFailedException, UserExistsWithSamePhone


@app.post("/api/v1/user/register")
def register(data: RegisterModel):
    if data.phone is not None and data.verification is not None and data.pwd is not None:
        try:
            create_phone_user(data.phone, data.verification, data.pwd, data.nickname, data.avatar)
            res = SimpleResponseModel(code=0, msg=None)
            return JSONResponse(res.dict())
        except VerificationFailedException:
            res = SimpleResponseModel(code=401, msg="Verification Failed")
            return JSONResponse(res.dict())
        except UserExistsWithSamePhone:
            res = SimpleResponseModel(code=409, msg="Phone Already Registered")
            return JSONResponse(res.dict())
        except Exception as e:
            res = SimpleResponseModel(code=-1, msg=str(e))
            return JSONResponse(res.dict())

    else:
        return JSONResponse(MISSING_ARGS_RESPONSE)


@app.post("/api/v1/user/login/phone")
def phone_login(data: PhoneLoginModel):
    if data.phone is None or (data.verification is None and data.pwd) is None:
        return JSONResponse(MISSING_ARGS_RESPONSE)

    res_data = phone_login_svc(data.phone, data.verification, data.pwd)
    if res_data is None:
        res = SimpleResponseModel(code=-1, msg="Login Failed")
        return JSONResponse(res.dict())

    user = User.get_or_none(phone=data.phone)

    res_data = LoginDataModel(user_id=res_data[0], token=res_data[1], avatar=user.avatar, nickname=user.nickname,
                              wx_id=user.wx_id)
    res = LoginResponseModel(code=0, msg=None, data=res_data)

    return JSONResponse(res.dict())


@app.get("/api/v1/user/{wx_id}")
def get_user(wx_id: str, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    data = get_user_svc(wx_id, user_id)
    if data is None:
        res = SimpleResponseModel(code=404, msg="User Not Found")
        return JSONResponse(res.dict())

    res = GetUserProfileResponseModel(data=data)
    return JSONResponse(res.dict())


@app.get("/api/v1/user/moments_bg/{user_id}")
def get_user_moments_bg(user_id: str):
    user = User.get_or_none(wx_id=user_id)
    if user is None:
        res = SimpleResponseModel(code=404, msg="User Not Found")
        return JSONResponse(res.dict())

    res = GetUserMomentsBgResponseModel(data=UserMomentsBgDataModel(moments_bg=user.moments_bg))
    return JSONResponse(res.dict())


@app.post("/api/v1/user/moments_bg")
def set_user_moments_bg(data: UserMomentsBgDataModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user = User.get(id=user_id)
    user.moments_bg = data.moments_bg
    user.save()

    res = SimpleResponseModel()
    return JSONResponse(res.dict())


@app.patch("/api/v1/user/profile")
def update_profile(data: UpdateUserProfileModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    try:
        update_user_profile(user_id, data.avatar, data.nickname)
        res = SimpleResponseModel(code=0)
        return JSONResponse(res.dict())

    except UserNotFoundException:
        res = SimpleResponseModel(code=-1, msg="User Not Found")
        return JSONResponse(res.dict())


@app.get("/api/v1/user/search/{info}")
def search_user(info: str):
    user = User.select().where((User.phone == info) | (User.wx_id == info)).get_or_none()
    if user is None:
        res = SimpleResponseModel(msg="User Not Found")
        return JSONResponse(res.dict())

    data = get_user_svc(user.wx_id)

    res = GetUserProfileResponseModel(data=data)
    return JSONResponse(res.dict())
