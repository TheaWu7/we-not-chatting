from typing import Optional

from backend.app import app
from fastapi import Header, status
from fastapi.responses import JSONResponse
from backend.models.response_model import SimpleResponseModel, GetUserContactDataModel, GetUserContactResponseModel, GetUserProfileDataModel
from backend.models.friends_model import SendFriendRequestModel
from backend.apis.common_response import AUTHENTICATION_FAILED_RESPONSE
from backend.services.authentication import auth_via_token
from backend.database import Contact, User


@app.post("/api/v1/friends/request")
def send_friend_request(data: SendFriendRequestModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE, status_code=status.HTTP_401_UNAUTHORIZED)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE, status_code=status.HTTP_401_UNAUTHORIZED)

    # TODO: Send to user via websocket

    res = SimpleResponseModel(code=0)
    return JSONResponse(res.dict())


@app.get("/api/v1/friends")
def get_contact(Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE, status_code=status.HTTP_401_UNAUTHORIZED)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE, status_code=status.HTTP_401_UNAUTHORIZED)

    friends = Contact.select().where(Contact.owner==user_id).join(User, on=(Contact.friend == User.id))

    res_friends = []
    res_data = GetUserContactDataModel(friends=res_friends)

    for friend in friends:
        f = GetUserProfileDataModel(wx_id=friend.wx_id, avatar=friend.avatar, nickname=friend.nickname, remarks=friend.remarks)
        res_friends.append(f)

    res = GetUserContactResponseModel(data=res_data)

    return JSONResponse(res.dict())
