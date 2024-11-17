import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import useAuthUser from "../Lib/authUser";

interface SocketContextType {
  socket: Socket | null;
  onlineUsers: string[];
}

const SocketContext = createContext<SocketContextType | null>(null);

const SocketProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const user = useAuthUser();

  useEffect(() => {
    const socketIo = io("http://localhost:5000");
    setSocket(socketIo);

    const userId = user?.id;
    if (userId) {
      socketIo.on("connect", () => {
        socketIo.emit("add-user", userId);
      });
    }

    socketIo.on("onlineUsers", (users: string[]) => {
      setOnlineUsers(users);
    });

    return () => {
      socketIo.disconnect();
    };
  }, [user?.id]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export default SocketProvider;
