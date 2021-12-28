import { IBaseResponseModel } from "./baseModel";

export interface IFriendModel {
  avatar: string;
  nickname: string;
  remarks: string;
  wx_id: string;
}

export interface IFriendsResponseDataModel {
  friends: IFriendModel[]
}
export type FriendsResponseModel = IBaseResponseModel<IFriendsResponseDataModel>