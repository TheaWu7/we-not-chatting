import { IBaseResponseModel } from "./baseModel";

export interface IUploadResourceDataModel {
  file_id: string;
}

export type UploadResourceResponseMode =
  IBaseResponseModel<IUploadResourceDataModel>;
