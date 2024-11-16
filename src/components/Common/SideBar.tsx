"use client";
import { Avatar } from "@nextui-org/react";
import { Home, MessageCircle } from "lucide-react";
import React, { useState } from "react";
import MainSidebarMessage from "../SidebarComponents/MainSidebarMessage";
import Header from "./Header";
import Searching from "./Searching";
import { useAppDispatch } from "../Redux/hooks";
import { clearUserInfo } from "../Redux/ReduxSlice/userSlice";

const SideBar = () => {
  const [searchValue, setSearchValue] = useState("");
  console.log("Value", searchValue);

  const dispatch = useAppDispatch();
  const [activeComponent, setActiveComponent] = useState<
    "header" | "message" | "searching"
  >("message");

  const handleAvatarClick = () => {
    setActiveComponent("header");
  };

  const handleSearchClick = () => {
    setActiveComponent("searching");
  };

  const handleHomeClick = () => {
    setActiveComponent("message");
    dispatch(clearUserInfo());
  };

  return (
    <div className="h-[100vh] bg-gray-100">
      <div className="px-4 md:px-8 pt-3">
        <div className="w-full flex justify-between items-center gap-5">
          <div
            onClick={handleAvatarClick}
            className="h-12 w-12 flex justify-center items-center cursor-pointer"
          >
            <Avatar
              isBordered
              src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
            />
          </div>
          <div className="">
            <input
              type="search"
              onClick={handleSearchClick}
              onChange={(e) => setSearchValue(e.target.value)}
              placeholder="Searching..."
              className="py-2 px-6 w-full rounded-md focus-visible:none"
            />
          </div>
          <div className="">
            <Home
              onClick={handleHomeClick}
              size={30}
              className="cursor-pointer"
            />
          </div>
        </div>

        <div className="pt-6">
          {activeComponent === "header" && <Header />}
          {activeComponent === "message" && <MainSidebarMessage />}
          {activeComponent === "searching" && <Searching value={searchValue} />}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
