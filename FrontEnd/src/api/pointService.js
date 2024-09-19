import axiosInstance from "./_axiosInstance";

const subdirectory = "point";

// Function to get Question
export const getPoints = async () => {
  const { data } = await axiosInstance.get(subdirectory);
  return data;
};

// Function to create a Question 
export const createPoints = async (newPoint) => {
  const { data } = await axiosInstance.post(subdirectory, newPoint);
  return data;
};

// Function to update a category by ID
export const updatePoints = async (id, updatedPoint) => {
  const { data } = await axiosInstance.put(`${subdirectory}/${id}`, updatedPoint);
  return data;
};

// Function to delete a category by ID
export const deletePoints = async (id) => {
  const { data } = await axiosInstance.delete(`${subdirectory}/${id}`);
  return data;
};