"use client";
import useAuthUser from "@/components/Lib/authUser";
import { useAppSelector } from "@/components/Redux/hooks";
import { RootState } from "@/components/Redux/store";
import React from "react";
import MessageStatus from "./MessageStatus";
import { formatDate } from "@/components/UtlitiFunction/DateFormate";

const MessageShow = ({ messages }: { messages: any }) => {
  const currentUser = useAppSelector((state: RootState) => state.user.id);
  const user = useAuthUser();

  return (
    <div className="h-[80vh] w-full relative flex-grow overflow-auto custom-scrollbar ">
      <div className="flex flex-col justify-end w-full gap-2 px-4 py-2 overflow-auto">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500">
            <p>No messages available</p>
          </div>
        ) : (
          messages.map((message: any, index: number) => (
            <div
              key={message.id}
              className={`flex ${
                message.senderId === user?.id ? "justify-end" : "justify-start"
              }`}
            >
              {message.type === "text" && (
                <div
                  className={`px-4 py-2 text-sm rounded-lg max-w-[70%] ${
                    message.senderId === user?.id
                      ? "bg-[#028355] text-white ml-auto  rounded-bl-2xl rounded-tl-2xl rounded-br-md"
                      : "bg-gray-300 text-slate-800 mr-auto  rounded-br-2xl rounded-tr-2xl rounded-bl-md"
                  }`}
                >
                  <div className="flex  items-center gap-2">
                    <span className="break-words">{message.message}</span>
                    <div className="flex gap-1 justify-between items-center text-xs text-gray-300">
                      <span>{formatDate(message.createdAt)}</span>
                      {message.senderId == user.id && (
                        <MessageStatus messageStatus={message.messageStatus} />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default MessageShow;
