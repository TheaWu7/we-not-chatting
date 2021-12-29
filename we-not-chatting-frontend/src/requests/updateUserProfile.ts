import { toast } from "react-toastify";
import { IBaseResponseModel } from "../models/baseModel";
import { updateUserProfileResponseModel } from "../models/updateUserProfile";
import { uploadResource } from "./uploadResource";

interface IUpdateUserProfileData {
  avatar?: File;
  nickname?: string;
}

export async function updateUserProfile({
  avatar,
  nickname,
}: IUpdateUserProfileData): Promise<IBaseResponseModel<null> | null> {
  let avatar_fileid: string | undefined = undefined;
  if (avatar) {
    const res = await uploadResource(avatar);
    if (res) {
      avatar_fileid = res.file_id;
    } else {
      return null;
    }
  }

  try {
    const res = await globalThis.axios({
      url: "/user/profile",
      method: "PATCH",
      data: {
        avatar: avatar_fileid,
        nickname,
      },
    });
    const data: updateUserProfileResponseModel = res.data;
    if (data.code !== 0) {
      toast.error(data.msg);
      return null;
    } else {
      return data.data!;
    }
  } catch (error) {
    toast.error("error");
    return null;
  }
}
