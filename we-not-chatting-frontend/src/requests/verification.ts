import { toast } from "react-toastify";
import { IBaseResponseModel } from "../models/baseModel";
import { VerificationResponseModel } from "../models/verification";

export async function verification_sms(phone: string): Promise<IBaseResponseModel<null> | null> {
  try {
    const res = await globalThis.axios({
      url: "/send_verification",
      method: "POST",
      data: {
        phone,
      },
    });

    const data: VerificationResponseModel = res.data;
    if (data.code !== 0) {
      // 错误处理
      toast.error(data.msg);
      return null;
    } else {
      return data.data!;
    }
  } catch (error: any) {
    console.log(error);
    return null;
  }
}
