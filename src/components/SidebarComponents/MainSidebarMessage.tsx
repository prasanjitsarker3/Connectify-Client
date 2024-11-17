"use client";
import React from "react";
import { useAppDispatch } from "../Redux/hooks";
import { setUserInfo } from "../Redux/ReduxSlice/userSlice";
import { toggleSidebar } from "../Redux/ReduxSlice/sidebarSlice";
import { useGetContactMessageQuery } from "../RTKQuery/messageApi";
import useAuthUser from "../Lib/authUser";
import Image from "next/image";
import { formatDate } from "../UtlitiFunction/DateFormate";
import MessageStatus from "../FrontPage/Message/MessageStatus";
import { Camera } from "lucide-react";
import { useSocket } from "../SocketIO/socketProvider";
import { Spinner } from "@nextui-org/react";

const MainSidebarMessage = () => {
  const { onlineUsers } = useSocket();
  const dispatch = useAppDispatch();
  const user = useAuthUser();
  const { data, isLoading } = useGetContactMessageQuery(user.id);
  if (isLoading) {
    return (
      <div className=" h-full w-full pt-6 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  const contactMessageData = data?.data?.users || [];

  const handleUserClick = (id: number, name: string, profile: string) => {
    dispatch(setUserInfo({ id, name, profile }));
    if (window.innerWidth < 768) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <div>
      <div className=" grid grid-cols-1 gap-3">
        {contactMessageData?.map((item: any) => {
          const activeUser = onlineUsers.includes(item.id);
          return (
            <div
              key={item.id}
              className=" w-full flex items-center gap-3 py-2 px-6 bg-gray-200 cursor-pointer"
              onClick={() => handleUserClick(item.id, item.name, item.profile)}
            >
              <div className="relative inline-block h-14 w-14 rounded-full border border-gray-300">
                <Image
                  src={item.profile}
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

              <div className=" w-full">
                <div className=" w-full flex justify-between items-center ">
                  <h1 className=" text-base font-medium text-slate-800">
                    {item?.name}
                  </h1>
                  <div>
                    <span
                      className={`${
                        item.totalUnreadMessage > 0
                          ? "text-green-700"
                          : "text-gray-400"
                      } text-sm`}
                    >
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>

                <div className=" w-full flex justify-between items-center">
                  <div>
                    {item.type === "text" && (
                      <span>{item?.message.slice(0, 20)}</span>
                    )}
                    {item.type === "image" && (
                      <span>
                        <Camera size={20} />
                      </span>
                    )}
                  </div>
                  <div>
                    {item.senderId == user.id && (
                      <MessageStatus messageStatus={item.messageStatus} />
                    )}
                    {item.totalUnreadMessage > 0 && (
                      <div className=" w-6 h-6 flex justify-center items-center bg-emerald-800 text-white rounded-full ">
                        {item.totalUnreadMessage}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MainSidebarMessage;
