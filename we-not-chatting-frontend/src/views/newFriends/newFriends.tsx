import NewFriendsItem from "../../components/newFriendsItem";
import style from "./newFriends.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function NewFriends() {
  const navigate = useNavigate();

  return (
    <div className={style.newFriendsWrapper}>
      <div className={style.topbarWrapper}>
        <img
          src="/assets/arrow-left.svg"
          alt=""
          width="20px"
          onClick={() => {
            navigate(-1);
          }}
        />
        <span className={style.topTitle}>新的朋友</span>
        <Link to="/addFriends" className={style.addNew}>
          添加朋友
        </Link>
      </div>
      <div className={style.newFriendsItemWrapper}>
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
        <NewFriendsItem />
      </div>
    </div>
  );
}
