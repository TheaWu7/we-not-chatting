import style from "./profile.module.css";

const avatarUrl = "/assets/avatar.png";
// const avatarUrl = "/assets/xixi.png";
export default function Profile() {
  const isFriend = true;
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
          <p className={style.nickname}>Thea The Fish</p>
          <p className={style.wncId}>
            <span>wnc_id: </span>
            <span>wenotchat-00411</span>
          </p>
          <button className={style.editBtn}>edit</button>
        </div>
        <div className={style.momentsContainer}>
          <p className={style.momentsTitle}>{isFriend ? "Moments" : "消息验证"}</p>
          <div className={style.momentsImg}>
            {momentsImgList.map((v) => {
              return <img src={v} alt="" width="60px" style={{ margin: "5px" }} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
