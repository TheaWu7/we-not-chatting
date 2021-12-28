import { toast } from "react-toastify";
import { IBaseResponseModel } from "../models/baseModel";
import { postMomentResponseModel } from "../models/postMoment";

export async function postMoment(content: string, media_type: number, media_content: string[]): Promise<IBaseResponseModel<null> | null> {
  try {
    const res = await globalThis.axios({
      url: "/moments",
      method: "POST",
      data: {
        content,
        media: {
          type: media_type,
          content: media_content
        }
      }
    });
    const data: postMomentResponseModel = res.data;
    if (data.code !== 0) {
      toast.error(data.msg);
      return null;
    } else {
      return data.data!
    }
  } catch (error) {
    toast.error("error");
    return null;
  }
}