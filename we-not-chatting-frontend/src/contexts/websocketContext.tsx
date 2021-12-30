import { createContext, useContext, useEffect, useState } from "react";
import { IFriendRequestHistoryModel } from "../models/friendRequestHistory";
import { getFriends } from "../requests/friends";
import { WebSocketService } from "../websocket_svc/websocket_service";
import { UserDataContext } from "./userDataContext";

interface IWebSocketContextData {
  websocketSvc?: WebSocketService;
  setWebsocketSvc: React.Dispatch<WebSocketService | undefined>;
}

export const WebSocketContext = createContext<IWebSocketContextData | undefined>(undefined);

export default function WebSocketContextProvider({ children }: any) {
  const [websocketSvc, setWebsocketSvc] = useState<WebSocketService | undefined>(undefined);
  const { setUserData, userData } = useContext(UserDataContext)!;

  useEffect(() => {
    if (websocketSvc) {
      websocketSvc.onFriendRequest = (request_id, from_user, to_user, time, msg) => {
        setUserData((data) => {
          if (!data) return data;
          const newFriendReq: IFriendRequestHistoryModel = {
            request_id,
            from_user,
            to_user,
            msg,
            time,
            accepted: false,
          };
          const newReqList = [...(data?.friend_requests ?? []), newFriendReq];
          return { ...(data as any), friend_requests: newReqList };
        });
      };

      websocketSvc.onDisconnect = async () => {
        await new Promise((resolve) => {
          setTimeout(() => {
            resolve(null);
          }, 1000);
        });
        websocketSvc.connect();
      };

      websocketSvc.onFriendRequestAccepted = async () => {
        const friends = await getFriends();
        setUserData((data) => {
          if (!data) return data;
          return { ...(data as any), contact: friends?.friends };
        });
      };
    }
  }, [websocketSvc, setUserData]);

  return (
    <WebSocketContext.Provider value={{ websocketSvc, setWebsocketSvc }}>
      {children}
    </WebSocketContext.Provider>
  );
}
