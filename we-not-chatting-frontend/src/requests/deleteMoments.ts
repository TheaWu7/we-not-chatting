import { message } from "antd";
import { IBaseResponseModel } from "../models/baseModel";
import { deleteMomentResponseModel } from "../models/deleteMoments";

export async function deleteMoment(): Promise<IBaseResponseModel<null> | null> {
  try {
    const res = await globalThis.axios({
      url: "/moments",
      method: "DELETE",
    })
    const data: deleteMomentResponseModel = res.data
    if (data.code !== 0) {
      message.error(data.msg);
      return null;
    } else {
      return data.data!;
    }
  } catch (error) {
    console.log(error)
    message.error("error");
    return null;
  }
}