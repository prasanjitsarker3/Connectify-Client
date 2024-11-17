import { useAppDispatch, useAppSelector } from "@/components/Redux/hooks";
import { endCall } from "@/components/Redux/ReduxSlice/videoCallSlice";
import { RootState } from "@/components/Redux/store";
import Image from "next/image";
import React from "react";

const VideoCall = () => {
  const user = useAppSelector((state: RootState) => state.user);
  const dispatch = useAppDispatch();
  const handleEndCall = () => {
    dispatch(endCall());
  };
  return (
    <div className="  h-full bg-slate-600 text-white flex flex-col justify-center items-center">
      <h1 className="text-3xl mt-4">{user.name}</h1>
      <h1 className="text-3xl mt-4">Video Calling...</h1>
      <Image
        src={
          user?.profile ||
          "https://img.freepik.com/free-photo/confident-handsome-man-extending-his-hand-handshake-smiling-determined_176420-19595.jpg?ga=GA1.1.406508785.1728154460&semt=ais_hybrid"
        }
        alt="Profile"
        width={300}
        height={300}
        className="w-32 h-32 md:h-64 md:w-64 rounded-full border border-white p-2"
      />

      <button
        className="bg-red-500 text-white px-6 py-2 mt-4"
        onClick={handleEndCall}
      >
        End Call
      </button>
    </div>
  );
};

export default VideoCall;
