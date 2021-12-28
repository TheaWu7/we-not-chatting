import { toast } from "react-toastify";
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
      toast.error(data.msg);
      return null;
    } else {
      return data.data!;
    }
  } catch (error) {
    console.log(error)
    toast.error("error");
    return null;
  }
}