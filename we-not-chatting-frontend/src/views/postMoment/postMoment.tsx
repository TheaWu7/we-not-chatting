import { useState } from "react";
import { useNavigate } from "react-router";
import style from "./postMoment.module.css";

export default function PostMoment() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [sendPic, setSendPic] = useState<File[]>([]);

  return (
    <div className={style.postMomentWrapper}>
      <div className={style.topbarWrapper}>
        <span
          className={style.cancel}
          onClick={() => {
            navigate(-1);
          }}
        >
          取消
        </span>
        <button
          className={`${style.post} wx_botton ${content ? "" : style.btnDisabled}`}
          disabled={content ? false : true}
        >
          发表
        </button>
      </div>
    </div>
  );
}
