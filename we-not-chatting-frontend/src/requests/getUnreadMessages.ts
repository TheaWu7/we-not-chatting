import { toast } from "react-toastify";
import { GetUnreadMessageResponseModel } from "../models/getUnreadMessage";
import { IChatMessageModel } from "../models/messageModel";

export async function getUnreadMessages(): Promise<IChatMessageModel[] | null> {
  try {
    const res = await globalThis.axios({
      url: "/chat_history/unread",
      method: "GET",
    });
    const data: GetUnreadMessageResponseModel = res.data;
    if (res.status === 200) {
      return data.data!;
    } else {
      if (res.data && data.msg) {
        toast.error(`获取未读消息失败: [${data.code}]${data.msg}`);
      } else {
        toast.error(`获取未读消息失败: 未知错误`);
      }
      return null;
    }
  } catch (error) {
    toast.error(`获取未读消息失败: ${error}`);
    return null;
  }
}
