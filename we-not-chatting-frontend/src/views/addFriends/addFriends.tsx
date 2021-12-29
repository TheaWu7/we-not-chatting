import style from "./addFriends.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { searchUser } from "../../requests/searchUser";
import { toast } from "react-toastify";
import { UserProfileViewContext } from "../../contexts/userProfileViewContext";

export default function AddFriends() {
  const [searchInfo, setSearchInfo] = useState("");
  const { setViewModel } = useContext(UserProfileViewContext)!;

  const navigate = useNavigate();

  async function handleSearch() {
    const userData = await searchUser(searchInfo);
    if (userData === null) {
      toast.info("没有找到相关用户");
    } else {
      setViewModel({ ...userData, mode: "stranger" });
      navigate("/profile");
    }
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
          <img src="/assets/search.svg" alt="" width="25px" style={{ marginRight: "5px" }} />
          手机号 / ID:
        </p>
        <input
          type="text"
          value={searchInfo}
          onChange={(e) => setSearchInfo(e.target.value)}
          className={style.searchBarInput}
        />
        <button onClick={handleSearch}>搜索</button>
      </div>
    </div>
  );
}
