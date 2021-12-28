import { message } from "antd";
import { IBaseResponseModel } from "../models/baseModel";
import { updateUserProfileResponseModel } from "../models/updateUserProfile";

export async function updateUserProfile(avatar: string, nickname: string,): Promise<IBaseResponseModel<null> | null> {
  try {
    const res = await globalThis.axios({
      url: "/user/profile",
      method: "PATCH",
      params: {
        avatar,
        nickname
      }
    });
    const data: updateUserProfileResponseModel = res.data;
    if (data.code !== 0) {
      message.error(data.msg);
      return null;
    } else {
      return data.data!;
    }
  } catch (error) {
    message.error("error")
    return null;
  }
}