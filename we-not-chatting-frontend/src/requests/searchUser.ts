import { SearchUserResponseModel, ISearchUserDataModel } from "../models/searchUser";
import { toast } from "react-toastify";

export async function searchUser(searchInfo: string): Promise<ISearchUserDataModel | null> {
  try {
    const res = await globalThis.axios({
      url: `/user/search/${encodeURIComponent(searchInfo)}`,
      method: "GET",
    });
    const data: SearchUserResponseModel = res.data;
    if (data.code !== 0) {
      toast.error(`搜索用户失败: [${data.code}]${data.msg}`);
      return null;
    } else {
      return data.data ?? null;
    }
  } catch (error) {
    toast.error(`${error}`);
    return null;
  }
}
