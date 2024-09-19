
import axiosInstance from "./_axiosInstance";

const subdirectory = "/Messages/my-messages";

// Function to get categories
export const getMyMessages = async () => {
  const { data } = await axiosInstance.get(subdirectory);
  return data;
};

// Function to create a Message 
export const createMessage = async (newMessage) => {
    const { data } = await axiosInstance.post(subdirectory, newMessage);
    return data;
  };