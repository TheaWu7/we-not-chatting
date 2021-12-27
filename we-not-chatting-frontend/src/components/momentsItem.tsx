import { useState } from "react";
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
          <button
            className={style.dots}
            onClick={() => {
              setShowActions(!showActions);
            }}
          >
            ··
          </button>
        </div>
        {showActions ? (
          <div className={style.actions}>
            {/* {actionsList.map((v) => {
              return (
                <div className={style.actionsItem}>
                  <img src={v.url} alt="" width="19px" />
                  <span>{v.name}</span>
                </div>
              );
            })} */}
            <div
              className={style.actionsItem}
              onClick={() => {
                setShowLike(!showLike);
              }}
            >
              <img src="/assets/like.svg" alt="" width="19px" />
              <span>赞</span>
            </div>
            <div className={style.actionsItem}>
              <img src="/assets/comment.svg" alt="" width="19px" />
              <span>评论</span>
            </div>
          </div>
        ) : (
          ""
        )}
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
