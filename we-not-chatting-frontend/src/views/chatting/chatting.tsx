import style from "./chatting.module.css";

export default function ChattingView() {
  return (
    <div className={style.chattingWrapper}>
      <div className={style.titleBar}>
        <button className={style.backButton}>
          <img src="/assets/arrow-left.svg" alt="back" />
        </button>
        <p className={style.chatTitle}>Thea The Fish</p>
      </div>
      <div className={style.chatView}></div>
      <div className={style.inputBar}>
        <div className={style.input} contentEditable></div>
        <button>发送</button>
      </div>
    </div>
  );
}
