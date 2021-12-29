import { useContext, useState } from "react";
import { UserProfileViewContext } from "../../contexts/userProfileViewContext";
import style from "./profile.module.css";

const avatarUrl = "/assets/avatar.png";
// const avatarUrl = "/assets/xixi.png";
export default function Profile() {
  const [isFriend, setIsFriend] = useState(true);

  const { viewModel } = useContext(UserProfileViewContext)!;

  const nickname = "Thea The Fish";
  const momentsImgList = [
    "/assets/avatar-chat.jpg",
    "/assets/avatar-contacts.jpg",
    "/assets/IMG_0063.jpg",
    "/assets/IMG_8956.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/avatar-contacts.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/IMG_0063.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/IMG_8956.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/avatar-contacts.jpg",
    "/assets/IMG_0063.jpg",
    "/assets/IMG_8956.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/avatar-contacts.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/IMG_0063.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/IMG_8956.jpg",
  ];
  const titleMap: { [k: string]: string } = {
    friend_request: "消息验证",
    friend: "Moments",
    me: "Moments",
    stranger: "你们还不是好友",
  };
  const MomentPosts = () => (
    <div className={style.momentsImg}>
      {momentsImgList.map((v) => {
        return <img src={v} alt="" width="60px" style={{ margin: "5px" }} />;
      })}
    </div>
  );

  return (
    <div className={style.profileWrapper}>
      <div className={style.avatar}>
        <img src={avatarUrl} width="100%" alt="avator" />
      </div>
      <div className={style.infoWrapper}>
        <div className={style.idContainer}>
          <p className={style.nickname}>{nickname}</p>
          <p className={style.wncId}>
            <span>wnc_id: </span>
            <span>wenotchat-00411</span>
          </p>
          <button className={style.editBtn}>edit</button>
        </div>
        <div className={style.momentsContainer}>
          <p className={style.momentsTitle}>{titleMap[viewModel?.mode ?? "me"]}</p>
          {isFriend ? (
            <MomentPosts />
          ) : (
            <div className={style.verification}>
              <p className={style.verificationContent}>
                <span>{nickname}: </span>我是小号
              </p>
              <hr style={{ borderTop: "pink" }} />
              <div className={`${style.veriBtn} wx_button`}>通过验证</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
