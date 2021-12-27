import style from "./addFriends.module.css";
import { useNavigate } from "react-router-dom";

export default function AddFriends() {
  const navigate = useNavigate();

  return (
    <div className={style.addFriendsWrapper}>
      <div className={style.topbarWrapper}>
        <img
          src="/assets/arrow-left.svg"
          alt=""
          width="20px"
          onClick={() => {
            navigate(-1);
          }}
        />
        <span className={style.topTitle}>添加朋友</span>
      </div>
      <div className={style.searchBar}>
        <p>请输入好友ID: </p>
        <input type="text" className={style.searchBarInput} />
        <button>done</button>
      </div>
    </div>
  );
}
