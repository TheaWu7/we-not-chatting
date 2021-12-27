import style from "./popupBox.module.css";
import { Link } from "react-router-dom";

export default function PopupBox() {
  const functionList = [
    { name: "添加朋友", link: "/addFriends", url: "/assets/addfriends.svg" },
    { name: "新的朋友", link: "/newFriends", url: "/assets/people.svg" },
  ];
  return (
    <div className={style.popupWrapper}>
      <div className={style.triangel}></div>
      <div className={style.boxWrapper}>
        {functionList.map((v) => {
          return (
            <div className={style.popupItem}>
              <div className={style.avatar}>
                <img src={v.url} alt="" width="27px" height="27px" />
              </div>
              <Link to={v.link} className={style.func}>
                {v.name}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}
