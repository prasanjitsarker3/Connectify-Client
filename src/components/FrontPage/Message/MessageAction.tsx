import useAuthUser from "@/components/Lib/authUser";
import { useAppSelector } from "@/components/Redux/hooks";
import { RootState } from "@/components/Redux/store";
import { useSendMessageDataMutation } from "@/components/RTKQuery/messageApi";
import socket from "@/components/SocketIO/socket";
import { useSocket } from "@/components/SocketIO/socketProvider";
import { Mic, Plus, Send, SendHorizontal } from "lucide-react";
import React, { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type MessageFormInputs = {
  message: string;
};

const MessageAction = () => {
  const socket = useSocket();
  const { register, handleSubmit, reset, watch } = useForm<MessageFormInputs>();
  const currentUser = useAppSelector((state: RootState) => state.user);
  const user = useAuthUser();
  const [sendMessage] = useSendMessageDataMutation();

  const onSubmit: SubmitHandler<MessageFormInputs> = async (data: any) => {
    const messageData = {
      message: data?.message,
      from: user.id,
      to: currentUser.id,
    };

    const res = await sendMessage(messageData);
    if (res?.data?.statusCode === 201) {
      reset();
    }

    socket.emit("send-msg", messageData);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=" flex justify-between  items-center gap-5 px-4"
    >
      <div className=" h-10 w-12 cursor-pointer bg-gray-200 rounded-full flex justify-center items-center">
        <Plus />
      </div>
      <div className="relative w-full">
        <input
          type="text"
          {...register("message")}
          placeholder="Send Message"
          className="py-3 pr-10 rounded-xl px-6 bg-gray-100 w-full focus:outline-none"
        />
        <button
          type="submit"
          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
        >
          <SendHorizontal size={20} />
        </button>
      </div>
      <div className=" h-10 w-12 cursor-pointer bg-gray-200 rounded-full flex justify-center items-center">
        <Mic size={20} />
      </div>
    </form>
  );
};

export default MessageAction;
