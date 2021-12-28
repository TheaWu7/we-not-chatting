import { message } from "antd";
import { ILoginResponseDataModel, LoginResponseModel } from "../models/login";

export async function login(phone: string, verification: string): Promise<ILoginResponseDataModel | null> {
  try {
    const res = await globalThis.axios({
      url: "/user/login/phone",
      method: "POST",
      data: {
        phone,
        verification
      }
    });

    const data: LoginResponseModel = res.data;
    if (data.code !== 0) {
      // 错误处理
      message.error(data.msg);
      return null;
    } else {
      return data.data!
    }
  } catch (error) {
    console.log(error)
    return null;
  }
}