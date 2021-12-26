from backend import app
from backend.models import RegisterModel, PhoneLoginModel, LoginResponseModel, SimpleResponseModel
from fastapi.responses import JSONResponse
from fastapi import status
from backend.services.create_user import create_phone_user
from backend.services.login import phone_login as phone_login_svc
from backend.apis import MISSING_ARGS_RESPONSE
from backend.database import User


@app.post("/api/v1/user/register")
def register(data: RegisterModel):
    if data.phone is not None and data.verification is not None and data.pwd is not None:
        try:
            create_phone_user(data.phone, data.verification, data.pwd)
            res = SimpleResponseModel(code=0, msg=None)
            return JSONResponse(res.json())
        except Exception as e:
            res = SimpleResponseModel(code=-1, msg=str(e))
            return JSONResponse(res.json(), status_code=status.HTTP_500_INTERNAL_SERVER_ERROR)
    else:
        return JSONResponse(MISSING_ARGS_RESPONSE, status_code=status.HTTP_400_BAD_REQUEST)


@app.post("/api/v1/user/login/phone")
def phone_login(data: PhoneLoginModel):
    if data.phone is None or data.verification is None:
        return JSONResponse(MISSING_ARGS_RESPONSE, status_code=400)

    data = phone_login_svc(data.phone, data.verification, data.pwd)
    if data is None:
        res = SimpleResponseModel(code=-1, msg="Login Failed")
        return JSONResponse(res.json())

    res = LoginResponseModel(code=0, msg=None)
    res.data.user_id = data[0]
    res.data.token = data[1]

    return JSONResponse(res.json())


@app.get("/api/v1/user/{wx_id}")
def get_user(id: str):
    user = User.get(wx_id=id)
    if user is None:
        return JSONResponse({
                "code": -1,
                "msg": "User Not Found"
        })

    return JSONResponse({
            "code": 0,
            "msg": None,
            "data": {
                    "nickname": user.nickname,
                    "avatar": user.avatar,
            }
    })
