import { createContext, useContext, useEffect, useState } from "react";
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
      websocketSvc.onFriendRequest = () => {
        setUserData((data) => {
          return { ...(data as any), nickname: "fuck!!!!!" };
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
