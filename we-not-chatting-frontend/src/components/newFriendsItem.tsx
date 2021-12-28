import { useNavigate } from "react-router-dom";
import style from "./newFriendsItem.module.css";

export default function NewFriendsItem() {
  const accepted = true;
  const navigate = useNavigate();

  return (
    <div
      className={style.newFriendsItemWrapper}
      onClick={() => navigate("/userProfile")}
    >
      <div className={style.avatar}>
        <img src="/assets/IMG_0063.JPG" alt="" width="37px" height="37px" />
      </div>
      <div className={style.friendsReqContainer}>
        <p className={style.friendName}>馍馍</p>
        <p className={style.reqContent}>是我！是我！是我！</p>
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
