import Cookies from "js-cookie";
import { WEBSOCKET_SERVICE_URL } from "../constant";
import { IFriendRequestEventModel, IRealTimeEventBaseModel } from "../models/realTimeEventModels";

export class WebSocketService {
  public ws: WebSocket;
  public onFriendRequest?: (from_id: string, to_id: string, msg: string) => void;

  constructor() {
    this.ws = new WebSocket(`${WEBSOCKET_SERVICE_URL}/${localStorage["wnc_token"]}`);
    this.ws.onmessage = (ev: MessageEvent<string>) => {
      const res_data = JSON.parse(ev.data) as IRealTimeEventBaseModel;
      switch (res_data.msg_type) {
        case "friend_request":
          const data = res_data as IFriendRequestEventModel;
          this.onFriendRequest && this.onFriendRequest(data.from_id, data.to_id, data.msg);
          break;
      }
    };
  }

  dispose() {
    this.ws.close();
  }
}
