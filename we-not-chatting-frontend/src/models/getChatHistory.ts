import { IBaseResponseModel } from "./baseModel";
import { IChatMessageModel } from "./messageModel";

export type GetChatHistoryResponseModel = IBaseResponseModel<
  IChatMessageModel[]
>;
