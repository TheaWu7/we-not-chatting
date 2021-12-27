import MomentsItem from "../../components/momentsItem";
import style from "./moments.module.css";

export default function Moments() {
  return (
    <div className={style.momentsWrapper}>
      <div className={style.bgTopWrapper}>
        <img src="/assets/IMG_8956.JPG" alt="" width="100%" />
        <span className={style.nickname}>我的鱼可不能吃</span>
        <div className={style.avatar}>
          <img src="/assets/avatar-chat.jpg" alt="" width="66px" />
        </div>
      </div>
      <div className={style.momentsItemWrapper}>
        <MomentsItem />
        <MomentsItem />
        <MomentsItem />
        <MomentsItem />
        <MomentsItem />
        <MomentsItem />
        <MomentsItem />
        <MomentsItem />
        <MomentsItem />
      </div>
    </div>
  );
}
