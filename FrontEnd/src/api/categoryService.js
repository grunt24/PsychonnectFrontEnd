
import axiosInstance from "./_axiosInstance";

const subdirectory = "category";

// Function to get categories
export const getCategories = async () => {
  const { data } = await axiosInstance.get(subdirectory);
  return data;
};

export const addCategory = async (category) => {
  return await axiosInstance.post(subdirectory, category);
}

export const updateCategory = async (category) => {
  return await axiosInstance.patch(`${subdirectory}/${category.id}`, category);
}
export const deleteCategory = async (id) => {
  return await axiosInstance.delete(`${subdirectory}/${id}`, id);
}






