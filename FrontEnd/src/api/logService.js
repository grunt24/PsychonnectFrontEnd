import axiosInstance from "./_axiosInstance";

const subdirectory = "logs";

// Function to get Question
export const getLogs = async () => {
  const { data } = await axiosInstance.get(subdirectory);
  return data;
};