import React, { useContext, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router";
import TabBar from "../../components/tabBar";
import { UserProfileViewContext } from "../../contexts/userProfileViewContext";

export default function MainViewsWrapper() {
  const location = useLocation();
  const { setViewModel } = useContext(UserProfileViewContext)!;

  useEffect(() => {
    if (location.pathname === "/main/profile") {
      setViewModel(null);
    }
  }, [setViewModel, location]);

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
