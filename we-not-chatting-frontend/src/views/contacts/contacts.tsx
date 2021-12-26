import ContactItem from "../../components/contactItem";
import style from "./contacts.module.css";

export default function Contacts() {
  return (
    <div className={style.ContactsWrapper}>
      <div className={style.topbarWrapper}>
        <span className={style.topTitle}>通讯录</span>
        <img
          className={style.topImg}
          src="/assets/friends_add.svg"
          width="24px"
          alt=""
        />
      </div>
      <div className={style.contactItemWrapper}>
        <div className={style.contactItemContainer}>
          <div className={style.avatar}>
            <img
              src="/assets/addfriends.svg"
              alt=""
              width="25px"
              height="25px"
            />
          </div>
          <div className={style.nickname}>新的朋友</div>
        </div>
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
