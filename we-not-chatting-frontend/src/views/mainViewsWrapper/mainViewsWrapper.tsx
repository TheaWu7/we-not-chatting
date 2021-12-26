import React from "react";
import { Outlet } from "react-router";
import TabBar from "../../components/tabBar";

export default function MainViewsWrapper() {
  return (
    <div>
      <div
        style={{
          position: "absolute",
          top: 0,
          bottom: "85px",
          left: 0,
          right: 0,
          overflow: "scroll",
        }}
      >
        <Outlet />
      </div>
      <TabBar />
    </div>
  );
}
