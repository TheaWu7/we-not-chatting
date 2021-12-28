import { toast } from "react-toastify";
import { FriendsResponseModel, IFriendsResponseDataModel } from "../models/friends";

export async function getFriends(): Promise<IFriendsResponseDataModel | null> {
  try {
    const res = await globalThis.axios({
      url: "/friends",
      method: "GET",
    })
    const data: FriendsResponseModel = res.data;
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