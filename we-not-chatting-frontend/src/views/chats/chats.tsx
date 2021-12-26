import ChattingItem from "../../components/chattingItem";
import style from "./chats.module.css";

export default function Chats() {
  return (
    <div className={style.chatsWrapper}>
      <div className={style.topbarWrapper}>
        <span className={style.topTitle}>WeNotChat</span>
        <img
          className={style.topImg}
          src="/assets/add.svg"
          width="20px"
          alt=""
        />
      </div>
      <div className={style.chatItemWrapper}>
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
        <ChattingItem />
      </div>
    </div>
  );
}
