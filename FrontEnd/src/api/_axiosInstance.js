import axios from "axios";

 const axiosInstance = axios.create({
    baseURL: 'http://psychonnect-api.runasp.net/api/',
    // timeout: 1000,
    headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`}
  });

  export default axiosInstance;