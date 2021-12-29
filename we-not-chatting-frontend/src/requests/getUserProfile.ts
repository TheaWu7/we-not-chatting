import { toast } from "react-toastify";
import { GetUserProfileResponseModel } from "../models/getUserProfile";
import { IUserProfileModel } from "../models/userProfileModel";

export async function getUserProfile(): Promise<IUserProfileModel | null> {
  try {
    const res = await globalThis.axios({
      url: "/user/:wx_id",
      method: "GET",
      params: {},
    });
    const data: GetUserProfileResponseModel = res.data;
    if (data.code !== 0) {
      toast.error(data.msg);
      return null;
    } else {
      return data.data!;
    }
  } catch (error) {
    console.log(error);
    toast.error("error");
    return null;
  }
}
