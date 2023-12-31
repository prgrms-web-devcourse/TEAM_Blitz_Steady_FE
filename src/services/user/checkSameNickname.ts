import type { AxiosResponse } from "axios";
import { axiosInstance, isAbnormalCode } from "..";
import type { CheckSameUsernameType } from "../types";

const checkSameNickname = async (nickname: string) => {
  try {
    const response: AxiosResponse<CheckSameUsernameType> =
      await axiosInstance.get(
        `/api/v1/user/profile/exist?nickname=${nickname}`,
      );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch check same nickname api!");
    }
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default checkSameNickname;
