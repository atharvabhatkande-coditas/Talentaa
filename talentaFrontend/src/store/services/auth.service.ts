import type { LoginPayload, LoginResponse, LogoutPayload, LogoutResponse, MeResponse, RequestOTPPayload, RequestOTPResponse } from "../../types/auth.types";
import { baseApi } from "./baseAPI";

export const authService = baseApi.injectEndpoints({
  endpoints: (builder) => ({

    login: builder.mutation<LoginResponse, LoginPayload>({
      query: (body) => ({
        url: '/api/auth/login',
        method: 'POST',
        body,
      }),
    }),

    requestOTP: builder.mutation<RequestOTPResponse, RequestOTPPayload>({
      query: (body) => ({
        url: '/api/auth/get-otp',
        method: 'POST',
        body,
      }),
    }),

    logout: builder.mutation<LogoutResponse, LogoutPayload>({
      query: (body) => ({
        url: '',
        method: 'POST',
        body,
      }),
    }),

    getMe: builder.query<MeResponse, void>({
      query: () => ({
        url: "/api/auth/me",
        method: "GET",
      }),
    }),


  }),
});

export const { useLoginMutation, useLogoutMutation, useRequestOTPMutation , useGetMeQuery } = authService;