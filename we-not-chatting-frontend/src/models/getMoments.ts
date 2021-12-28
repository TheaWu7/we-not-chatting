import { IBaseResponseModel } from "./baseModel";
import { IGetUserProfileResponseDataModel } from "./getUserProfile";

export interface IMediaModel {
  type: number;
  content: string[];
}
export interface ICommentModel {
  wx_id: string;
  content: string;
}
export interface IGetMomentsModel {
  wx_id: string;
  content: string;
  media: IMediaModel[];
  likes: string[];
  comments: ICommentModel[];
  time: number;
  moments_id: string;
}
export interface IGetMomentsResponseDataModel {
  posts: IGetMomentsModel[];
}
export type GetMomentsResponseModel = IBaseResponseModel<IGetMomentsResponseDataModel>;