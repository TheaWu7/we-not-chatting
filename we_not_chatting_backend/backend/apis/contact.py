import time
from typing import Optional

import nanoid

from backend.app import app
from fastapi import Header
from fastapi.responses import JSONResponse

from backend.models.real_time_event_model import FriendRequestModel, FriendRequestAcceptedModel
from backend.models.response_model import SimpleResponseModel, GetUserContactDataModel, GetUserContactResponseModel, GetUserProfileDataModel
from backend.models.friends_model import SendFriendRequestModel, DeleteFriendModel, AcceptFriendModel
from backend.models.real_time_event_model import DeleteFriendModel as RealTimeDeleteFriendModel
from backend.apis.common_response import AUTHENTICATION_FAILED_RESPONSE
from backend.services.authentication import auth_via_token
from backend.database import Contact, User, ChatHistory, FriendRequests
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
    friend: User = User.get_or_none(wx_id=data.wx_id)

    request_id = nanoid.generate()

    sent = await ws_connection_manager.send_friend_request(
            FriendRequestModel(
                    request_id=request_id,
                    from_id=user.wx_id,
                    to_id=data.wx_id,
                    msg=data.msg,
                    time=time.time()
            )
    )
    f_req = FriendRequests.create(id=request_id, from_user=user_id, to_user=friend.id, time=time.time(), content=data.msg, sent=sent)
    f_req.save()

    res = SimpleResponseModel(code=0)
    return JSONResponse(res.dict())


@app.get("/api/v1/friends")
def get_contact(Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    friend_tbl = User.alias()
    owner_tbl = User.alias()

    friends = Contact.select() \
        .where((Contact.owner==user_id) | (Contact.friend==user_id))\
        .join(owner_tbl, on=(Contact.friend == owner_tbl.id))\
        .switch(Contact)\
        .join(friend_tbl, on=(Contact.owner == friend_tbl.id))

    print(friends)

    res_data = GetUserContactDataModel(friends=[])

    contact: Contact
    friends_set = set()
    for contact in friends:
        friend = contact.friend if contact.friend.id != user_id else contact.owner
        if friend.id not in friends_set:
            f = GetUserProfileDataModel(wx_id=friend.wx_id, avatar=friend.avatar, nickname=friend.nickname, remarks=contact.remarks)
            res_data.friends.append(f)
            friends_set.add(friend.id)

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

    contact = Contact.select(Contact, User).join(User, on=(Contact.friend == User.id)).where(User.wx_id==data.wx_id).get_or_none()

    if contact is None:
        user = User.get_or_none(wx_id=data.wx_id)
        c = Contact(id=nanoid.generate(), owner=user_id, friend=user.id, remarks=data.remarks)
        c.save()
    else:
        contact.remarks = data.remarks
        contact.save()

    res = SimpleResponseModel(code=0)
    return JSONResponse(res.dict())


@app.post("/api/v1/friends/accept")
async def accept_friend_request(data: AcceptFriendModel, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    req: FriendRequests = FriendRequests.get_or_none(id=data.request_id)
    if req is None:
        res = SimpleResponseModel(code=404, msg="Request Not Found")
        return JSONResponse(res.dict())

    data = FriendRequestAcceptedModel(from_id=req.to_user, to_id=req.from_user, request_id=req.content)
    req.accepted = True
    req.save()

    contact = Contact.get_or_none(owner=req.from_user, friend=req.to_user)
    if contact is None:
        contact = Contact.create(id=nanoid.generate(), owner=req.from_user, friend=req.to_user)
        contact.save()

        await ws_connection_manager.accept_friend_request(data)

    res = SimpleResponseModel()
    return JSONResponse(res.dict())
