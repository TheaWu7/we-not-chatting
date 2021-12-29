import { toast } from "react-toastify";
import { ILoginResponseDataModel, LoginResponseModel } from "../models/login";

export async function login(phone: string, verification?: string, pwd?: string): Promise<ILoginResponseDataModel | null> {
  if (verification === "") {
    verification = undefined;
  }
  if (pwd === "") {
    pwd = undefined;
  }

  try {
    const res = await globalThis.axios({
      url: "/user/login/phone",
      method: "POST",
      data: {
        phone,
        verification,
        pwd
      }
    });

    const data: LoginResponseModel = res.data;
    if (data.code !== 0) {
      // 错误处理
      toast.error(data.msg);
      return null;
    } else {
      return data.data!
    }
  } catch (error) {
    console.log(error)
    return null;
  }
}