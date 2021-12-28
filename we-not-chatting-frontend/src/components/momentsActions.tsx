// import { useState } from "react";
import style from "./momentsActions.module.css";

interface IMomentsActionsProps {
  onLike?: () => void;
  onComment?: () => void;
}

const MomentsActions: React.FC<IMomentsActionsProps> = ({
  onLike,
  onComment,
}) => {
  return (
    <div className={style.actions}>
      <div className={style.actionsItem} onClick={() => onLike && onLike()}>
        <img src="/assets/like.svg" alt="" width="19px" />
        <span>赞</span>
      </div>
      <div
        className={style.actionsItem}
        onClick={() => onComment && onComment()}
      >
        <img src="/assets/comment.svg" alt="" width="19px" />
        <span>评论</span>
      </div>
    </div>
  );
};

export default MomentsActions;
