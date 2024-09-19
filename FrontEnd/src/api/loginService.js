import axiosInstance from "./_axiosInstance";

const loginService = {
  async login(userName, password) {
    try {
      // Step 1: Get the token and roles from login
      const response = await axiosInstance.post("/Auth/login", {
        userName,
        password,
      });

      // Extract the token and roles from the response
      const token = response.data.newToken;
      const userDetails = response.data.userInfo; // Assuming 'roles' is part of the response data

      if (token) {
        // Store the token in localStorage
        localStorage.setItem("token", token);

        if (userDetails) {
          // Store the roles in localStorage as a JSON string
          localStorage.setItem("userDetails", JSON.stringify(userDetails));

          // Return success
          return { success: true, token, userDetails };
        } else {
          // If roles are missing, return an error
          return { success: false, error: "User role is missing" };
        }
      } else {
        // If token is missing, return an error
        return { success: false, error: "Failed to fetch token" };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  },

  // Function to get user details from localStorage
  getUserDetails() {
    const userDetails = localStorage.getItem("userDetails");
    return userDetails ? JSON.parse(userDetails) : null;
  },

  logout() {
    // Remove the token and roles from localStorage
    // localStorage.removeItem("token");
    localStorage.clear();
    window.location.href = "/";
  },

  // Uncomment and adjust this if you need to use it
  // async getUserRoles(token) {
  //   try {
  //     const response = await axiosInstance.get("/Auth/roles", {
  //       headers: { Authorization: `Bearer ${token}` },
  //     });
  //     return response.data.roles; // Adjust according to the API response
  //   } catch (error) {
  //     console.error("Failed to fetch user roles:", error);
  //     return [];
  //   }
  // },
};

export default loginService;
