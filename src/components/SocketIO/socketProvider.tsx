import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import useAuthUser from "../Lib/authUser";

const SocketContext = createContext<Socket | null>(null);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const user = useAuthUser();

  useEffect(() => {
    const socketIo = io("http://localhost:5000");
    setSocket(socketIo);

    const userId = user.id;
    socketIo.on("connect", () => {
      socketIo.emit("add-user", userId);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return socket;
};

export default SocketProvider;
