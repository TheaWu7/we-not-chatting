import { IBaseResponseModel } from './baseModel';

export interface IGetUserProfileResponseDataModel {
  avatar: string;
  nickname: string;
  remarks: string | null;
  wx_id: string;
}

export type GetUserProfileResponseModel = IBaseResponseModel<IGetUserProfileResponseDataModel>;