// import { useState } from "react";
import { Link } from "react-router-dom";
import style from "./tabBar.module.css";
import { useLocation } from "react-router-dom";

const tabBarContent = [
  {
    name: "微×信",
    icon: "/assets/chat.svg",
    iconClick: "/assets/chat-click.svg",
    url: "/main/chats",
  },
  {
    name: "通讯录",
    icon: "/assets/addressbook.svg",
    iconClick: "/assets/addressbook-click.svg",
    url: "/main/contacts",
  },
  {
    name: "发现",
    icon: "/assets/huititle.svg",
    iconClick: "/assets/huititle-click.svg",
    url: "/main/discover",
  },
  {
    name: "我",
    icon: "/assets/me.svg",
    iconClick: "/assets/me-click.svg",
    url: "/main/profile",
  },
];

export default function TabBar() {
  const { pathname } = useLocation();

  return (
    <div className={style.tabbarWrapper}>
      {tabBarContent.map((v) => {
        return (
          <Link
            to={v.url}
            className={`${style.icons} ${
              pathname === v.url ? style.iconsClick : ""
            }`}
            key={v.name}
          >
            <img
              src={pathname === v.url ? v.iconClick : v.icon}
              width="28px"
              alt={v.name}
            />
            <span>{v.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
