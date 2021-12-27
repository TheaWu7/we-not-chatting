import { Link } from "react-router-dom";
import ContactItem from "../../components/contactItem";
import style from "./contacts.module.css";

export default function Contacts() {
  return (
    <div className={style.ContactsWrapper}>
      <div className={style.topbarWrapper}>
        <span className={style.topTitle}>通讯录</span>
        <Link
          to="/addFriends"
          style={{ textDecoration: "none" }}
          className={style.topImg}
        >
          <img src="/assets/friends_add.svg" width="24px" alt="" />
        </Link>
      </div>
      <div className={style.contactItemWrapper}>
        <Link to="/newFriends" className={style.newFriendsContainer}>
          <div className={style.avatar}>
            <img
              src="/assets/addfriends.svg"
              alt=""
              width="25px"
              height="25px"
            />
          </div>
          <div className={style.nickname}>新的朋友</div>
        </Link>
        <p className={style.seperator}>Friends</p>
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
        <ContactItem />
      </div>
    </div>
  );
}
