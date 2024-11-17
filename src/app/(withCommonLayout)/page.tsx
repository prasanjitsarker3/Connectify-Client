"use client";
import VideoCall from "@/components/FrontPage/Calling/VideoCall";
import VoiceCall from "@/components/FrontPage/Calling/VoiceCall";
import HomePageShow from "@/components/FrontPage/Home/HomePageShow";
import MessageAction from "@/components/FrontPage/Message/MessageAction";
import MessageContainer from "@/components/FrontPage/Message/MessageContainer";
import MessageHeader from "@/components/FrontPage/Message/MessageHeader";
import { useAppDispatch, useAppSelector } from "@/components/Redux/hooks";
import { RootState } from "@/components/Redux/store";

export default function Home() {
  const user = useAppSelector((state: RootState) => state.user);
  const call = useAppSelector((state: RootState) => state.call);

  if (call.callType) {
    return (
      <div className="h-screen  ">
        {call.callType === "voice" ? (
          <>
            <VoiceCall call={call} />
          </>
        ) : (
          <>
            <VideoCall />
          </>
        )}
      </div>
    );
  }

  return user.id ? (
    <div className="flex flex-col h-[100vh] bg-gray-50">
      <MessageHeader />
      <div className="flex-1 px-4">
        <MessageContainer />
      </div>
      <div className="mt-auto pb-3">
        <MessageAction />
      </div>
    </div>
  ) : (
    <HomePageShow />
  );
}
