import { IBaseResponseModel } from "./baseModel";
import { IChatMessageModel } from "./messageModel";

export type GetUnreadMessageResponseModel = IBaseResponseModel<IChatMessageModel[]>;
