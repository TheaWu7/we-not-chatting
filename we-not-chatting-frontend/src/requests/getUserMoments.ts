import { toast } from "react-toastify";
import { GetMomentsResponseModel, IGetMomentsResponseDataModel } from "../models/getMoments";

export async function getUserMoments(user: string): Promise<IGetMomentsResponseDataModel | null> {
  try {
    const res = await globalThis.axios({
      url: `/moments/${user}`,
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
    console.log(error);
    toast.error(`获取失败：${error}`);
    return null;
  }
}
