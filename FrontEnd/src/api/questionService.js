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

// Function to update a category by ID
export const updateQuestion = async (id, updatedQuestion) => {
  const { data } = await axiosInstance.put(`${subdirectory}/${id}`, updatedQuestion);
  return data;
};

// Function to delete a category by ID
export const deleteQuestion = async (id) => {
  const { data } = await axiosInstance.delete(`${subdirectory}/${id}`);
  return data;
};

