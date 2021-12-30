import { toast } from "react-toastify";
import { IBaseResponseModel } from "../models/baseModel";
import { postMomentResponseModel } from "../models/postMoment";
import { uploadResource } from "./uploadResource";

interface IPostMomentData {
  content: string;
  media_type?: number;
  media_content?: File[];
}

export async function postMoment({
  content,
  media_content,
  media_type,
}: IPostMomentData): Promise<IBaseResponseModel<null> | null> {
  const fileIds: string[] = [];
  if (media_content && media_type !== undefined) {
    const res = await Promise.all(media_content.map((v) => uploadResource(v)));
    if (res.every((v) => v !== null)) {
      res.forEach((v) => {
        fileIds.push(v!.file_id);
      });
    }
  }

  try {
    const req_data: any = {
      content,
    };
    if (media_content && media_type !== undefined) {
      req_data["media"] = {
        type: media_type,
        content: fileIds,
      };
    }
    const res = await globalThis.axios({
      url: "/moments",
      method: "POST",
      data: req_data,
    });
    const data: postMomentResponseModel = res.data;
    if (data.code !== 0) {
      toast.error(data.msg);
      return null;
    } else {
      return data.data!;
    }
  } catch (error) {
    toast.error(`${error}`);
    return null;
  }
}
