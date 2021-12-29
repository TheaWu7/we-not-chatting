import { IBaseResponseModel } from "./baseModel";
import { IUserProfileModel } from "./userProfileModel";

export interface ISearchUserDataModel extends IUserProfileModel {}

export type SearchUserResponseModel = IBaseResponseModel<ISearchUserDataModel>;
