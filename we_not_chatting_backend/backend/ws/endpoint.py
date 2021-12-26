from fastapi.websockets import WebSocket
from backend.app import app
from backend.ws.connection_manager import ws_connection_manager


@app.websocket("/ws")
async def websocket_endpoint(ws: WebSocket):
    await ws_connection_manager.connect(ws)
    while True:
        await ws.receive_json()

