import { createRef, useContext, useState } from "react";
import { toast } from "react-toastify";
import { API_BASE_URL } from "../constant";
import { UserDataContext } from "../contexts/userDataContext";
import { CommentMoments } from "../requests/commentMoments";
import { deleteMoment } from "../requests/deleteMoments";
import { likeMoments } from "../requests/likeMoments";
import MomentsActions from "./momentsActions";
import moment from "moment";
import "moment/locale/zh-cn";
import style from "./momentsItem.module.css";

interface IMomentsItemProps {
  moments_id: string;
  wx_id: string;
  content: string;
  media?: {
    type: number;
    content: string[];
  };
  likes: string[];
  comments: {
    wx_id: string;
    content: string;
  }[];
  time: number;
}

export default function MomentsItem({
  moments_id,
  wx_id,
  content,
  media,
  likes,
  comments,
  time,
}: IMomentsItemProps) {
  const [showActions, setShowActions] = useState(false);
  const [sendComment, setSendComment] = useState("");
  const [showLike, setShowLike] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const { userData, setUserData } = useContext(UserDataContext)!;
  const inputCommentRef = createRef<HTMLInputElement>();
  moment.locale("zh");

  const postTime = moment.unix(time).fromNow();

  async function handleLike() {
    setShowLike((l) => !l);
    await likeMoments(moments_id);
  }

  function handleComment() {
    setShowComment((c) => !c);
  }

  async function handleSendComment() {
    setShowComment((c) => !c);
    if (inputCommentRef.current!.value === "") {
      toast.error("禁止灌水！");
      return;
    }
    await CommentMoments(moments_id, inputCommentRef.current!.value);
  }

  async function handleDelete() {
    await deleteMoment(moments_id);
  }

  // 判断id是否是自己
  function handleFindData(name: string, wxid?: string): string {
    wxid ??= wx_id;
    if (wxid === userData?.wx_id) {
      return (userData as any)[name];
    } else {
      const data = userData?.contact.find((v) => v.wx_id === wxid)! as any;
      if (data) {
        return data[name];
      } else {
        return wxid!;
      }
    }
  }

  const LikeBar = () => (
    <div className={style.likes}>
      <img src="/assets/like-colored.svg" alt="" width="18px" style={{ margin: "0 4px" }} />
      {likes.map((m, i) => {
        return (
          <span className={style.nickname} style={{ fontSize: "15px", marginBottom: "0" }} key={m}>
            {handleFindData("nickname", m)}
            {i < likes.length - 1 ? ", " : ""}
          </span>
        );
      })}
    </div>
  );

  const CommentBar = () => (
    <div
      className={comments.length || showComment ? style.comment : ""}
      style={comments.length && likes.length ? { borderTop: "1px solid #e7e7e7" } : {}}
    >
      {comments.map((v, i) => {
        return (
          <p style={{ fontSize: "15px" }} key={`${v.content}${i}`}>
            <span className={style.nickname} style={{ marginRight: "3px", fontSize: "15px" }}>
              {handleFindData("nickname", v.wx_id)}:
            </span>
            {v.content}
          </p>
        );
      })}
      {showComment ? (
        <div className={style.sendComment}>
          <input
            type="text"
            placeholder="评论"
            className={style.commentInput}
            ref={inputCommentRef}
          />
          <button
            className={`wx_button ${sendComment ? "" : style.btnDisabled}`}
            onClick={handleSendComment}
          >
            发送
          </button>
        </div>
      ) : (
        ""
      )}
    </div>
  );

  return (
    <div className={style.momentsItemWrapper}>
      {/* 用户头像 */}
      <div className={style.avatar}>
        <img
          src={`${API_BASE_URL}/resources/${handleFindData("avatar")}`}
          alt=""
          width="47px"
          height="47px"
        />
      </div>
      {/* 朋友圈内容 */}
      <div className={style.momentContent}>
        <p className={style.nickname}> {handleFindData("nickname")}</p>
        <div className={style.content}>
          {/* 文字 */}
          <p>{content}</p>
          {/* 图片 */}
          <div className={style.imgWrapper}>
            {media &&
              media.content.length &&
              media.content.map((v) => {
                return (
                  <img
                    src={`${API_BASE_URL}/resources/${v}`}
                    alt=""
                    className={media.content.length === 1 ? style.preview1 : style.preview}
                    key={v}
                  />
                );
              })}
          </div>
        </div>
        <div className={style.info}>
          <div className={style.infoWrapperLeft}>
            {/* 发送时间 */}
            <span className={style.time}>{postTime}</span>
            {/* 删除 */}
            {wx_id === userData?.wx_id ? (
              <span className={style.delete} onClick={handleDelete}>
                删除
              </span>
            ) : (
              ""
            )}
          </div>
          {/* 点赞评论 action */}
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
                <MomentsActions onLike={handleLike} onComment={handleComment} />
              ) : null}
            </div>
          </div>
        </div>
        <div className={style.interact}>
          {/* 点赞list */}
          {likes.length > 0 ? <LikeBar /> : null}
          {/* 评论 */}
          {/* {comments.length > 0 ? <CommentBar /> : null} */}
          <CommentBar />
        </div>
      </div>
    </div>
  );
}
