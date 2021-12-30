import { Link } from "react-router-dom";
import style from "./discover.module.css";

export default function Discover() {
  return (
    <div className={style.discoverWrapper}>
      <div className={style.topbarWrapper}>
        <span className={style.topTitle}>发 现</span>
      </div>
      <Link to="/moments" className={style.moments}>
        <div className={style.content}>
          <img src="/assets/moment.svg" alt="" width="28px" />
          <span>时 刻</span>
        </div>
        <img src="/assets/right.svg" alt="" width="25px" style={{ marginRight: "12px" }} />
      </Link>
    </div>
  );
}
