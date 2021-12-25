from backend import app
from backend.models import RegisterModel, PhoneLoginModel, EmailLoginModel
from fastapi.responses import JSONResponse
from fastapi import status
from backend.services.create_user import create_email_user, create_phone_user
from backend.services.login import email_login, phone_login
from backend.apis import MISSING_ARGS_RESPONSE
from backend.database import User


@app.post("/api/v1/user/register")
def register(data: RegisterModel):
    if data.email is not None and data.pwd is not None:
        try:
            result = create_email_user(data.email, data.pwd)
            if not result:
                return JSONResponse({
                        "code": -1,
                        "msg" : "Incorrect Verification Code"
                })
        except Exception as e:
            return JSONResponse({
                    "code": -1,
                    "msg" : str(e)
            }, status_code=500)
    if data.phone is not None and data.verification is not None:
        try:
            create_phone_user(data.phone, data.verification)
        except Exception as e:
            return JSONResponse({
                    "code": -1,
                    "msg" : str(e)
            }, status_code=500)
    else:
        return JSONResponse(MISSING_ARGS_RESPONSE, status_code=status.HTTP_400_BAD_REQUEST)


@app.post("/api/v1/user/login/phone")
def phone_login(data: PhoneLoginModel):
    if data.phone is None or data.verification is None:
        return JSONResponse(MISSING_ARGS_RESPONSE, status_code=400)

    token = phone_login(data.phone, data.verification)
    if token is None:
        return JSONResponse({
                "code": -1,
                "msg": "Login Failed"
        })

    return JSONResponse(
            {
                    "code": -1,
                    "msg": None,
                    "data": {
                            "token": token
                    }
            }
    )


@app.post("/api/v1/user/login/email")
def email_login(data: EmailLoginModel):
    if data.email is None or data.password is None:
        return JSONResponse(MISSING_ARGS_RESPONSE, status_code=400)

    token = email_login(data.email, data.password)
    if token is None:
        return JSONResponse({
                "code": -1,
                "msg": "Login Failed"
        })

    return JSONResponse({
            "code": 0,
            "msg": None,
            "data": {
                    "token": token
            }
    })


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
