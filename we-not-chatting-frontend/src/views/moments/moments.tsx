import MomentsItem from "../../components/momentsItem";
import { useNavigate } from "react-router-dom";
import style from "./moments.module.css";

export default function Moments() {
  const navigate = useNavigate();

  return (
    <div className={style.momentsWrapper}>
      <img
        className={style.back}
        src="/assets/arrow-left-fff.svg"
        alt=""
        width="20px"
        onClick={() => {
          navigate(-1);
        }}
      />
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
