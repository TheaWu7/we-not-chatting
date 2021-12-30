import { toast } from "react-toastify";
import { IBaseResponseModel } from "../models/baseModel";

export async function setFriendRemark(wx_id: string, remarks: string) {
  try {
    const res = await globalThis.axios({
      url: "/friends/remarks",
      method: "POST",
      data: {
        wx_id,
        remarks,
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
