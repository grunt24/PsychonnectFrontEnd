import axiosInstance from "./_axiosInstance";

const subdirectory = "questions";

// Function to get categories
export const getQuestions = async () => {
  const { data } = await axiosInstance.get(subdirectory);
  return data;
};

