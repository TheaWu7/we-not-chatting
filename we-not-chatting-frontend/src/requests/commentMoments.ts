import { toast } from "react-toastify";
import { IBaseResponseModel } from "../models/baseModel";
import { CommentMomentsResponseModel } from "../models/commentMoments";

export async function CommentMoments(
  moment_id: string,
  comment: string
): Promise<IBaseResponseModel<null> | null> {
  try {
    const res = await globalThis.axios({
      url: "/moments/comment",
      method: "POST",
      data: {
        moment_id,
        comment,
      },
    });
    const data: CommentMomentsResponseModel = res.data;
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
