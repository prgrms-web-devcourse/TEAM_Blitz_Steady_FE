import { axiosInstance, isAbnormalCode } from "..";

const finishSteady = async (steadyId: string) => {
  try {
    const response = await axiosInstance.patch(
      `/api/v1/steadies/${steadyId}/finish`,
    );
    if (isAbnormalCode(response.status)) {
      throw new Error("Failed to fetch finish steady api!");
    }
    return response;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default finishSteady;
