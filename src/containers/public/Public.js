import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import {
  Player,
  SidebarLeft,
  SidebarRight,
  Header,
  Loading,
} from "../../components";
import { Scrollbars } from "react-custom-scrollbars-2";
import { useSelector } from "react-redux";

const Public = () => {
  const [isShowRightSidebar, setIsShowRightSidebar] = useState(false);
  const { isLoading } = useSelector((state) => state.app);
  return (
    <div className="w-full relative h-screen flex flex-col bg-main-300">
      <div className="w-full h-full flex flex-auto absolute">
        <div className="w-[240px] h-full flex-none ">
          <SidebarLeft />
        </div>
        <div className="flex-auto relative flex flex-col ">
          {isLoading && (
            <div className="absolute top-0 bottom-0 left-0 right-0 bg-main-300 z-50 flex items-center justify-center">
              <Loading />
            </div>
          )}
          <div className="h-[70px] px-[59px] flex flex-none items-center ">
            <Header />
          </div>
          <div className="flex-auto w-full">
            <Scrollbars autoHide style={{ width: "100%", height: "100%" }}>
              <Outlet />
              <div className="w-full h-[120px]"></div>
            </Scrollbars>
          </div>
        </div>
        {isShowRightSidebar && (
          <div className="w-[329px] h-screen hidden 1600:flex flex-none animate-slide-left">
            <SidebarRight />
          </div>
        )}
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-[90px]">
        <Player setIsShowRightSidebar={setIsShowRightSidebar} />
      </div>
    </div>
  );
};

export default Public;
