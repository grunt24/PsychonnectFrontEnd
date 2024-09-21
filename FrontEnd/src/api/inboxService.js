import axiosInstance from "./_axiosInstance";

const subdirectory = "/Messages/my-messages";
const adddirectory = "/Messages/create";

// Function to get categories
export const getMyMessages = async () => {
  const { data } = await axiosInstance.get(subdirectory);
  return data;
};

// Function to create a Message
export const createMessage = async (newMessage) => {
  const { data } = await axiosInstance.post(adddirectory, newMessage);
  return data;
};
