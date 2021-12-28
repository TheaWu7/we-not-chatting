import { message } from "antd";
import { IBaseResponseModel } from "../models/baseModel";
import { VerificationResponseModel } from "../models/verification";

export async function verification_sms(phone: string): Promise<IBaseResponseModel<null> | null> {
  try {
    const res = await globalThis.axios({
      url: "/send_verification",
      method: "POST",
      data: {
        phone
      }
    });

    const data: VerificationResponseModel = res.data;
    if (data.code !== 0) {
      // 错误处理
      message.error(data.msg);
      return null;
    } else {
      return data.data!
    }
  } catch (error: any) {
    console.log(error)
    message.error("asdfsdf");
    return null;
  }
}