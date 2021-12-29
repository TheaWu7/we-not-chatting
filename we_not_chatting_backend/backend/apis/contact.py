from typing import Optional

from backend.app import app
from fastapi import Header, status
from fastapi.responses import JSONResponse

from backend.models.real_time_event_model import FriendRequestModel
from backend.models.response_model import SimpleResponseModel, GetUserContactDataModel, GetUserContactResponseModel, GetUserProfileDataModel
from backend.models.friends_model import SendFriendRequestModel, DeleteFriendModel
from backend.models.real_time_event_model import DeleteFriendModel as RealTimeDeleteFriendModel
from backend.apis.common_response import AUTHENTICATION_FAILED_RESPONSE
from backend.services.authentication import auth_via_token
from backend.database import Contact, User
from backend.models.friends_model import SetFriendRemarksModel
from backend.ws.connection_manager import ws_connection_manager


@app.post("/api/v1/friends/request")
async def send_friend_request(data: SendFriendRequestModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user = User.get(id=user_id)

    await ws_connection_manager.send_friend_request(FriendRequestModel(from_id=user.wx_id, to_id=data.wx_id, msg=data.msg))

    res = SimpleResponseModel(code=0)
    return JSONResponse(res.dict())


@app.get("/api/v1/friends")
def get_contact(Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    friends = Contact.select().where(Contact.owner==user_id).join(User, on=(Contact.friend == User.id))

    res_data = GetUserContactDataModel(friends=[])

    contact: Contact
    for contact in friends:
        friend = contact.friend
        f = GetUserProfileDataModel(wx_id=friend.wx_id, avatar=friend.avatar, nickname=friend.nickname, remarks=contact.remarks)
        res_data.friends.append(f)

    res = GetUserContactResponseModel(data=res_data)

    return JSONResponse(res.dict())


@app.delete("/api/v1/friends")
async def delete_contact(data: DeleteFriendModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user = User.get(id=user_id)
    query = Contact.delete().where((Contact.owner==user_id) & (Contact.friend==User.select(User.id).where(User.wx_id == data.wx_id)))
    query.execute()

    await ws_connection_manager.delete_friend(RealTimeDeleteFriendModel(from_id=user.wx_id, delete_id=data.wx_id))

    res = SimpleResponseModel()
    return JSONResponse(res.dict())


@app.post("/api/v1/friends/remarks")
def set_friend_remarks(data: SetFriendRemarksModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    contact = Contact.select(Contact, User).join(User, on=(Contact.friend == User.id)).where(User.wx_id==data.wx_id).limit(1)

    for c in contact:
        c.remarks = data.remarks

    res = SimpleResponseModel(code=0)
    return JSONResponse(res.dict())
