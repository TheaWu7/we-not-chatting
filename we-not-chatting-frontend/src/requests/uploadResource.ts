import { IUploadResourceDataModel, UploadResourceResponseModel } from "../models/uploadResource";
import { toast } from "react-toastify";

export async function uploadResource(file: File): Promise<IUploadResourceDataModel | null> {
  const req_data = new FormData();
  req_data.append("file", file);

  try {
    const res = await globalThis.axios({
      url: "/resources",
      method: "PUT",
      data: req_data,
    });
    const data: UploadResourceResponseModel | undefined = res.data;
    if (res.status === 201) {
      return {
        file_id: data!.data!.file_id,
      };
    } else {
      if (data) {
        toast.error(`文件上传失败: [${data.code}]${data.msg}`);
      }
      return null;
    }
  } catch (err: any) {
    toast.error(`${err}`);
    return null;
  }
}
