"use client";
import React from "react";
import { useGetAllProfileDataQuery } from "../RTKQuery/userApi";
import Image from "next/image";
import { Spinner } from "@nextui-org/react";
import ShowSearchingUser from "../FrontPage/User/ShowSearchingUser";

const Searching = ({ value }: { value: string }) => {
  const query = {
    searchTerm: value,
  };
  const { data, isLoading } = useGetAllProfileDataQuery(query);
  if (isLoading) {
    return (
      <div className=" h-full w-full pt-6 flex justify-center items-center">
        <Spinner />
      </div>
    );
  }
  const profileData = data?.data?.data || [];

  // profileData [{id:}, {id:}]
  return (
    <div className=" h-[90vh] w-full bg-white ">
      <div className=" grid grid-cols-1 gap-4 p-4">
        {profileData?.map((data: any) => (
          <ShowSearchingUser data={data} key={data.id} />
        ))}
      </div>
    </div>
  );
};

export default Searching;
