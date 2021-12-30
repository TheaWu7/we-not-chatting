import { IBaseResponseModel } from "./baseModel";

export interface IFriendRequestHistoryModel {
  request_id: string;
  from_user: string;
  to_user: string;
  time: number;
  msg: string;
  accepted: boolean;
}

export type IGetFriendRequestHistoryResponseModel = IBaseResponseModel<
  IFriendRequestHistoryModel[]
>;
