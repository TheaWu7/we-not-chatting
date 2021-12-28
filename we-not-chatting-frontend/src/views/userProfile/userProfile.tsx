import style from "./userProfile.module.css";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const navigate = useNavigate();

  return (
    <div className={style.userProfileWrapper}>
      <div className={style.topbarWrapper}>
        <img
          src="/assets/arrow-left.svg"
          alt=""
          width="20px"
          onClick={() => {
            navigate(-1);
          }}
        />
      </div>
      <div className={style.infoWrapper}>
        <div className={style.avatar}>
          <img src="/assets/IMG_8956.JPG" alt="" width="68px" height="68px" />
        </div>
        <div className={style.infoContainer}>
          <div className={style.title}>Kelly The Baga</div>
          <p className={style.nickname}>
            <span>昵称: </span>没有名字
          </p>
          <p className={style.id}>
            <span>微×信号: </span>KellyTheBaga
          </p>
        </div>
      </div>
    </div>
  );
}
