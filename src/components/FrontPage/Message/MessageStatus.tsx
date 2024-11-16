"use client";
import { Check, CheckCheck } from "lucide-react";
import React from "react";

const MessageStatus = ({ messageStatus }: { messageStatus: any }) => {
  return (
    <div>
      <h1>
        {messageStatus === "sent" && (
          <Check size={15} className=" text-slate-700" />
        )}
      </h1>
      <h1>
        {messageStatus === "delivery" && (
          <CheckCheck size={15} className=" text-slate-800" />
        )}
      </h1>
      <h1>
        {messageStatus === "read" && (
          <CheckCheck size={15} className=" text-blue-500" />
        )}
      </h1>
    </div>
  );
};

export default MessageStatus;
