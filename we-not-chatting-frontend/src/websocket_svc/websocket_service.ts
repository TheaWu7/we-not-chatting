import { WEBSOCKET_SERVICE_URL } from "../constant";
import {
  IFriendRequestAcceptedEventModel,
  IFriendRequestEventModel,
  IRealTimeEventBaseModel,
} from "../models/realTimeEventModels";

export class WebSocketService {
  public ws?: WebSocket;
  public onFriendRequest?: (
    request_id: string,
    from_id: string,
    to_id: string,
    time: number,
    msg: string
  ) => void;
  public onFriendRequestAccepted?: (data: IFriendRequestAcceptedEventModel) => void;
  public onDisconnect?: () => void;

  constructor() {
    this.connect();
  }

  connect() {
    this.ws = new WebSocket(`${WEBSOCKET_SERVICE_URL}/${localStorage["wnc_token"]}`);
    this.ws.onmessage = (ev: MessageEvent<string>) => {
      const res_data = JSON.parse(ev.data) as IRealTimeEventBaseModel;
      switch (res_data.msg_type) {
        case "friend_request":
          const friendReqData = res_data as IFriendRequestEventModel;
          this.onFriendRequest &&
            this.onFriendRequest(
              friendReqData.request_id,
              friendReqData.from_id,
              friendReqData.to_id,
              friendReqData.time,
              friendReqData.msg
            );
          break;
        case "friend_request_accepted":
          const friendReqAccData = res_data as IFriendRequestAcceptedEventModel;
          this.onFriendRequestAccepted && this.onFriendRequestAccepted(friendReqAccData);
          break;
      }
    };
  }

  dispose() {
    this.ws?.close();
  }
}
