import { createContext, useState } from "react";
import { IUserProfileModel } from "../models/userProfileModel";

export interface IUserProfileViewModel extends IUserProfileModel {
  mode?: "friend_request" | "friend" | "stranger" | "me";
}

interface IUserProfileViewContext {
  viewModel: IUserProfileViewModel | null;
  setViewModel: React.Dispatch<IUserProfileViewModel | null>;
}

export const UserProfileViewContext = createContext<IUserProfileViewContext | undefined>(undefined);

export default function UserProfileViewContextProvider({ children }: any) {
  const [viewModel, setViewModel] = useState<IUserProfileViewModel | null>(null);

  return (
    <UserProfileViewContext.Provider value={{ viewModel, setViewModel }}>
      {children}
    </UserProfileViewContext.Provider>
  );
}
