from typing import Dict

from fastapi.websockets import WebSocket


class ConnectionManager:

    def __init__(self):
        self.connections: Dict[str, WebSocket] = {}

    async def connect(self, ws: WebSocket):
        await ws.accept()


ws_connection_manager = ConnectionManager()
