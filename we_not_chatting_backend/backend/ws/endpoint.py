from typing import Optional

from fastapi import WebSocket, Header
from backend.app import app
from backend.ws.connection_manager import ws_connection_manager
from backend.services.authentication import auth_via_token
from backend.database import User


@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket, Authentication: Optional[str] = Header(None)):
    if Authentication is None:
        await ws.close()

    user_id = auth_via_token(Authentication)
    if user_id is None:
        await ws.close()
    user = User.get(id=user_id)

    await ws_connection_manager.connect(ws, user.wx_id)

