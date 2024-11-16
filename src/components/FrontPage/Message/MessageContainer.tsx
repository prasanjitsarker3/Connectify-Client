"use client";

import { useAppSelector } from "@/components/Redux/hooks";
import { RootState } from "@/components/Redux/store";
import { useGetMessageQuery } from "@/components/RTKQuery/messageApi";
import { skipToken } from "@reduxjs/toolkit/query";
import React, { useEffect, useState } from "react";
import MessageShow from "./MessageShow";
import { useSocket } from "@/components/SocketIO/socketProvider";

const MessageContainer = () => {
  const socket = useSocket();
  const user = useAppSelector((state: RootState) => state.user);
  const userId = user?.id ? String(user.id) : skipToken;
  const { data, isLoading } = useGetMessageQuery(userId);
  const [messages, setMessages] = useState(data?.data || []);
  useEffect(() => {
    if (data?.data) {
      setMessages(data.data);
    }
  }, [data]);

  useEffect(() => {
    const handleNewMessages = (updatedMessages: any) => {
      setMessages(updatedMessages);
    };
    socket.on("msg-receive", handleNewMessages);
    return () => {
      socket.off("msg-receive", handleNewMessages);
    };
  }, [socket]);

  return (
    <div>
      {isLoading ? (
        <p>Loading messages...</p>
      ) : (
        <MessageShow messages={messages} />
      )}
    </div>
  );
};

export default MessageContainer;
