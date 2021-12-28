import style from "./addFriends.module.css";
import { Link, useNavigate } from "react-router-dom";

export default function AddFriends() {
  const navigate = useNavigate();
  function handleSearch() {
    // search by phone/id
  }
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
        <p>
          <img
            src="/assets/search.svg"
            alt=""
            width="25px"
            style={{ marginRight: "5px" }}
          />
          手机号 / ID:
        </p>
        <input type="text" className={style.searchBarInput} />
        <Link to="/userProfile">
          <button onClick={handleSearch}>done</button>
        </Link>
      </div>
    </div>
  );
}
