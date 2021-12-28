import { IBaseResponseModel } from "./baseModel";
import { IGetUserProfileResponseDataModel } from "./getUserProfile";

export interface ISearchUserDataModel
  extends IGetUserProfileResponseDataModel {}

export type SearchUserResponseModel = IBaseResponseModel<ISearchUserDataModel>;
