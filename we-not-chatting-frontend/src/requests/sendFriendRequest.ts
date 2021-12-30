import { toast } from "react-toastify";
import { IBaseResponseModel } from "../models/baseModel";

export async function sendFriendRequest(wx_id: string, msg: string) {
  try {
    const res = await globalThis.axios({
      url: "/friends/request",
      method: "POST",
      data: {
        wx_id,
        msg,
      },
    });

    const data: IBaseResponseModel<null> = res.data;
    if (data.code !== 0) {
      toast.error(`失败: [${data.code}]${data.msg}`);
    }
  } catch (error) {
    toast.error(`${error}`);
  }
}
