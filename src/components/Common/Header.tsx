import { CirclePower } from "lucide-react";
import Image from "next/image";
import React from "react";
import { logoutUser } from "../ServerRendering/logoutUser";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../Redux/hooks";
import { logOut } from "../Redux/ReduxSlice/authSlice";
import useAuthUser from "../Lib/authUser";

const Header = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const user = useAuthUser();
  const handleLogOut = () => {
    logoutUser(router);
    dispatch(logOut());
  };
  return (
    <div className=" h-[90vh] w-full flex flex-col bg-white">
      <div className=" pt-3">
        <div className="flex justify-center items-center">
          <Image
            src={
              user?.profile ||
              "https://img.freepik.com/premium-vector/office-worker-wearing-glasses_277909-81.jpg?ga=GA1.1.406508785.1728154460&semt=ais_hybrid"
            }
            alt=""
            width={100}
            height={100}
            className="h-24 w-24 rounded-full border border-gray-200 p-1"
          />
        </div>
        <h1 className=" text-center text-lg ">{user?.name || "N/A"}</h1>
      </div>
      <div className=" px-8 space-y-2 pt-4">
        <h1 className=" bg-gray-50 py-2 px-4">See Active Friend</h1>
        <h1 className=" bg-gray-50 py-2 px-4">Change Password</h1>
        <h1 className=" bg-gray-50 py-2 px-4">Setting </h1>
        <button
          onClick={handleLogOut}
          className=" w-full mt-6 bg-red-600 text-white flex justify-center items-center gap-2 py-2 px-4"
        >
          Logout <CirclePower size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;
