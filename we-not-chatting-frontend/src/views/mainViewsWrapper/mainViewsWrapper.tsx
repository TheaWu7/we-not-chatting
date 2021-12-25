import React from "react";
import { Outlet } from "react-router";
import TabBar from "../../components/tabBar";

export default function MainViewsWrapper() {
  return (<div>
    <Outlet />
    <TabBar />
  </div>)
}