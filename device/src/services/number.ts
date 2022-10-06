import { getAuthServiceAxiosInstance } from "../utils/axios-instances";

const AUTH_SERVICE_NUMBER_URL = "/number";

const getRandomNumber = async (token: string): Promise<number> => {
  let randomNumber: number | undefined;
  try {
    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };
    const res = await getAuthServiceAxiosInstance()
      .get(AUTH_SERVICE_NUMBER_URL, config)
      .then((res) => res.data);

    randomNumber = res.data.random;
  } catch (error) {
    console.error(error)
  }

  if (!randomNumber) {
    throw new Error("Testestest");
  }

  return randomNumber;
};

export { getRandomNumber };
