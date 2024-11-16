"use client";
import { useAppDispatch, useAppSelector } from "@/components/Redux/hooks";
import { toggleSidebar } from "@/components/Redux/ReduxSlice/sidebarSlice";
import { RootState } from "@/components/Redux/store";
import { useSocket } from "@/components/SocketIO/socketProvider";
import { ArrowLeft, EllipsisVertical, Phone, Video } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const MessageHeader = () => {
  const user = useAppSelector((state: RootState) => state.user);

  const dispatch = useAppDispatch();
  const handleToggle = () => {
    dispatch(toggleSidebar());
  };

  const isActive = false;

  return (
    <div className=" bg-gray-100">
      <div className=" p-4 flex justify-between items-center gap-5">
        <div className=" flex items-center gap-3">
          <div
            onClick={handleToggle}
            className="block md:hidden bg-gray-200 rounded-full cursor-pointer w-10 h-10 flex justify-center items-center"
          >
            <ArrowLeft className="text-gray-600" />
          </div>

          <div className="relative inline-block">
            <Image
              src={
                user?.profile ||
                "https://img.freepik.com/free-photo/confident-handsome-man-extending-his-hand-handshake-smiling-determined_176420-19595.jpg?ga=GA1.1.406508785.1728154460&semt=ais_hybrid"
              }
              alt=""
              width={100}
              height={100}
              className=" w-10 h-10 md:h-14 md:w-14 rounded-full"
            />
            <span
              className={`absolute top-0 right-0 h-3 w-3 rounded-full ${
                isActive ? "bg-green-500" : "bg-red-500"
              }`}
            ></span>
          </div>
          <div className="">
            <h1 className=" text-base md:text-lg font-medium">{user?.name}</h1>
            <h1 className=" md:text-sm text-xs">Active Now</h1>
          </div>
        </div>

        <div className=" flex items-center gap-3">
          <div className=" bg-gray-200 cursor-pointer h-10 w-10 md:h-12 md:w-12 rounded-full flex justify-center items-center">
            <Phone />
          </div>
          <div className=" bg-gray-200 cursor-pointer h-10 w-10 md:h-12 md:w-12 rounded-full flex justify-center items-center">
            <Video />
          </div>
          <div className=" bg-gray-200 cursor-pointer h-10 w-10 md:h-12 md:w-12 rounded-full flex justify-center items-center">
            <EllipsisVertical />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageHeader;
