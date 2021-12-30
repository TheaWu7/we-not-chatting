import { toast } from "react-toastify";
import { GetUserProfileResponseModel } from "../models/getUserProfile";
import { IUserProfileModel } from "../models/userProfileModel";

export async function getUserProfile(userId: string): Promise<IUserProfileModel | null> {
  try {
    const res = await globalThis.axios({
      url: `/user/${userId}`,
      method: "GET",
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
