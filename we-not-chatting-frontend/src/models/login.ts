import { IBaseResponseModel } from "./baseModel";

export interface ILoginResponseDataModel {
  user_id: string;
  token: string;
  avatar: string;
  nickname: string;
  wx_id: string;
}

export type LoginResponseModel = IBaseResponseModel<ILoginResponseDataModel>;
