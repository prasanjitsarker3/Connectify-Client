"use client";
import { useAppDispatch } from "@/components/Redux/hooks";
import { toggleSidebar } from "@/components/Redux/ReduxSlice/sidebarSlice";
import { setUserInfo } from "@/components/Redux/ReduxSlice/userSlice";
import Image from "next/image";
import React from "react";

const ShowSearchingUser = ({ data }: { data: any }) => {
  const dispatch = useAppDispatch();
  const isActive = true;

  const handleUserClick = (id: number, name: string, profile: string) => {
    dispatch(setUserInfo({ id, name, profile }));
    if (window.innerWidth < 768) {
      dispatch(toggleSidebar());
    }
  };

  return (
    <div>
      <div
        onClick={() => handleUserClick(data?.id, data?.name, data?.profile)}
        className=" flex items-center gap-3 hover:bg-gray-200 cursor-pointer bg-gray-100 p-2"
      >
        <div className="relative inline-block h-14 w-14 rounded-full border border-gray-300">
          <Image
            src={
              data?.profile ||
              "https://img.freepik.com/premium-vector/office-worker-wearing-glasses_277909-81.jpg?ga=GA1.1.406508785.1728154460&semt=ais_hybrid"
            }
            alt=""
            width={100}
            height={100}
            className=" h-full w-full p-1 rounded-full"
          />
          <span
            className={`absolute top-0 right-0 h-2 w-2 rounded-full ${
              isActive ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
        </div>
        <div>
          <h1 className=" text-base font-medium text-slate-800">
            {data?.name}
          </h1>
          <h1 className=" text-sm">{data?.email}</h1>
        </div>
      </div>
    </div>
  );
};

export default ShowSearchingUser;
