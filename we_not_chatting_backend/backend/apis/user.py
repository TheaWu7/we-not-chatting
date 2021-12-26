from backend.app import app
from backend.models import RegisterModel, PhoneLoginModel, LoginResponseModel, SimpleResponseModel, LoginDataModel, GetUserProfileDataModel, GetUserProfileResponseModel
from fastapi.responses import JSONResponse
from fastapi import status
from backend.services.create_user import create_phone_user
from backend.services.login import phone_login as phone_login_svc
from backend.apis.common_response import MISSING_ARGS_RESPONSE
from backend.database import User


@app.post("/api/v1/user/register")
def register(data: RegisterModel):
    if data.phone is not None and data.verification is not None and data.pwd is not None:
        try:
            create_phone_user(data.phone, data.verification, data.pwd)
            res = SimpleResponseModel(code=0, msg=None)
            return JSONResponse(res.dict())
        except Exception as e:
            res = SimpleResponseModel(code=-1, msg=str(e))
            return JSONResponse(res.dict(), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return JSONResponse(MISSING_ARGS_RESPONSE, status_code=status.HTTP_400_BAD_REQUEST)


@app.post("/api/v1/user/login/phone")
def phone_login(data: PhoneLoginModel):
    if data.phone is None or data.verification is None:
        return JSONResponse(MISSING_ARGS_RESPONSE, status_code=400)

    data = phone_login_svc(data.phone, data.verification, data.pwd)
    if data is None:
        res = SimpleResponseModel(code=-1, msg="Login Failed")
        return JSONResponse(res.dict())

    res_data = LoginDataModel(user_id=data[0], token=data[1])
    res = LoginResponseModel(code=0, msg=None, data=res_data)

    return JSONResponse(res.dict())


@app.get("/api/v1/user/{wx_id}")
def get_user(id: str):
    user = User.get(wx_id=id)
    if user is None:
        res = SimpleResponseModel(code=-1, msg="User Not Found")
        return JSONResponse(res.dict())

    data = GetUserProfileDataModel(avatar=user.avatar, nickname=user.nickname)
    res = GetUserProfileResponseModel(data=data)
    return JSONResponse(res.dict())
