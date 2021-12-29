import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { API_BASE_URL } from "../constant";
import { UserProfileViewContext } from "../contexts/userProfileViewContext";
import style from "./contactItem.module.css";

interface IContactItemProps {
  avatar: string;
  nickname: string;
  remarks?: string | null;
  wx_id: string;
}

export default function ContactItem({ avatar, nickname, remarks, wx_id }: IContactItemProps) {
  const navigate = useNavigate();
  const { setViewModel } = useContext(UserProfileViewContext)!;

  function handleJump() {
    setViewModel({ avatar, nickname, remarks: remarks ?? null, wx_id, mode: "friend" });
    navigate("/profile");
  }

  return (
    <div className={style.contactItemWrapper} onClick={handleJump}>
      <div className={style.avatar}>
        <img src={`${API_BASE_URL}/resources/${avatar}`} alt="" width="37px" height="37px" />
      </div>
      <div className={style.nickname}>{remarks ?? nickname}</div>
    </div>
  );
}
