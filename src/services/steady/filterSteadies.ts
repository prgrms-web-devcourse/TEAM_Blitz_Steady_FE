import { axiosInstance } from "@/services";
import type { Steadies } from "@/services/types";

export const steadyStatusFilter = async (
  type: string,
  page: string,
): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search?page=${page}&steadyMode=all&status=RECRUITING&like=all&steadyType=${type}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const steadyTypeFilter = async (
  type: string,
  page: string,
): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search?page=${page}&steadyMode=all&status=all&like=all&steadyType=${type}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const steadyPositionFilter = async (
  position: string,
  page: string,
): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search?page=${page}&steadyMode=all&status=all&like=all&position=${position}`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const steadyModeFilter = async (
  mode: string,
  page: string,
): Promise<Steadies> => {
  try {
    const response = await axiosInstance.get(
      `/api/v1/steadies/search?page=${page}&steadyMode=${mode}&status=all&like=all`,
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// TODO: [기술 스택 및 내 좋아요 및 정렬 방향 추가하기]
