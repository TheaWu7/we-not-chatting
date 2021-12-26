import style from "./login.module.css";

const loginList = [
  { name: "手机号", placeholder: "请填写手机号" },
  { name: "验证码", placeholder: "请输入验证码" },
];

export default function Login() {
  return (
    <div className={style.loginWrapper}>
      <span className={style.title}>手机号登录</span>
      <div className={style.infoWrapper}>
        {loginList.map((v) => {
          return (
            <div className={style.infoContent}>
              <span>{v.name}</span>
              <input
                type="text"
                placeholder={v.placeholder}
                style={{ width: "148px" }}
              />
              {v.name === "手机号" ? (
                <button className={`${style.getVerify} wx_button`}>
                  获取验证码
                </button>
              ) : (
                ""
              )}
            </div>
          );
        })}
      </div>
      <button className={`${style.nextStep} wx_button`}>登 录</button>
    </div>
  );
}
