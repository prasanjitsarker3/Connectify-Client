"use client";
import React from "react";
import { useAppDispatch } from "../Redux/hooks";
import { setUserInfo } from "../Redux/ReduxSlice/userSlice";
import { toggleSidebar } from "../Redux/ReduxSlice/sidebarSlice";

const MainSidebarMessage = () => {
  const dispatch = useAppDispatch();

  const userData = [
    {
      id: 1,
      name: "Alex",
      profile:
        "https://img.freepik.com/free-photo/confident-handsome-man-extending-his-hand-handshake-smiling-determined_176420-19595.jpg?ga=GA1.1.406508785.1728154460&semt=ais_hybrid",
    },
    {
      id: 2,
      name: "Petter",
      profile:
        "https://img.freepik.com/free-photo/confident-handsome-man-extending-his-hand-handshake-smiling-determined_176420-19595.jpg?ga=GA1.1.406508785.1728154460&semt=ais_hybrid",
    },
  ];

  const handleUserClick = (id: number, name: string, profile: string) => {
    dispatch(setUserInfo({ id, name, profile }));
    if (window.innerWidth < 768) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <div>
      <div className=" grid grid-cols-1 gap-3">
        {userData?.map((item) => (
          <div
            key={item.id}
            className=" py-2 px-6 bg-gray-200 cursor-pointer"
            onClick={() => handleUserClick(item.id, item.name, item.profile)}
          >
            <h1>{item.name}</h1>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainSidebarMessage;
