import axiosInstance from "./_axiosInstance";

const loginService = {
  async login(userName, password) {
    try {
      const response = await axiosInstance.post("/Auth/login", {
        userName,
        password,
      });

      // Check for token in the response
      const token = response.data.newToken; // Adjust based on actual response structure
      if (token) {
        // Store the token in localStorage
        localStorage.setItem("admin", token);
        return { success: true, token };
      } else {
        return { success: false, error: "Token is undefined" };
      }
    } catch (error) {
      console.error("Login failed:", error);
      return {
        success: false,
        error: error.response?.data?.message || "Login failed",
      };
    }
  },

  logout() {
    // Remove the token from localStorage
    localStorage.removeItem("admin");
  },

  getToken() {
    // Retrieve the token from localStorage
    return localStorage.getItem("admin");
  },
};

export default loginService;
