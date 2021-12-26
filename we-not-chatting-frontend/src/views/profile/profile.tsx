import style from "./profile.module.css";

const avatarUrl = "/assets/avatar.png";
// const avatarUrl = "/assets/xixi.png";
export default function Profile() {
  return (
    <div className={style.profileWrapper}>
      <div className={style.avatar}>
        <img src={avatarUrl} width="100%" />
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
          <p className={style.momentsTitle}>Moments</p>
        </div>
      </div>
    </div>
  );
}
