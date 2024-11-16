import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { deleteCookies } from "./deleteCookie";
import { AuthKey } from "./AuthKey";

export const logoutUser = (router: AppRouterInstance) => {
  deleteCookies([AuthKey], "/login");
  router.refresh();
};
