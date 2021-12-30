import { toast } from "react-toastify";
import { IBaseResponseModel } from "../models/baseModel";

export async function acceptFriendRequest(request_id: string) {
  try {
    const res = await globalThis.axios({
      url: "/friends/accept",
      method: "POST",
      data: {
        request_id,
      },
    });

    const data: IBaseResponseModel<null> = res.data;
    if (data.code !== 0) {
      toast.error(`失败: [${data.code}]${data.msg}`);
    }
  } catch (error) {
    toast(`${error}`);
  }
}
