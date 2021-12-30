import MomentsItem from "../../components/momentsItem";
import { useNavigate } from "react-router-dom";
import style from "./moments.module.css";
import { useContext, useEffect, useState } from "react";
import { IMomentsModel } from "../../models/getMoments";
import { getMoments } from "../../requests/getMoments";
import { UserDataContext } from "../../contexts/userDataContext";
import { API_BASE_URL } from "../../constant";

export default function Moments() {
  const { userData, setUserData } = useContext(UserDataContext)!;

  const [momentsList, setMomentsList] = useState<IMomentsModel[]>([]);
  const navigate = useNavigate();
  async function getMomemtsData() {
    const data = await getMoments();
    if (data) {
      setMomentsList(data!.posts);
    }
  }

  useEffect(() => {
    getMomemtsData();
  }, []);

  return (
    <div className={style.momentsWrapper}>
      {/* 原topar */}
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
        <img
          className={style.post}
          src="/assets/camera_fill.svg"
          width="25px"
          alt=""
          onClick={() => {
            navigate("/postMoment");
          }}
        />
      </div>
      {/* 划动页面后出现的topBar */}
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
      {/* 朋友圈背景 */}
      <div className={style.bgTopWrapper}>
        <img src="/assets/IMG_8956.JPG" alt="" width="100%" />
        <span className={style.nickname}>{userData?.nickname}</span>
        <div className={style.avatar}>
          <img src={`${API_BASE_URL}/resources/${userData?.avatar}`} alt="" width="66px" />
        </div>
      </div>
      <div className={style.momentsItemWrapper}>
        {momentsList.map((v) => {
          return <MomentsItem {...v!} />;
        })}
      </div>
    </div>
  );
}
