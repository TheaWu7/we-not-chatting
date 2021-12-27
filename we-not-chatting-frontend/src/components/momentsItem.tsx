import { useState } from "react";
import MomentsActions from "./momentsActions";
import style from "./momentsItem.module.css";

export default function MomentsItem() {
  const hasImg = false;
  const [showActions, setShowActions] = useState(false);
  const [showLike, setShowLike] = useState(true);
  const actionsList = [
    { name: "赞", url: "/assets/like.svg" },
    { name: "评论", url: "/assets/comment.svg" },
  ];

  return (
    <div className={style.momentsItemWrapper}>
      <div className={style.avatar}>
        <img
          src="/assets/avatar-contacts.JPG"
          alt=""
          width="47px"
          height="47px"
        />
      </div>
      <div className={style.momentContent}>
        <p className={style.nickname}>我的鱼</p>
        <div className={style.content}>
          <p>网易云音乐年度总结</p>
          {hasImg ? <img src="" alt="" /> : ""}
        </div>
        <div className={style.info}>
          <span className={style.time}>3小时前</span>
          <div
            className={style.actionsWrapper}
            onClick={() => {
              setShowActions(!showActions);
            }}
          >
            <button className={style.dots}>
              <img src="/assets/dots.svg" alt="" width="15px" />
            </button>
            <div className={style.actions}>
              {showActions ? (
                <MomentsActions onLike={() => setShowLike((l) => !l)} />
              ) : null}
            </div>
          </div>
        </div>
        {showLike ? (
          <div className={style.likes}>
            <img
              src="/assets/like-colored.svg"
              alt=""
              width="18px"
              style={{ margin: "0 4px" }}
            />
            <span
              className={style.nickname}
              style={{ fontSize: "15px", marginBottom: "0" }}
            >
              可不能吃
            </span>
          </div>
        ) : (
          ""
        )}
        <div className={style.comment}></div>
      </div>
    </div>
  );
}
