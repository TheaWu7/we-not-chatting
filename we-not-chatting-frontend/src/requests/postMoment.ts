import { message } from "antd";
import { IBaseResponseModel } from "../models/baseModel";
import { postMomentResponseModel } from "../models/postMoment";

export async function postMoment(content: string, media: string): Promise<IBaseResponseModel<null> | null> {
  try {
    const res = await globalThis.axios({
      url: "/moments",
      method: "POST",
      data: {
        content,
        media
      }
    });
    const data: postMomentResponseModel = res.data;
    if (data.code !== 0) {
      message.error(data.msg);
      return null;
    } else {
      return data.data!
    }
  } catch (error) {
    message.error("error");
    return null;
  }
}