import { useNavigate } from "react-router-dom";
import style from "./contactItem.module.css";

export default function ContactItem() {
  const navigate = useNavigate();
  return (
    <div className={style.contactItemWrapper} onClick={() => navigate("/profile")}>
      <div className={style.avatar}>
        <img src="/assets/avatar-chat.JPG" alt="" width="37px" height="37px" />
      </div>
      <div className={style.nickname}>:p</div>
    </div>
  );
}
