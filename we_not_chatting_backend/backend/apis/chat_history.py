from typing import Optional

from fastapi import Header, status, Query
from fastapi.responses import JSONResponse
from backend.app import app
from backend.models import SimpleResponseModel
from backend.models.chat_history_model import ChatHistoryResponseDataModel, ChatHistoryResponseModel
from backend.services.authentication import auth_via_token
from backend.apis.common_response import AUTHENTICATION_FAILED_RESPONSE
from backend.database import User, ChatHistory, Contact


@app.get("/api/v1/chat_history/unread")
def get_unread_messages(Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    from_user_model = User.alias()
    to_user_model = User.alias()

    history = ChatHistory \
        .select() \
        .where((ChatHistory.from_user==user_id) | (ChatHistory.to_user==user_id) & (ChatHistory.sent==False)) \
        .join(from_user_model, on=(ChatHistory.from_user==from_user_model.id)) \
        .switch(ChatHistory) \
        .join(to_user_model, on=(ChatHistory.to_user==to_user_model.id))
    print(history)

    data = []
    for h in history:
        data.append(ChatHistoryResponseDataModel(
                from_user=h.from_user.wx_id,
                to_user=h.to_user.wx_id,
                content_type=h.content_type,
                content=h.content,
                time=h.time
        ))
        h.sent = True
        h.save()

    res = ChatHistoryResponseModel(data=data)
    return JSONResponse(res.dict())


@app.get("/api/v1/chat_history/{friend_id}")
def get_chat_history(friend_id: Optional[str], Authentication: Optional[str] = Header(None), offset: Optional[int] = Query(0)):
    if Authentication is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user_id = auth_via_token(Authentication)
    if user_id is None:
        return JSONResponse(AUTHENTICATION_FAILED_RESPONSE)

    user = User.get(id=user_id)
    friend: User = User.get_or_none(wx_id=friend_id)
    if friend is None:
        res = SimpleResponseModel(code=404, msg="User Not Found")
        return JSONResponse(res.dict())

    history = ChatHistory\
        .select()\
        .where((ChatHistory.from_user == user.id) & (ChatHistory.to_user == friend.id))\
        .orwhere((ChatHistory.to_user == user.id) & (ChatHistory.from_user == friend.id))\
        .order_by(ChatHistory.time.desc())\
        .offset(offset)\
        .limit(100)

    ids = {user.id: user.wx_id, friend.id: friend.wx_id}

    data = []
    for h in history:
        data.append(ChatHistoryResponseDataModel(
                from_user=ids[h.from_user.id],
                to_user=ids[h.to_user.id],
                content_type=h.content_type,
                content=h.content,
                time=h.time
        ))

    res = ChatHistoryResponseModel(data=data)
    return JSONResponse(res.dict())
