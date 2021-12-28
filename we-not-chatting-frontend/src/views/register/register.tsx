import React, { useState, createRef } from "react";
import { register } from "../../requests/register";
import style from "./register.module.css";

export default function Register() {
  const [nickname, setNickname] = useState("");
  const [phone, setPhone] = useState("");
  const [pwd, setPwd] = useState("");
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [avatarDataUrl, setAvatarDataUrl] = useState<string | undefined>(
    undefined
  );
  const uploadRef = createRef<HTMLInputElement>();

  function hasFinished() {
    return nickname && phone && pwd && avatar;
  }

  const registerList = [
    {
      name: "昵称",
      placeholder: "请填写昵称",
      state: nickname,
      setState: setNickname,
    },
    {
      name: "手机号",
      placeholder: "请填写手机号",
      state: phone,
      setState: setPhone,
    },
    {
      name: "密码",
      placeholder: "请设置密码",
      type: "password",
      state: pwd,
      setState: setPwd,
    },
  ];

  function handleImgClick() {
    uploadRef.current?.click();
  }

  // onchange 事件, preview上传的图片
  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files![0];
    if (file) {
      setAvatar(file);
      const bufferUrl = URL.createObjectURL(file);
      setAvatarDataUrl(bufferUrl);
    }
  }
  async function handleRegister() {
    register(avatarDataUrl!, nickname, phone, pwd);
  }

  return (
    <div className={style.registerWrapper}>
      <span className={style.title}>用手机号注册</span>
      <div className={style.upload}>
        {/* 点击图片进行头像上传 */}
        <input
          id="imgUpload"
          style={{ display: "none" }}
          type="file"
          alt="上传图片"
          ref={uploadRef}
          onChange={handleFileChange}
        />
        {/* 上传之后展示 */}
        <img
          id="imgPreview"
          src={avatarDataUrl ?? "/assets/register.svg"}
          width={avatarDataUrl ? "100%" : "40px"}
          alt=""
          onClick={handleImgClick}
        />
      </div>
      <div className={style.infoWrapper}>
        {registerList.map((v) => {
          return (
            <div className={style.infoContent} key={v.name}>
              <span>{v.name}</span>
              <input
                type={v.type ?? "text"}
                placeholder={v.placeholder}
                value={v.state}
                onChange={(e) => v.setState(e.target.value)}
              />
            </div>
          );
        })}
      </div>
      <button
        className={`wx_button ${style.nextStep} ${
          hasFinished() ? "" : style.btnDisabled
        }`}
        disabled={hasFinished() ? false : true}
        onClick={handleRegister}
      >
        下一步
      </button>
    </div>
  );
}
