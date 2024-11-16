"use client";
import MessageBar from "@/components/Common/MessageBar";
import SideBar from "@/components/Common/SideBar";
import { useAppSelector } from "@/components/Redux/hooks";
import { RootState } from "@/components/Redux/store";

const CommonLayout = ({ children }: { children: React.ReactNode }) => {
  const isSidebarVisible = useAppSelector(
    (state: RootState) => state.sidebar.isVisible
  );
  return (
    <div className=" w-full container mx-auto md:px-0 px-8">
      <div className=" grid grid-cols-12 gap-4">
        {/* Sidebar: Always visible on medium and larger screens, togglable on small screens */}
        <div
          className={`${
            isSidebarVisible ? "block" : "hidden"
          } md:block col-span-12 md:col-span-4`}
        >
          <SideBar />
        </div>
        {/* Main Content: Adjust layout based on sidebar visibility */}
        <div
          className={`col-span-12 ${
            isSidebarVisible
              ? " hidden md:block md:col-span-8"
              : "  col-span-12"
          }`}
        >
          <MessageBar>{children}</MessageBar>
        </div>
      </div>
    </div>
  );
};

export default CommonLayout;
