import axiosInstance from "./_axiosInstance";

const subdirectory = "questions";

// Function to get Question
export const getQuestions = async () => {
  const { data } = await axiosInstance.get(subdirectory);
  return data;
};

// Function to create a Question 
export const createQuestion = async (newQuestion) => {
  const { data } = await axiosInstance.post(subdirectory, newQuestion);
  return data;
};

