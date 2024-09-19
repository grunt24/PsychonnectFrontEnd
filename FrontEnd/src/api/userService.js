import axiosInstance from "./_axiosInstance";

const subdirectory = "Auth/users";

const updateRoleDirectory = "Auth/update-role";


// Function to get Question
export const updateRole = async (id, updatedUserRole) => {
  const { data } = await axiosInstance.put(`${updateRoleDirectory}/${id}`,  updatedUserRole);
  return data;
};

// Function to get Question
export const getUsers = async () => {
  const { data } = await axiosInstance.get(subdirectory);
  return data;
};

