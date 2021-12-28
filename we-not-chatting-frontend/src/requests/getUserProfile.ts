import { message } from "antd";
import { GetUserProfileResponseModel, IGetUserProfileResponseDataModel } from "../models/getUserProfile";

export async function getUserProfile(): Promise<IGetUserProfileResponseDataModel | null> {
  try {
    const res = await globalThis.axios({
      url: "/user/:wx_id",
      method: "GET",
      params: {

      }
    });
    const data: GetUserProfileResponseModel = res.data;
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