import { toast } from "react-toastify";
import { IBaseResponseModel } from "../models/baseModel";
import { RegisterResponseModel } from "../models/register";
import { uploadResource } from "./uploadResource";

interface IRegisterArgs {
  avatar: File;
  nickname: string;
  phone: string;
  verification: string;
  pwd: string;
}

export async function register({
  avatar,
  nickname,
  verification,
  phone,
  pwd,
}: IRegisterArgs): Promise<IBaseResponseModel<null> | null> {
  try {
    const upload_res = await uploadResource(avatar);
    if (upload_res === null) {
      return null;
    }

    const res = await globalThis.axios({
      url: "/user/register",
      method: "POST",
      data: {
        avatar: upload_res.file_id,
        verification,
        nickname,
        phone,
        pwd,
      },
    });

    const data: RegisterResponseModel = res.data;
    if (data.code !== 0) {
      // 错误处理
      toast.error(data.msg);
      return null;
    } else {
      return data.data!;
    }
  } catch (error: any) {
    console.log(error);
    toast.error(`出错啦${error}`);
    return null;
  }
}
