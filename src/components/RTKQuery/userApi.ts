import { baseApi } from "../Redux/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    userProfileData: builder.query({
      query: () => ({
        url: "/user/me",
        method: "GET",
      }),
      providesTags: ["user"],
    }),
    getAllProfileData: builder.query({
      query: (arg: any) => ({
        url: "/users",
        method: "GET",
        params: arg,
      }),
      providesTags: ["user"],
    }),
  }),
});

export const { useUserProfileDataQuery, useGetAllProfileDataQuery } = userApi;
