import { IBaseResponseModel } from "./baseModel";

export interface IGetUserMomentsBgDataModel {
  moments_bg?: string;
}

export type GetUserMomentsResponseModel =
  IBaseResponseModel<IGetUserMomentsBgDataModel>;
