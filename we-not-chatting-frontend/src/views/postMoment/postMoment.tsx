import React, { createRef, useState } from "react";
import { useNavigate } from "react-router";
import { postMoment } from "../../requests/postMoment";
import style from "./postMoment.module.css";

export default function PostMoment() {
  const navigate = useNavigate();
  const [content, setContent] = useState("");
  const [sendPic, setSendPic] = useState<File[]>([]);
  const uploadRef = createRef<HTMLInputElement>();

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files;
    if (file) {
      const newFileList = [...sendPic];
      for (let i = 0; i < file.length; i++) {
        const element = file[i];
        newFileList.push(element);
      }
      setSendPic(newFileList);
    }
  }
  function handleUpload() {
    uploadRef.current!.click();
  }
  async function handlePostMoment() {
    await postMoment({
      content,
      media_type: 0,
      media_content: sendPic,
    });
    navigate("/moments", { replace: true });
  }
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
          className={`${style.post} wx_button ${content ? "" : style.btnDisabled}`}
          disabled={content ? false : true}
          onClick={handlePostMoment}
        >
          发表
        </button>
      </div>
      <div className={style.postContent}>
        <textarea
          rows={4}
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="请输入..."
        ></textarea>
      </div>
      <div className={style.picWrapper}>
        {sendPic.map((v) => {
          const url = URL.createObjectURL(v);
          return (
            <img
              src={url}
              className={style.previewImg}
              alt=""
              style={{ width: "115px", height: "115px" }}
            />
          );
        })}
        {sendPic.length > 9 ? null : (
          <div className={style.upload} onClick={handleUpload}>
            <input
              type="file"
              style={{ display: "none" }}
              ref={uploadRef}
              onChange={handleFileChange}
              multiple
            />
            <img src="/assets/add_pic.svg" alt="" width="50px" />
          </div>
        )}
      </div>
    </div>
  );
}
