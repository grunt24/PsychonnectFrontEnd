
import axiosInstance from "./_axiosInstance";

const subdirectory = "category";

// Function to get categories
export const getCategories = async () => {
  const { data } = await axiosInstance.get(subdirectory);
  return data;
};

// Function to get a category by ID
export const getCategoryById = async (id) => {
    const { data } = await axiosInstance.get(`${subdirectory}/${id}`);
    return data;
};

// Function to create a category 
export const createCategory = async (newCategory) => {
  const { data } = await axiosInstance.post(subdirectory, newCategory);
  return data;
};

// Function to update a category by ID
export const updateCategory = async (id, updatedCategory) => {
  const { data } = await axiosInstance.put(`${subdirectory}/${id}`, updatedCategory);
  return data;
};







