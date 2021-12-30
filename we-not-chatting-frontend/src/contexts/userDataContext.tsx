import React, { createContext, useEffect, useState } from "react";
import { IFriendRequestHistoryModel } from "../models/friendRequestHistory";
import { IUserProfileModel } from "../models/userProfileModel";

export interface IUserData {
  contact: IUserProfileModel[];
  friend_requests: IFriendRequestHistoryModel[];
  user_id: string;
  avatar: string;
  nickname: string;
  wx_id: string;
  moments_bg?: string;
}

interface IUserDataContextData {
  userData: IUserData | null | undefined;
  setUserData: React.Dispatch<React.SetStateAction<IUserData | null | undefined>>;
}

export const UserDataContext = createContext<IUserDataContextData | undefined>(undefined);

export default function UserDataContextProvider({ children }: any) {
  const [userData, setUserData] = useState<IUserData | null | undefined>(
    localStorage.getItem("user_data") ? JSON.parse(localStorage.getItem("user_data")!) : null
  );

  useEffect(() => {
    if (userData) localStorage["user_data"] = JSON.stringify(userData);
  }, [userData]);

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}
