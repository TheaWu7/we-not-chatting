import { useContext } from "react";
import { Link } from "react-router-dom";
import ContactItem from "../../components/contactItem";
import { UserDataContext } from "../../contexts/userDataContext";
import style from "./contacts.module.css";

export default function Contacts() {
  const { userData } = useContext(UserDataContext)!;

  return (
    <div className={style.ContactsWrapper}>
      <div className={style.topbarWrapper}>
        <span className={style.topTitle}>通讯录</span>
        <Link to="/addFriends" style={{ textDecoration: "none" }} className={style.topImg}>
          <img src="/assets/friends_add.svg" width="24px" alt="" />
        </Link>
      </div>
      <div className={style.contactItemWrapper}>
        <Link to="/newFriends" className={style.newFriendsContainer}>
          <div className={style.avatar}>
            <img src="/assets/addfriends.svg" alt="" width="25px" height="25px" />
          </div>
          <div className={style.nickname}>新的朋友</div>
        </Link>
        <p className={style.seperator}>Friends</p>
        {userData!.contact.map((v) => (
          <ContactItem {...v} key={v.wx_id} />
        ))}
      </div>
    </div>
  );
}
