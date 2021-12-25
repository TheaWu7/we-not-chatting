import style from './discover.module.css';

export default function Discover() {
  return (
    <div className={style.discoverWrapper}>
      <div className={style.topbarWrapper}>
        <span className={style.topTitle}>Discover</span>
      </div>
      <div className={style.moments}>
        <div className={style.content}>
          <img src="/assets/moment.svg" alt="" width="28px" style={{ padding: "0 12px" }} />
          <span>Moments</span>
        </div>
        <img src="/assets/right.svg" alt="" width="25px" style={{ marginRight: "12px" }} />
      </div>
    </div>
  )
}