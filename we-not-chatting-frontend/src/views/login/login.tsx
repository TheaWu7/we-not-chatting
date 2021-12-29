import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../../requests/login";
import { verification_sms } from "../../requests/verification";
import style from "./login.module.css";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [verification, setVerification] = useState("");
  function hasFinished() {
    return phone && verification;
  }
  async function handleLogin() {
    const res = await login(phone, verification);
    if (res !== null) {
      localStorage["wnc_token"] = res.token;
    }
  }
  async function handleVerification() {
    console.log("send verification code");
    await verification_sms(phone);
  }

  const loginList = [
    {
      name: "手机号",
      placeholder: "请填写手机号",
      state: phone,
      setState: setPhone,
    },
    {
      name: "验证码",
      placeholder: "请输入验证码",
      state: verification,
      setState: setVerification,
    },
  ];

  return (
    <div className={style.loginWrapper}>
      <span className={style.title}>手机号登录</span>
      <div className={style.infoWrapper}>
        {loginList.map((v) => {
          return (
            <div className={style.infoContent} key={v.name}>
              <span>{v.name}</span>
              <input
                type="text"
                placeholder={v.placeholder}
                value={v.state}
                onChange={(e) => v.setState(e.target.value)}
              />
              {v.name === "手机号" ? (
                <button className={`${style.getVerify} wx_button`} onClick={handleVerification}>
                  获取验证码
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <Link to="/main/chats" className={style.linkWrapper}>
        <button
          className={`${style.nextStep} wx_button ${hasFinished() ? "" : style.btnDisabled}`}
          onClick={handleLogin}
          disabled={hasFinished() ? false : true}
        >
          登 录
        </button>
      </Link>
    </div>
  );
}
