import React from "react";
import Image from "next/image";

const HomePageShow = () => {
  return (
    <div>
      <div className="h-[100vh] w-full flex flex-col items-center justify-center  text-center bg-gray-50">
        <div className=" flex justify-center items-center gap-2">
          <Image
            src={"https://cdn-icons-png.flaticon.com/128/12472/12472397.png"}
            alt=""
            width={100}
            height={100}
            className="  h-12 w-12"
          />
          <h1 className=" uppercase font-medium text-2xl text-[#26D3DE]">
            Connectify
          </h1>
        </div>
        <div className="flex justify-center items-center">
          <Image
            src="/Photo/Chat.png"
            alt="Chat Icon"
            width={500}
            height={500}
            className=""
          />
        </div>
        <h1 className="text-lg font-semibold text-gray-600 -mt-20">
          Start conversations with your friends using audio and video.
        </h1>
      </div>
    </div>
  );
};

export default HomePageShow;
