import MomentsItem from "../../components/momentsItem";
import { Link, useNavigate } from "react-router-dom";
import style from "./moments.module.css";

export default function Moments() {
  const navigate = useNavigate();

  return (
    <div className={style.momentsWrapper}>
      <div>
        <img
          className={style.back}
          src="/assets/arrow-left-fff.svg"
          alt=""
          width="20px"
          onClick={() => {
            navigate(-1);
          }}
        />
        <img className={style.post} src="/assets/camera_fill.svg" width="25px" alt="" />
      </div>
      <div className={style.topbarWrapper}>
        <img
          className={style.topBack}
          src="/assets/arrow-left.svg"
          alt=""
          width="20px"
          onClick={() => {
            navigate(-1);
          }}
        />
        <span className={style.topTitle}>Moments</span>
        <img className={style.topPost} src="/assets/camera.svg" width="25px" alt="" />
      </div>
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
