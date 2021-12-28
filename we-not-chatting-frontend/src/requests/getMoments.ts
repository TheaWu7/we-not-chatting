import { toast } from "react-toastify";
import { GetMomentsResponseModel, IGetMomentsResponseDataModel } from "../models/getMoments";

export async function getMoments(): Promise<IGetMomentsResponseDataModel | null> {
  try {
    const res = await globalThis.axios({
      url: "/moments?offset=0",
      method: "GET",
    });
    const data: GetMomentsResponseModel = res.data;
    if (data.code !== 0) {
      toast.error(data.msg);
      return null;
    } else {
      return data.data!;
    }
  } catch (error) {
    toast.error("err");
    return null;
  }
}