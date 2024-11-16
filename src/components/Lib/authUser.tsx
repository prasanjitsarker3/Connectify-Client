import { jwtDecode } from "jwt-decode";
import { useAppSelector } from "../Redux/hooks";
import { useCurrentToken } from "../Redux/ReduxSlice/authSlice";

const useAuthUser = () => {
  const token = useAppSelector(useCurrentToken);
  let user: any = null;
  if (token) {
    user = jwtDecode(token);
  }

  return user;
};

export default useAuthUser;

// const user = useAuthUser();
