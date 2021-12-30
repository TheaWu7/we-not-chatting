import { useContext, useEffect, useState } from "react";
import { API_BASE_URL } from "../../constant";
import { UserDataContext } from "../../contexts/userDataContext";
import { UserProfileViewContext } from "../../contexts/userProfileViewContext";
import { acceptFriendRequest } from "../../requests/acceptFriendRequest";
import { getUserMoments } from "../../requests/getUserMoments";
import { sendFriendRequest } from "../../requests/sendFriendRequest";
import { setFriendRemark } from "../../requests/setFriendRemark";
import { updateUserProfile } from "../../requests/updateUserProfile";
import style from "./profile.module.css";

let callCounter = 0;

export default function Profile() {
  const [clickEdit, setClickEdit] = useState(false);
  const { viewModel, setViewModel } = useContext(UserProfileViewContext)!;
  const { userData, setUserData } = useContext(UserDataContext)!;
  const [newName, setNewName] = useState(
    (viewModel?.mode ?? "me") == "me"
      ? userData?.nickname ?? ""
      : viewModel?.remarks ?? viewModel!.nickname
  );
  const [momentsImgList, setMomentsImgList] = useState<string[]>([]);

  const nickname = viewModel?.nickname ?? userData?.nickname;
  const wx_id = viewModel?.wx_id ?? userData?.wx_id;
  const avatar = viewModel?.avatar ?? userData?.avatar;

  useEffect(() => {
    const mode = viewModel?.mode ?? "me";

    if (mode === "friend") {
      if (viewModel?.wx_id === userData?.wx_id) {
        setViewModel({ ...viewModel!, mode: "me" });
      }
    }

    let friend = mode === "friend";
    if (mode === "stranger") {
      const isFriend = userData?.contact.find((v) => v.wx_id === viewModel?.wx_id) !== undefined;
      if (isFriend) {
        setViewModel({ ...viewModel!, mode: "friend" });
      }
      friend = isFriend;
    }

    async function handleGetData(id: string, callCount: number) {
      const res = await getUserMoments(id);
      if (callCount < callCounter) return;
      if (res) {
        setMomentsImgList(
          res.posts
            .filter((v) => v.media && v.media.content.length > 0)
            .map((v) => v.media!.content)
            .flat()
        );
      }
    }

    if (mode === "friend" || friend) {
      callCounter++;
      handleGetData(viewModel!.wx_id, callCounter);
    } else if (mode === "me") {
      callCounter++;
      handleGetData(userData!.wx_id, callCounter);
    }
  }, [viewModel]);

  async function handleAcceptRequest() {
    await acceptFriendRequest(viewModel!.friend_request_id!);
  }

  async function handleSendFriendRequest() {
    await sendFriendRequest(viewModel!.wx_id, "加我为好友吧！");
  }

  const titleMap: { [k: string]: string } = {
    friend_request: "消息验证",
    friend: "TA 的时刻",
    me: "我的时刻",
    stranger: "你们还不是好友",
  };

  const MomentPosts = () => (
    <div className={style.momentsImg}>
      {momentsImgList.map((v) => {
        return (
          <img
            src={`${API_BASE_URL}/resources/${v}`}
            alt=""
            width="60px"
            height="60px"
            style={{ margin: "5px" }}
            key={v}
          />
        );
      })}
    </div>
  );

  const EditButton = () => {
    let text;
    if (clickEdit) {
      text = "done";
    } else {
      if ((viewModel?.mode ?? "me") === "me") {
        text = "edit";
      } else {
        text = "remark";
      }
    }

    return (
      <button className={style.editBtn} onClick={handleEditBtn}>
        {text}
      </button>
    );
  };

  const VerifyFriend = () => (
    <div className={style.verification}>
      <p className={style.verificationContent}>
        <span>{nickname}: </span>
        {viewModel?.verification_msg}
      </p>
      <hr style={{ borderTop: "pink" }} />
      <div onClick={handleAcceptRequest} className={`${style.veriBtn} wx_button`}>
        通过验证
      </div>
    </div>
  );

  const AddFriendAction = () => (
    <div className={style.verification}>
      <div onClick={handleSendFriendRequest} className={`${style.veriBtn} wx_button`}>
        添加好友
      </div>
    </div>
  );

  function getActionComponent() {
    const mode = viewModel?.mode ?? "me";
    if (mode === "me" || mode === "friend") {
      return <MomentPosts />;
    } else if (mode === "friend_request") {
      return <VerifyFriend />;
    } else {
      return <AddFriendAction />;
    }
  }

  async function handleEditBtn() {
    if (!clickEdit) {
      setClickEdit(!clickEdit);
    } else {
      if ((viewModel?.mode ?? "me") === "me") {
        await updateUserProfile({ nickname: newName });
        setUserData({ ...userData!, nickname: newName });
      } else {
        await setFriendRemark(viewModel!.wx_id, newName);
      }
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
          <EditButton />
        </div>
        <div className={style.momentsContainer}>
          <p className={style.momentsTitle}>{titleMap[viewModel?.mode ?? "me"]}</p>
          {getActionComponent()}
        </div>
      </div>
    </div>
  );
}
