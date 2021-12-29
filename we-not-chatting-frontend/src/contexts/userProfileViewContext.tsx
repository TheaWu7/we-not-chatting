import { createContext, useState } from "react";
import { IUserProfileModel } from "../models/userProfileModel";

interface IUserProfileViewContext {
  userModel: IUserProfileModel | null;
  setUserModel: React.Dispatch<IUserProfileModel | null>;
}

export const UserProfileViewContext = createContext<IUserProfileViewContext | undefined>(undefined);

export default function UserProfileViewContextProvider({ children }: any) {
  const [userModel, setUserModel] = useState<IUserProfileModel | null>(null);

  return (
    <UserProfileViewContext.Provider value={{ userModel, setUserModel }}>
      {children}
    </UserProfileViewContext.Provider>
  );
}
