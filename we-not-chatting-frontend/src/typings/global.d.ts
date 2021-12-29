import { AxiosInstance } from "axios";
import { WebSocketService } from "../websocket_svc/websocket_service";

declare global {
  declare module globalThis {
    var axios: AxiosInstance;
    var websocketSvc: WebSocketService | undefined;
  }
}
