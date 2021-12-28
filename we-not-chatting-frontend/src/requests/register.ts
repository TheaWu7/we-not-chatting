import { toast } from "react-toastify";
import { IBaseResponseModel } from "../models/baseModel";
import { RegisterResponseModel } from "../models/register";

export async function register(avatar: string, nickname: string, phone: string, pwd: string): Promise<IBaseResponseModel<null> | null> {
  try {
    const res = await globalThis.axios({
      url: "/user/register",
      method: "POST",
      data: {
        avatar,
        nickname,
        phone,
        pwd
      }
    });

    const data: RegisterResponseModel = res.data;
    if (data.code !== 0) {
      // 错误处理
      toast.error(data.msg);
      return null;
    } else {
      return data.data!
    }
  } catch (error: any) {
    console.log(error)
    toast.error("出错啦");
    return null;
  }
}