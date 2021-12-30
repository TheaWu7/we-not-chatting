import { toast } from "react-toastify";
import {
  IFriendRequestHistoryModel,
  IGetFriendRequestHistoryResponseModel,
} from "../models/friendRequestHistory";

export async function getFriendRequestHistory(): Promise<IFriendRequestHistoryModel[] | null> {
  try {
    const res = await globalThis.axios({
      url: "/chat_history/friend_request",
      method: "GET",
    });

    const data: IGetFriendRequestHistoryResponseModel = res.data;
    if (data.code === 0) {
      return data.data!;
    } else {
      return null;
    }
  } catch (error) {
    toast.error(`${error}`);
    return null;
  }
}
