import { baseApi } from "../Redux/baseApi";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    sendMessageData: builder.mutation({
      query: (data) => ({
        url: "/message/send",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["message"],
    }),

    getMessage: builder.query({
      query: (id: string) => ({
        url: `/message/${id}`,
        method: "GET",
      }),
      providesTags: ["message"],
    }),
  }),
});

export const { useSendMessageDataMutation, useGetMessageQuery } = userApi;
