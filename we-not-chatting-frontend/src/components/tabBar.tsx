import { useState } from 'react';
import { Link } from 'react-router-dom';
import style from './tabBar.module.css';
import { useLocation } from 'react-router-dom';

const tabBarContent = [
  { name: "Chats", icon: "/assets/chat.svg", iconClick: "/assets/chat-click.svg", url: "/main/chats" },
  { name: "Contacts", icon: "/assets/addressbook.svg", iconClick: "/assets/addressbook-click.svg", url: "/main/contacts" },
  { name: "Discover", icon: "/assets/huititle.svg", iconClick: "/assets/huititle-click.svg", url: "/main/discover" },
  { name: "Me", icon: "/assets/me.svg", iconClick: "/assets/me-click.svg", url: "/main/profile" },
];

export default function TabBar() {

  const { pathname } = useLocation()

  return (
    <div className={style.tabbarWrapper}>
      {tabBarContent.map((v) => {
        return <Link to={v.url} className={`${style.icons} ${pathname === v.url ? style.iconsClick : ''}`} key={v.name}>
          <img src={pathname === v.url ? v.iconClick : v.icon} width="28px" />
          <span>{v.name}</span>
        </Link>
      })
      }
    </div>
  )
}