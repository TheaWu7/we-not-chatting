import { useState } from "react";
import style from "./profile.module.css";

const avatarUrl = "/assets/avatar.png";
// const avatarUrl = "/assets/xixi.png";
export default function Profile() {
  const [isFriend, setIsFriend] = useState(false);
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
          <p className={style.momentsTitle}>{isFriend ? "Moments" : "消息验证"}</p>
          {isFriend ? (
            <div className={style.momentsImg}>
              {momentsImgList.map((v) => {
                return <img src={v} alt="" width="60px" style={{ margin: "5px" }} />;
              })}
            </div>
          ) : (
            <div className={style.verification}>
              <p>
                <span>{nickname}:</span>我是小号
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
