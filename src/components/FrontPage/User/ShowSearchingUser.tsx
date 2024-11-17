"use client";
import { useAppDispatch, useAppSelector } from "@/components/Redux/hooks";
import { toggleSidebar } from "@/components/Redux/ReduxSlice/sidebarSlice";
import { setUserInfo } from "@/components/Redux/ReduxSlice/userSlice";
import { RootState } from "@/components/Redux/store";
import { useSocket } from "@/components/SocketIO/socketProvider";
import Image from "next/image";
import React from "react";

const ShowSearchingUser = ({ data }: { data: any }) => {
  console.log("Data", data);
  const { onlineUsers } = useSocket();
  const dispatch = useAppDispatch();

  const handleUserClick = (id: number, name: string, profile: string) => {
    dispatch(setUserInfo({ id, name, profile }));
    if (window.innerWidth < 768) {
      dispatch(toggleSidebar());
    }
  };
  const activeUser =
    data?.id && onlineUsers.includes(data.id as unknown as string);

  return (
    <div>
      <div
        onClick={() => handleUserClick(data?.id, data?.name, data?.profile)}
        className=" flex items-center gap-3 hover:bg-gray-200 cursor-pointer bg-gray-100 p-2"
      >
        <div className="relative inline-block h-14 w-14 rounded-full border border-gray-300">
          <Image
            src={data.profile}
            alt=""
            width={100}
            height={100}
            className=" h-full w-full p-1 rounded-full"
          />
          <span
            className={`absolute top-0 right-0 h-2 w-2 rounded-full ${
              activeUser ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
        </div>
        <div>
          <h1 className=" text-base font-medium text-slate-800">
            {data?.name}
          </h1>
          <h1 className=" text-sm">{data?.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default ShowSearchingUser;
