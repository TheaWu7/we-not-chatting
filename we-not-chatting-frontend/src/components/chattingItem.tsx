import style from "./chattingItem.module.css";

export default function ChattingItem() {
  return (
    <div className={style.chatItemWrapper}>
      <div className={style.avatar}>
        <img src="/assets/IMG_8956.JPG" alt="" width="47px" height="47px" />
      </div>
      <div className={style.chatItemContainer}>
        <div className={style.chatTitle}>
          <span>你说</span>
          <span className={style.time}>下午 5:55</span>
        </div>
        <p className={style.chatContent}>晚上吃什么</p>
      </div>
    </div>
  );
}
