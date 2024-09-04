
import axiosInstance from "./_axiosInstance";

const subdirectory = "category";

// Function to get categories
export const getCategories = async () => {
  const { data } = await axiosInstance.get(subdirectory);
  return data;
};

// Function to get a category by ID
export const getCategoryById = async (id) => {
  try {
    const { data } = await axiosInstance.get(`${subdirectory}/${id}`);
    return data;
  } catch (error) {
    console.error(`Error fetching category with ID ${id}:`, {
      message: error.message,
      response: error.response?.data, // Detailed error response from the server
      status: error.response?.status, // HTTP status code
    });
    throw error;
  }
};






