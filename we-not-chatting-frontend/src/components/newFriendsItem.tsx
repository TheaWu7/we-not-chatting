import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constant";
import { UserDataContext } from "../contexts/userDataContext";
import { UserProfileViewContext } from "../contexts/userProfileViewContext";
import { IFriendRequestHistoryModel } from "../models/friendRequestHistory";
import { IUserProfileModel } from "../models/userProfileModel";
import { getUserProfile } from "../requests/getUserProfile";
import style from "./newFriendsItem.module.css";

export default function NewFriendsItem({
  msg,
  request_id,
  accepted,
  from_user,
  to_user,
  time,
}: IFriendRequestHistoryModel) {
  const [userProfile, setUserProfile] = useState<IUserProfileModel | undefined>(undefined);
  const { userData } = useContext(UserDataContext)!;
  const { setViewModel } = useContext(UserProfileViewContext)!;
  const { contact } = userData!;
  const navigate = useNavigate();

  async function getProfile() {
    const local = contact.find((v) => v.wx_id === from_user);
    if (local) {
      setUserProfile(local);
      return;
    }

    const res = await getUserProfile(from_user);
    if (res) {
      setUserProfile(res);
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  function handleNavigate() {
    setViewModel({
      ...userProfile!,
      verification_msg: msg,
      friend_request_id: request_id,
      mode: "friend_request",
    });
    navigate("/profile");
  }

  return (
    <div className={style.newFriendsItemWrapper} onClick={handleNavigate}>
      <div className={style.avatar}>
        <img
          src={`${API_BASE_URL}/resources/${userProfile?.avatar}`}
          alt=""
          width="37px"
          height="37px"
        />
      </div>
      <div className={style.friendsReqContainer}>
        <p className={style.friendName}>{userProfile?.remarks ?? userProfile?.nickname}</p>
        <p className={style.reqContent}>{msg}</p>
      </div>
      <div className={style.status}>
        {accepted ? (
          <span className={style.pass}>已添加</span>
        ) : (
          <button className={style.pending}>同意</button>
        )}
      </div>
    </div>
  );
}
