import { useContext, useState } from "react";
import { API_BASE_URL } from "../../constant";
import { UserDataContext } from "../../contexts/userDataContext";
import { UserProfileViewContext } from "../../contexts/userProfileViewContext";
import { updateUserProfile } from "../../requests/updateUserProfile";
import style from "./profile.module.css";

// const avatarUrl = "/assets/avatar.png";
// const avatarUrl = "/assets/xixi.png";
export default function Profile() {
  const [clickEdit, setClickEdit] = useState(false);
  const { viewModel } = useContext(UserProfileViewContext)!;
  const { userData, setUserData } = useContext(UserDataContext)!;
  const [newName, setNewName] = useState(userData?.nickname ?? "");

  const nickname = viewModel?.nickname ?? userData?.nickname;
  const wx_id = viewModel?.wx_id ?? userData?.wx_id;
  const avatar = viewModel?.avatar ?? userData?.avatar;
  const momentsImgList = [
    "/assets/avatar-chat.jpg",
    "/assets/avatar-contacts.jpg",
    "/assets/IMG_0063.jpg",
    "/assets/IMG_8956.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/avatar-contacts.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/IMG_0063.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/IMG_8956.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/avatar-contacts.jpg",
    "/assets/IMG_0063.jpg",
    "/assets/IMG_8956.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/avatar-contacts.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/IMG_0063.jpg",
    "/assets/avatar-chat.jpg",
    "/assets/IMG_8956.jpg",
  ];

  const titleMap: { [k: string]: string } = {
    friend_request: "消息验证",
    friend: "Moments",
    me: "Moments",
    stranger: "你们还不是好友",
  };

  const MomentPosts = () => (
    <div className={style.momentsImg}>
      {momentsImgList.map((v) => {
        return <img src={v} alt="" width="60px" style={{ margin: "5px" }} />;
      })}
    </div>
  );
  async function handleEditBtn() {
    if (!clickEdit) {
      setClickEdit(!clickEdit);
    } else {
      await updateUserProfile({ nickname: newName });
      setUserData({ ...userData!, nickname: newName });
      setClickEdit(!clickEdit);
    }
  }

  return (
    <div className={style.profileWrapper}>
      <div className={style.avatar}>
        <img src={`${API_BASE_URL}/resources/${avatar}`} width="100%" alt="avatar" />
      </div>
      <div className={style.infoWrapper}>
        <div className={style.idContainer}>
          {clickEdit ? (
            <input
              className={style.editInput}
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          ) : (
            <p className={style.nickname}>{nickname}</p>
          )}
          <p className={style.wncId}>
            <span>id: </span>
            <span>{wx_id}</span>
          </p>
          <button className={style.editBtn} onClick={handleEditBtn}>
            {clickEdit ? "done" : "edit"}
          </button>
        </div>
        {/*  */}
        <div className={style.momentsContainer}>
          <p className={style.momentsTitle}>{titleMap[viewModel?.mode ?? "me"]}</p>
          {viewModel?.mode ?? "me" === "me" ? (
            <MomentPosts />
          ) : (
            <div className={style.verification}>
              <p className={style.verificationContent}>
                <span>{nickname}: </span>我是小号
              </p>
              <hr style={{ borderTop: "pink" }} />
              <div className={`${style.veriBtn} wx_button`}>通过验证</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
