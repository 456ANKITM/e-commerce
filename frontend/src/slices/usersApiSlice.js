import { USER_URL } from "../constants";
import { apiSlice } from "./apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USER_URL}/login`,
        method: "POST",
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USER_URL}/logout`,
        method: "POST",
      }),
    }),
    updateProfile: builder.mutation({
      query:(data)=>({
        url: `${USER_URL}/profile`,
        method:'PUT',
        body: data
      })
    })
  }),
});

export const { useLoginMutation, useLogoutMutation, useUpdateProfileMutation } = userApiSlice;
