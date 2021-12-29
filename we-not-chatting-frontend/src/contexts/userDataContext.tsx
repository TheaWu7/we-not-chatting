import React, { createContext, useState } from "react";
import { IUserProfileModel } from "../models/userProfileModel";

export interface IUserData {
  contact: IUserProfileModel[];
  user_id: string;
  avatar: string;
  nickname: string;
  wx_id: string;
  moments_bg?: string;
}

interface IUserDataContextData {
  userData: IUserData | null | undefined;
  setUserData: React.Dispatch<IUserData | null | undefined>;
}

export const UserDataContext = createContext<IUserDataContextData | undefined>(undefined);

export default function UserDataContextProvider({ children }: any) {
  const [userData, realSetUserData] = useState<IUserData | null | undefined>(
    localStorage.getItem("user_data") ? JSON.parse(localStorage.getItem("user_data")!) : null
  );

  function setUserData(data: IUserData | null | undefined) {
    if (data) {
      localStorage["user_data"] = JSON.stringify(data);
    } else {
      localStorage.removeItem("user_data");
    }
    realSetUserData(data);
  }

  return (
    <UserDataContext.Provider value={{ userData, setUserData }}>
      {children}
    </UserDataContext.Provider>
  );
}
