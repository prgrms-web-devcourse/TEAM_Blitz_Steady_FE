"use server";

import { cookies } from "next/headers";

export const setAccessToken = (accessToken: string) => {
  return cookies().set("access_token", accessToken, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
  });
};

export const setRefreshToken = (refreshToken: string) => {
  return cookies().set("refresh_token", refreshToken, {
    maxAge: 60 * 60 * 24 * 7, // 7 days
    httpOnly: true,
  });
};

export const getAccessToken = () => {
  return Promise.resolve(cookies().get("access_token"));
};

export const getRefreshToken = () => {
  return Promise.resolve(cookies().get("refresh_token"));
};

export const deleteAccessToken = () => {
  return cookies().delete("access_token");
};
export const deleteRefreshToken = () => {
  return cookies().delete("refresh_token");
};
