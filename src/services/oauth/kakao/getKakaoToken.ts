import axios from "axios";

const getKakaoToken = async (code: string) => {
  try {
    const response = await axios.get(
      `https://dev.steadies.kr/api/v1/auth/kakao/callback?code=${code}`,
    );
    if (response.status !== 200) {
      throw new Error("Failed to fetch kakao token!");
    }
    return response.data;
  } catch (error) {
    // TODO: error handling 로직 추가하기
    console.error(error);
  }
};

export default getKakaoToken;
