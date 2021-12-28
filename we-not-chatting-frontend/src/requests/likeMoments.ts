import { message } from "antd";
import { IBaseResponseModel } from "../models/baseModel";
import { likeMomentsResponseModel } from "../models/likeMoments";

export async function likeMoments(): Promise<IBaseResponseModel<null> | null> {
  try {
    const res = await globalThis.axios({
      url: "/moments/like",
      method: "POST"
    });
    const data: likeMomentsResponseModel = res.data;
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