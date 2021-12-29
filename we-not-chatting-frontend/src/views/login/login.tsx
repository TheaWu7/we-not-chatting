import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login } from "../../requests/login";
import { verification_sms } from "../../requests/verification";
import style from "./login.module.css";

export default function Login() {
  const [phone, setPhone] = useState("");
  const [verification, setVerification] = useState("");
  const [pwd, setPwd] = useState("");
  const [usePwd, setUsePwd] = useState(false);

  const navigate = useNavigate();

  function hasFinished() {
    return phone && (verification || pwd);
  }
  async function handleLogin() {
    const res = await login(phone, verification, pwd);
    if (res !== null) {
      localStorage["wnc_token"] = res.token;
      navigate("/main/chats");
    }
  }
  async function handleVerification() {
    console.log("send verification code");
    await verification_sms(phone);
    toast.success("验证码已发送");
  }

  const listRenderer = [() => loginList[0], () => (!usePwd ? loginList[1] : loginList[2])];

  useEffect(() => {
    if (usePwd) {
      setVerification("");
    } else {
      setPhone("");
    }
  }, [usePwd]);

  const loginList = [
    {
      name: "手机号",
      placeholder: "请填写手机号",
      validator: (e: string) => e.split("").every((e) => /\d/.test(e)) && setPhone(e),
      state: phone,
      setState: setPhone,
    },
    {
      name: "验证码",
      placeholder: "请输入验证码",
      state: verification,
      setState: setVerification,
    },
    {
      name: "密 码",
      placeholder: "请输入密码",
      inputType: "password",
      state: pwd,
      setState: setPwd,
    },
  ];

  return (
    <div className={style.loginWrapper}>
      <span className={style.title}>手机号登录</span>
      <div className={style.infoWrapper}>
        {listRenderer.map((renderer) => {
          const v = renderer();
          return (
            <div className={style.infoContent} key={v.name}>
              <span>{v.name}</span>
              <input
                type={v.inputType ?? "text"}
                placeholder={v.placeholder}
                value={v.state}
                onChange={(e) =>
                  v.validator ? v.validator(e.target.value) : v.setState(e.target.value)
                }
              />
              {v.name === "手机号" && !usePwd ? (
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
      <span className={style.loginMethod} onClick={() => setUsePwd((v) => !v)}>
        使用{usePwd ? "验证码" : "密码"}登陆
      </span>
      <div className={style.linkWrapper}>
        <button
          className={`${style.nextStep} wx_button ${hasFinished() ? "" : style.btnDisabled}`}
          onClick={handleLogin}
          disabled={hasFinished() ? false : true}
        >
          登 录
        </button>
      </div>
    </div>
  );
}
