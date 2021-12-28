import { message } from "antd";
import { GetMomentsResponseModel, IGetMomentsResponseDataModel } from "../models/getMoments";

export async function getMoments(): Promise<IGetMomentsResponseDataModel | null> {
  try {
    const res = await globalThis.axios({
      url: "/moments?offset=0",
      method: "GET",
    });
    const data: GetMomentsResponseModel = res.data;
    if (data.code !== 0) {
      message.error(data.msg);
      return null;
    } else {
      return data.data!;
    }
  } catch (error) {
    message.error("err");
    return null;
  }
}