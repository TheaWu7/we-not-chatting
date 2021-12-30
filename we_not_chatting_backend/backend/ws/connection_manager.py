import time
from typing import Dict, Any, Optional, List

import nanoid
from fastapi import WebSocket, WebSocketDisconnect
from pydantic import ValidationError

from backend.models.real_time_event_model import *
from backend.database import ChatHistory, User, FriendRequests


class ConnectionManager:

    def __init__(self):
        self.connections: Dict[str, WebSocket] = {}

    async def connect(self, ws: WebSocket, wx_id: str):
        if wx_id in self.connections:
            await ws.accept()
            await ws.send({
                    "code": -1,
                    "msg": "Another Client Already Exists"
            })
            await ws.close()

        await ws.accept()
        self.connections[wx_id] = ws
        try:
            while True:
                data = await ws.receive_json()
                await self.handleData(ws, data)

        except WebSocketDisconnect:
            del self.connections[wx_id]

    async def handleData(self, ws: WebSocket, data: Dict):
        try:
            data: RealTimeEventBaseModel = RealTimeEventBaseModel.parse_obj(data)
            if data.msg_type == "chat_message":
                pass
        except ValidationError:
            await ws.send({
                    "code": 400,
                    "msg": "Invalid Message"
            })

    def save_chat_history(self, from_: str, to: str, content: str, content_type: int, sent: bool):
        content_type_map = {
                "delete_friend": 10003,
        }
        chat_history = ChatHistory.create(id=nanoid.generate(size=32),
                                          from_user_id=from_,
                                          to_user_id=to,
                                          time=time.time(),
                                          content=content,
                                          content_type=content_type_map[content_type],
                                          sent=sent)
        chat_history.save()

    async def send_if_connected(self, data: Any, to: Optional[str] = None) -> bool:
        sent = False
        if to is not None:
            if to in self.connections:
                await self.connections[to].send_text(data.json())
            return True

        if data.to_id in self.connections:
            await self.connections[data.to_id].send_text(data.json())
            sent = True

        return sent

    async def send_and_save(self, data: Any) -> bool:
        sent = await self.send_if_connected(data)
        from_user = User.get(wx_id=data.from_id)
        to_user = User.get(wx_id=data.to_id)
        if data.msg_type == "chat_message":
            self.save_chat_history(from_user.id, to_user.id, data.msg.msg, data.msg.msg_type, sent)
        else:
            self.save_chat_history(from_user.id, to_user.id, data.msg, data.msg_type, sent)
        return sent

    async def handleSendMessage(self, data: MessageSentModel):
        await self.send_and_save(data)

    async def send_friend_request(self, data: FriendRequestModel) -> bool:
        return await self.send_if_connected(data)

    async def accept_friend_request(self, data: FriendRequestAcceptedModel):
        await self.send_and_save(data)

    async def delete_friend(self, data: DeleteFriendModel):
        await self.send_if_connected(data, to=data.delete_id)

    async def broadcast(self, to: List[str], data: RealTimeEventBaseModel):
        for item in to:
            await self.send_if_connected(data, to=item)


ws_connection_manager = ConnectionManager()
